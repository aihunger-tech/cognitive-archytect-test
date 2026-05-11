// components/quiz/QuestionCard.tsx
"use client";
import { motion } from "framer-motion";
import { Question } from "@/types";
import { useQuizStore } from "@/store/useQuizStore";
import { CheckCircle2 } from "lucide-react";

export default function QuestionCard({ question }: { question: Question }) {
    const { setAnswer, userAnswers } = useQuizStore();
    const currentAnswer = userAnswers[question.id - 1];

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full space-y-6"
        >
            <div className="space-y-2">
                <span className="text-brand-purple font-mono text-sm tracking-widest uppercase">
                    {question.category} // Question {question.id}
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                    {question.text}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setAnswer(index)}
                        className={`group relative p-4 text-left rounded-2xl transition-all duration-300 border-2 
                            ${currentAnswer === index 
                                ? "border-brand-purple bg-brand-purple/20 text-white" 
                                : "border-brand-glass bg-brand-glass hover:border-white/30 text-gray-300"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{option}</span>
                            {currentAnswer === index && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <CheckCircle2 className="text-brand-purple" />
                                </motion.div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
