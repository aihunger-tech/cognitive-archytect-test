// constants/archetypes.ts
import { Archetype } from "../types";

export const ARCHETYPES: Archetype[] = [
    {
        id: 'architect',
        name: 'The Strategic Architect',
        title: 'Master of Structure & Logic',
        description: 'Your mind functions like a high-performance processor. You see patterns where others see chaos and can project outcomes with frightening precision.',
        superpowers: ['Hyper-Logical', 'Strategic Foresight', 'Structural Analysis'],
        color: '#8B5CF6',
        minScore: 18, // Weighted: 18-24
        maxScore: 24
    },
    {
        id: 'polymath',
        name: 'The Intuitive Polymath',
        title: 'The Bridge Builder',
        description: 'You possess a rare blend of creativity and logic. You don\'t just solve problems; you find "shortcuts" that others don\'t even know exist.',
        superpowers: ['Rapid Synthesis', 'Lateral Thinking', 'Adaptive Intelligence'],
        color: '#10B981',
        minScore: 11, // Weighted: 11-17
        maxScore: 17
    },
    {
        id: 'sentinel',
        name: 'The Analytical Sentinel',
        title: 'The Precision Specialist',
        description: 'You are the guardian of detail. Your strength lies in accuracy and the ability to dismantle complex problems into manageable, logical steps.',
        superpowers: ['Detail Precision', 'Deductive Reasoning', 'Critical Filtering'],
        color: '#3B82F6',
        minScore: 5, // Weighted: 5-10
        maxScore: 10
    },
    {
        id: 'seeker',
        name: 'The Cognitive Seeker',
        title: 'The Emerging Mind',
        description: 'Your brain is in a state of high plasticity. You are currently absorbing patterns and evolving your way of thinking rapidly.',
        superpowers: ['High Curiosity', 'Open-Minded-ness', 'Growth Potential'],
        color: '#F59E0B',
        minScore: 0, // Weighted: 0-4
        maxScore: 4
    }
];
