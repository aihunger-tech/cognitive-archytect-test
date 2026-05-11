// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuizStore } from "@/store/useQuizStore";
import { QUESTIONS } from "@/constants/questions";
import { calculateResult } from "@/lib/scoring-logic";
import QuestionCard from "@/components/quiz/QuestionCard";
import ResultScreen from "@/components/quiz/ResultScreen";
import BridgeScreen from "@/components/quiz/BridgeScreen";
import UnlockScreen from "@/components/quiz/UnlockScreen";
import { BrainCircuit } from "lucide-react";

export default function QuizPage() {
    const { status, currentStep, userAnswers, startQuiz, nextStep } = useQuizStore();
    const [isCalculating, setIsCalculating] = useState(false);
    const [finalStatus, setFinalStatus] = useState(useQuizStore.getState().status);

    useEffect(() => {
        setFinalStatus(status);
    }, [status]);

    useEffect(() => {
        if (status === 'TESTING' && currentStep >= QUESTIONS.length) {
            handleComplete();
        }
    }, [currentStep, status]);

    const handleComplete = async () => {
        setIsCalculating(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsCalculating(false);
        (useQuizStore as any).setState({ status: 'UNLOCKING' });
    };

    const isFinished = finalStatus === 'COMPLETED';
    const finalResult = calculateResult(userAnswers, QUESTIONS.map(q => q.correctAnswer));

    return (
        <main className="min-h-screen bg-brand-black flex items-center justify-center p-4 font-sans overflow-hidden">
            <div className="fixed top-0 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse-slow" />

            {/* FIXED CONTAINER: Added overflow-y-auto and max-h */}
            <div className="relative w-full max-w-md max-h-[850px] bg-brand-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
                
                {finalStatus === 'TESTING' && (
                    <div className="p-6 pb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="text-brand-purple" size={20} />
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Analysis</span>
                        </div>
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-brand-purple"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Scrollable Content Area */}
                <div className="flex-1 px-6 py-4 overflow-y-auto scrollbar-hide flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {finalStatus === 'IDLE' && (
                            <motion.div 
                                key="start"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-6"
                            >
                                <div className="mx-auto w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mb-4 border border-brand-purple/30 animate-float">
                                    <BrainCircuit className="text-brand-purple" size={32} />
                                </div>
                                <h1 className="text-4xl font-black text-white tracking-tighter leading-tight">
                                    What's your <span className="text-brand-purple">Archetype?</span>
                                </h1>
                                <p className="text-gray-400 text-sm px-4">
                                    A high-performance cognitive scan to reveal your mental blueprint.
                                </p>
                                <button 
                                    onClick={startQuiz}
                                    className="w-full py-3 bg-white text-black rounded-xl font-bold text-md hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Begin Analysis
                                </button>
                            </motion.div>
                        )}

                        {finalStatus === 'TESTING' && !isCalculating && (
                            <motion.div key="quiz" className="space-y-6">
                                <QuestionCard question={QUESTIONS[currentStep]} />
                                <button 
                                    disabled={userAnswers[currentStep] === undefined}
                                    onClick={nextStep}
                                    className="w-full py-3 rounded-xl bg-brand-purple text-white font-bold disabled:opacity-30 transition-all"
                                >
                                    Continue →
                                </button>
                            </motion.div>
                        )}

                        {isCalculating && (
                            <motion.div key="calc" className="text-center space-y-4">
                                <div className="relative w-16 h-16 mx-auto">
                                    <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
                                </div>
                                <p className="text-white font-mono text-xs animate-pulse uppercase tracking-widest">
                                    Synthesizing Data...
                                </p>
                            </motion.div>
                        )}

                        {finalStatus === 'UNLOCKING' && (
                            <motion.div key="unlock">
                                <UnlockScreen />
                            </motion.div>
                        )}

                        {isFinished && (
                            <motion.div key="result">
                                <ResultScreen archetype={finalResult} />
                            </motion.div>
                        )}

                        {finalStatus === 'BRIDGE' && (
                            <motion.div key="bridge">
                                <BridgeScreen archetypeName={finalResult.name} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
