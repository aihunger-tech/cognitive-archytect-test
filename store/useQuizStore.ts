// store/useQuizStore.ts
import { create } from 'zustand';

interface QuizState {
    currentStep: number;
    userAnswers: number[];
    username: string;
    email: string;
    status: 'IDLE' | 'TESTING' | 'CALCULATING' | 'UNLOCKING' | 'COMPLETED' | 'BRIDGE';
    startTime: number | null;
    
    startQuiz: () => void;
    setAnswer: (answerIndex: number) => void;
    nextStep: () => void;
    setUser: (username: string, email: string) => void;
    unlockResult: () => void;
    goToBridge: () => void;
    resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    currentStep: 0,
    userAnswers: [],
    username: '',
    email: '',
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

    setUser: (username, email) => set({ username, email }),

    unlockResult: () => set({ status: 'COMPLETED' }),

    goToBridge: () => set({ status: 'BRIDGE' }),

    resetQuiz: () => set({ 
        currentStep: 0, 
        userAnswers: [], 
        username: '',
        email: '',
        status: 'IDLE', 
        startTime: null 
    }),
}));
