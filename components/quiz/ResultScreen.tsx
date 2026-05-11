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
            let userWeightedScore = 0;
            userAnswers.forEach((ans, i) => {
                if (ans === QUESTIONS[i]?.correctAnswer) {
                    userWeightedScore += QUESTIONS[i]?.difficulty || 1;
                }
            });

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
                
                if (!response.ok) throw new Error('AI route failed');
                const data = await response.json();
                setAiAnalysis(data.analysis || "Your patterns suggest high analytical precision.");
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
            className="text-center space-y-6"
        >
            <div className="relative inline-block">
                <div className="absolute -inset-4 blur-2xl opacity-50" style={{ backgroundColor: archetype.color }}></div>
                <div 
                    className="relative px-4 py-1 rounded-full text-white font-bold text-[10px] uppercase tracking-widest"
                    style={{ backgroundColor: archetype.color }}
                >
                    Your Cognitive Profile
                </div>
            </div>

            <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tighter">{archetype.name}</h1>
                <p className="text-gray-400 text-sm italic">{archetype.title}</p>
            </div>

            <div className="p-4 rounded-2xl border border-brand-purple/30 bg-brand-purple/10 backdrop-blur-xl space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-brand-purple font-mono uppercase tracking-widest">AI Cognitive Analysis</span>
                    <Sparkles className="text-brand-purple animate-pulse" size={14} />
                </div>
                {isAiLoading ? (
                    <div className="space-y-2">
                        <div className="h-3 bg-white/10 rounded-full w-full animate-pulse" />
                        <div className="h-3 bg-white/10 rounded-full w-5/6 animate-pulse" />
                    </div>
                ) : (
                    <p className="text-gray-200 leading-snug text-sm italic font-medium">
                        "{aiAnalysis}"
                    </p>
                )}
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-3">
                <p className="text-gray-400 text-xs leading-relaxed">
                    {archetype.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {archetype.superpowers.map((power) => (
                        <span key={power} className="px-2 py-1 rounded-lg bg-white/10 text-[10px] text-white border border-white/10">
                            ⚡ {power}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-0">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white glow-text">{percentile}</span>
                    <span className="text-gray-500 text-xs font-medium">Top Percentile</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono uppercase">
                    <Globe size={10} /> {totalUsers.toLocaleString()} participants
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                    <Share2 size={16} /> Share Result
                </button>
                
                <button 
                    onClick={goToBridge}
                    className="w-full py-3 rounded-xl bg-brand-purple text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    Connect to Wealth Check <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
}
