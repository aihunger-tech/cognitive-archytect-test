// components/quiz/BridgeScreen.tsx
"use client";
import { motion } from "framer-motion";
import { Wallet, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BridgeScreen({ archetypeName }: { archetypeName: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
        >
            <div className="relative flex justify-center gap-4">
                <div className="p-4 rounded-2xl bg-brand-purple/20 border border-brand-purple/50">
                    <BrainCircuit className="text-brand-purple" size={32} />
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-brand-purple to-brand-blue self-center" />
                <div className="p-4 rounded-2xl bg-brand-blue/20 border border-brand-blue/50">
                    <Wallet className="text-brand-blue" size={32} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-black text-white tracking-tighter">
                    The Connection is Clear.
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    As a <span className="text-white font-bold">{archetypeName}</span>, your brain is wired for 
                    <span className="text-brand-purple"> high-level pattern recognition</span>. 
                    <br /><br />
                    In the financial world, this is the #1 predictor of wealth accumulation.
                </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest font-mono">
                    Next Step in Your Evolution
                </p>
                <Link 
                    href="wealth-check.vercel.app" 
                    className="group w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-brand-purple hover:text-white transition-all duration-500"
                >
                    Check Your Financial Wealth <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <p className="text-xs text-gray-500 italic">
                Align your mental capital with your financial capital.
            </p>
        </motion.div>
    );
}
