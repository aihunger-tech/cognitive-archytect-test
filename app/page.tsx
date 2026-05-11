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
    const { status, currentStep, userAnswers, startQuiz, nextStep, goToBridge } = useQuizStore();
    const [isCalculating, setIsCalculating] = useState(false);
    const [finalStatus, setFinalStatus] = useState(useQuizStore.getState().status);

    // Sync local status with Zustand store
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
        // Psychological tension: Simulate AI analysis of the patterns
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsCalculating(false);
        
        // Transition to the Unlock/Data gathering screen
        (useQuizStore as any).setState({ status: 'UNLOCKING' });
    };

    const isFinished = finalStatus === 'COMPLETED';
    
    // Correctly calculate the Archetype based on the user's specific answers
    const finalResult = calculateResult(userAnswers, QUESTIONS.map(q => q.correctAnswer));

    return (
        <main className="min-h-screen bg-brand-black flex items-center justify-center p-4 font-sans overflow-hidden">
            {/* Background Ambience - Web 4.0 Glows */}
            <div className="fixed top-0 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse-slow" />

            {/* Main Mobile Container */}
            <div className="relative w-full max-w-md h-[850px] bg-brand-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
                
                {/* Header / Progress Bar */}
                {finalStatus === 'TESTING' && (
                    <div className="p-8 pb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BrainCircuit className="text-brand-purple" size={24} />
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">System Analysis</span>
                        </div>
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
                        {/* START SCREEN */}
                        {finalStatus === 'IDLE' && (
                            <motion.div 
                                key="start"
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-6"
                            >
                                <div className="mx-auto w-20 h-20 bg-brand-purple/20 rounded-3xl flex items-center justify-center mb-6 border border-brand-purple/30 animate-float">
                                    <BrainCircuit className="text-brand-purple" size={40} />
                                </div>
                                <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
                                    What's your <span className="text-brand-purple">Archetype?</span>
                                </h1>
                                <p className="text-gray-400 text-lg px-4">
                                    A high-performance cognitive scan to reveal your mental blueprint.
                                </p>
                                <button 
                                    onClick={startQuiz}
                                    className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                >
                                    Begin Analysis
                                </button>
                            </motion.div>
                        )}

                        {/* QUIZ INTERFACE */}
                        {finalStatus === 'TESTING' && !isCalculating && (
                            <motion.div key="quiz" className="space-y-8">
                                <QuestionCard question={QUESTIONS[currentStep]} />
                                <button 
                                    disabled={userAnswers[currentStep] === undefined}
                                    onClick={nextStep}
                                    className="w-full py-4 rounded-2xl bg-brand-purple text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-purple/20"
                                >
                                    Continue →
                                </button>
                            </motion.div>
                        )}

                        {/* CALCULATING STATE */}
                        {isCalculating && (
                            <motion.div 
                                key="calc" 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="text-center space-y-6"
                            >
                                <div className="relative w-20 h-20 mx-auto">
                                    <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white font-mono text-sm animate-pulse uppercase tracking-widest">
                                        Synthesizing Data...
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono">Matching Cognitive Patterns</p>
                                </div>
                            </motion.div>
                        )}

                        {/* DATA COLLECTION / UNLOCK SCREEN */}
                        {finalStatus === 'UNLOCKING' && (
                            <motion.div key="unlock">
                                <UnlockScreen />
                            </motion.div>
                        )}

                        {/* RESULT SCREEN - NOW WITH CORRECT PROPS */}
                        {isFinished && (
                            <motion.div key="result">
                                <ResultScreen archetype={finalResult} />
                            </motion.div>
                        )}

                        {/* CONVERSION BRIDGE */}
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
