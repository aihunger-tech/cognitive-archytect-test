// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import { QUESTIONS } from "@/constants/questions";
import { calculateResult } from "@/lib/scoring-logic";
import { ARCHETYPES } from "@/constants/archetypes";
import QuestionCard from "@/components/quiz/QuestionCard";
import ResultScreen from "@/components/quiz/ResultScreen";
import { BrainCircuit } from "lucide-react";

export default function QuizPage() {
    const { status, currentStep, userAnswers, startQuiz, nextStep, setAnswer } = useQuizStore();
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        if (status === 'TESTING' && currentStep >= QUESTIONS.length) {
            handleComplete();
        }
    }, [currentStep, status]);

    const handleComplete = async () => {
        setIsCalculating(true);
        // Simulate "AI Analysis" for psychological tension
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsCalculating(false);
        // Update store to completed via a custom action or simply handle state locally
        // For simplicity, we'll use a local state or you can add to zustand
    };

    // Logic to determine if we show results (simplified for this snippet)
    const isFinished = status === 'TESTING' && currentStep >= QUESTIONS.length;
    const finalResult = calculateResult(userAnswers, QUESTIONS.map(q => q.correctAnswer));

    return (
        <main className="min-h-screen bg-brand-black flex items-center justify-center p-4 font-sans">
            {/* Background Glows */}
            <div className="fixed top-0 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl" />
            <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />

            {/* Main Mobile Container - Web 4.0 Look */}
            <div className="relative w-full max-w-md h-[850px] bg-brand-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
                
                {/* Header / Progress */}
                {status === 'TESTING' && (
                    <div className="p-8 pb-4 flex items-center justify-between">
                        <BrainCircuit className="text-brand-purple" />
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-brand-purple"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex-1 px-8 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {status === 'IDLE' && (
                            <motion.div 
                                key="start"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-6"
                            >
                                <h1 className="text-6xl font-black text-white tracking-tighter">
                                    What's your <span className="text-brand-purple">Archetype?</span>
                                </h1>
                                <p className="text-gray-400 text-lg">Discover your cognitive profile in 2 minutes.</p>
                                <button 
                                    onClick={startQuiz}
                                    className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                                >
                                    Begin Analysis
                                </button>
                            </motion.div>
                        )}

                        {status === 'TESTING' && !isFinished && (
                            <motion.div key="quiz" className="space-y-8">
                                <QuestionCard question={QUESTIONS[currentStep]} />
                                <button 
                                    disabled={userAnswers[currentStep] === undefined}
                                    onClick={nextStep}
                                    className="w-full py-4 rounded-2xl bg-brand-purple text-white font-bold disabled:opacity-50 transition-all"
                                >
                                    Continue →
                                </button>
                            </motion.div>
                        )}

                        {isCalculating && (
                            <motion.div key="calc" className="text-center space-y-4">
                                <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto" />
                                <p className="text-white font-mono animate-pulse">Analyzing Cognitive Patterns...</p>
                            </motion.div>
                        )}

                        {isFinished && !isCalculating && (
                            <motion.div key="result">
                                <ResultScreen archetype={finalResult} percentile="92%" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
