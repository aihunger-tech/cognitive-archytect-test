// components/quiz/ResultScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Archetype } from "@/types";
import { Share2, ArrowRight, Globe, Sparkles } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { supabase } from "@/lib/supabase";
import { calculatePercentile } from "@/lib/scoring-logic";
import { QUESTIONS } from "@/constants/questions";

export default function ResultScreen({ archetype }: { archetype: Archetype }) {
    const { goToBridge, userAnswers, username } = useQuizStore();
    const [percentile, setPercentile] = useState("Calculating...");
    const [totalUsers, setTotalUsers] = useState(0);
    const [aiAnalysis, setAiAnalysis] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(true);

    useEffect(() => {
        async function fetchAllData() {
            // 1. Calculate Weighted Score
            let userWeightedScore = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === QUESTIONS[i]?.correctAnswer) {
                    userWeightedScore += QUESTIONS[i]?.difficulty || 1;
                }
            });

            // 2. Fetch Rank and Percentile
            try {
                const { count: totalCount } = await supabase.from('scores').select('*', { count: 'exact', head: true });
                const { count: lowerCount } = await supabase.from('scores').select('*', { count: 'exact', head: true }).lt('score', userWeightedScore);

                if (totalCount) {
                    setTotalUsers(totalCount);
                    setPercentile(calculatePercentile(userWeightedScore, totalCount, lowerCount || 0));
                } else {
                    setPercentile("Top 1%");
                }
            } catch (err) {
                setPercentile("Top 10%");
            }

            // 3. Fetch AI Personalized Analysis
            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        archetype: archetype.name, 
                        score: userWeightedScore, 
                        username: username || "User" 
                    }),
                });
                const data = await response.json();
                setAiAnalysis(data.analysis);
            } catch (err) {
                setAiAnalysis("Your cognitive patterns suggest a rare ability to synthesize complex information rapidly.");
            } finally {
                setIsAiLoading(false);
            }
        }

        fetchAllData();
    }, [userAnswers, archetype.name, username]);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
        >
            <div className="relative inline-block">
                <div className="absolute -inset-4 blur-2xl opacity-50" style={{ backgroundColor: archetype.color }}></div>
                <div 
                    className="relative px-6 py-2 rounded-full text-white font-bold text-sm uppercase tracking-widest"
                    style={{ backgroundColor: archetype.color }}
                >
                    Your Cognitive Profile
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl font-black text-white tracking-tighter">{archetype.name}</h1>
                <p className="text-gray-400 text-lg italic">{archetype.title}</p>
            </div>

            {/* AI Analysis Section - The "Magic" part */}
            <div className="p-6 rounded-3xl border border-brand-purple/30 bg-brand-purple/10 backdrop-blur-xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                    <Sparkles className="text-brand-purple animate-pulse" size={16} />
                </div>
                <p className="text-sm text-brand-purple font-mono uppercase tracking-widest mb-2">AI Cognitive Analysis</p>
                {isAiLoading ? (
                    <div className="space-y-2">
                        <div className="h-4 bg-white/10 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-white/10 rounded-full w-5/6 animate-pulse" />
                        <div className="h-4 bg-white/10 rounded-full w-4/6 animate-pulse" />
                    </div>
                ) : (
                    <p className="text-gray-200 leading-relaxed text-lg italic font-medium">
                        "{aiAnalysis}"
                    </p>
                )}
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-4">
                <p className="text-gray-400 leading-relaxed">
                    {archetype.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {archetype.superpowers.map((power) => (
                        <span key={power} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/10">
                            ⚡ {power}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-white glow-text">{percentile}</span>
                    <span className="text-gray-500 font-medium">Top Percentile</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono uppercase tracking-tighter">
                    <Globe size={12} /> Based on {totalUsers.toLocaleString()} global participants
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                    <Share2 size={20} /> Share Result
                </button>
                
                <button 
                    onClick={goToBridge}
                    className="w-full py-4 rounded-2xl bg-brand-purple text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    Connect to Wealth Check <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
}
