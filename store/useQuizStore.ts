// store/useQuizStore.ts
import { create } from 'zustand';
import { Question } from '@/types';

interface QuizState {
    currentStep: number;
    userAnswers: number[];
    status: 'IDLE' | 'TESTING' | 'CALCULATING' | 'COMPLETED';
    startTime: number | null;
    
    startQuiz: () => void;
    setAnswer: (answerIndex: number) => void;
    nextStep: () => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentStep: 0,
    userAnswers: [],
    status: 'IDLE',
    startTime: null,

    startQuiz: () => set({ 
        status: 'TESTING', 
        startTime: Date.now(), 
        currentStep: 0, 
        userAnswers: [] 
    }),

    setAnswer: (answerIndex) => set((state) => {
        const newAnswers = [...state.userAnswers];
        newAnswers[state.currentStep] = answerIndex;
        return { userAnswers: newAnswers };
    }),

    nextStep: () => set((state) => ({ 
        currentStep: state.currentStep + 1 
    })),

    resetQuiz: () => set({ 
        currentStep: 0, 
        userAnswers: [], 
        status: 'IDLE', 
        startTime: null 
    }),
}));
