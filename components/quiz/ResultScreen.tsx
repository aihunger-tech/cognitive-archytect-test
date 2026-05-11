// components/quiz/ResultScreen.tsx
"use client";
import { motion } from "framer-motion";
import { Archetype } from "@/types";
import { Share2, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResultScreen({ archetype, percentile }: { archetype: Archetype, percentile: string }) {
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

            <div className="flex justify-center items-baseline gap-2">
                <span className="text-6xl font-black text-white">{percentile}</span>
                <span className="text-gray-500 font-medium">Top Percentile</span>
            </div>

            <div className="flex flex-col gap-3">
                <button className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                    <Share2 size={20} /> Share Result
                </button>
                
                <Link href="https://wealth-check.vercel.app" className="w-full py-4 rounded-2xl bg-brand-purple text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Check Financial Wealth <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
}
