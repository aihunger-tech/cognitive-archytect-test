// components/quiz/UnlockScreen.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Sparkles } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { supabase } from "@/lib/supabase";
import { calculateResult } from "@/lib/scoring-logic";
import { QUESTIONS } from "@/constants/questions";

export default function UnlockScreen() {
    const { setUser, unlockResult, userAnswers } = useQuizStore();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !username) return;

        setLoading(true);
        
        // 1. Calculate final score
        const score = userAnswers.filter((ans, i) => ans === QUESTIONS[i].correctAnswer).length;
        const result = calculateResult(userAnswers, QUESTIONS.map(q => q.correctAnswer));

        // 2. Save to Supabase
        const { error } = await supabase.from('scores').insert([
            { username, email, score, archetype: result.name }
        ]);

        if (error) {
            console.error("Error saving score:", error);
            alert("Something went wrong. Please try again.");
        } else {
            setUser(username, email);
            unlockResult();
        }
        setLoading(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center space-y-8"
        >
            <div className="relative inline-block">
                <div className="absolute -inset-4 blur-2xl opacity-50 bg-brand-purple rounded-full" />
                <div className="relative p-4 bg-brand-dark border border-brand-purple/50 rounded-3xl">
                    <Lock className="text-brand-purple" size={32} />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tighter">Analysis Complete.</h2>
                <p className="text-gray-400">Your cognitive archetype is ready. Unlock your profile to see where you rank globally.</p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 max-w-xs mx-auto">
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-purple transition-colors" size={18} />
                    <input 
                        type="text"
                        placeholder="Username / Handle"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-brand-purple transition-all"
                        required
                    />
                </div>

                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-purple transition-colors" size={18} />
                    <input 
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-brand-purple transition-all"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-brand-purple hover:text-white transition-all duration-500 disabled:opacity-50"
                >
                    {loading ? "Verifying..." : <><Sparkles size={20} /> Unlock My Profile</>}
                </button>
            </form>
        </motion.div>
    );
}
