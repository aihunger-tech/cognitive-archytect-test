// components/quiz/ResultScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Archetype } from "@/types";
import { Share2, ArrowRight, Trophy, Globe } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { supabase } from "@/lib/supabase";
import { calculatePercentile } from "@/lib/scoring-logic";
import { QUESTIONS } from "@/constants/questions";

export default function ResultScreen({ archetype }: { archetype: Archetype }) {
    const { goToBridge, userAnswers } = useQuizStore();
    const [percentile, setPercentile] = useState("...");
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        async function fetchRank() {
            // 1. Calculate current user's score
            const userScore = userAnswers.filter((ans, i) => ans === QUESTIONS[i].correctAnswer).length;

            // 2. Get total count of users in database
            const { count: totalCount } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true });

            // 3. Get count of users who scored LOWER than the current user
            const { count: lowerCount } = await supabase
                .from('scores')
                .select('*', { count: 'exact', head: true })
                .lt('score', userScore);

            if (totalCount) {
                setTotalUsers(totalCount);
                setPercentile(calculatePercentile(userScore, totalCount, lowerCount || 0));
            } else {
                setPercentile("1%"); // First user
            }
        }

        fetchRank();
    }, [userAnswers]);

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

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-4">
                <p className="text-gray-300 leading-relaxed">
                    "{archetype.description}"
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
