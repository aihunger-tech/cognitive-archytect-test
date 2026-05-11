// types/index.ts
export type QuestionCategory = 'PATTERN' | 'LOGIC' | 'SPATIAL';

export interface Question {
    id: number;
    category: QuestionCategory;
    text: string;
    options: string[];
    correctAnswer: number; // Index of the options array
    difficulty: number; // 1 (Easy) to 3 (Hard)
    explanation: string; // Shown at the end for "learning value"
}

export interface Archetype {
    id: string;
    name: string;
    title: string;
    description: string;
    superpowers: string[];
    color: string;
    minScore: number;
    maxScore: number;
}
