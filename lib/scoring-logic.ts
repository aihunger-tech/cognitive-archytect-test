// lib/scoring-logic.ts
import { ARCHETYPES } from "../constants/archetypes";
import { Archetype } from "../types";
import { QUESTIONS } from "../constants/questions";

export function calculateResult(userAnswers: number[], correctAnswers: number[]): Archetype {
    let weightedScore = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            // Add points based on the difficulty of the question
            const difficulty = QUESTIONS[index]?.difficulty || 1;
            weightedScore += difficulty;
        }
    });

    const archetype = ARCHETYPES.find(a => weightedScore >= a.minScore && weightedScore <= a.maxScore);
    return archetype || ARCHETYPES[ARCHETYPES.length - 1];
}

export function calculatePercentile(userScore: number, totalUsers: number, usersWithLowerScore: number): string {
    // Fallback for new apps with very few users
    if (totalUsers < 10) {
        // If database is small, we provide a "Estimated" high percentile to keep the viral hook
        if (userScore >= 15) return "Top 5%";
        if (userScore >= 10) return "Top 25%";
        return "Top 50%";
    }
    
    // Standard Percentile formula: (People below you / Total) * 100
    const percentile = (usersWithLowerScore / totalUsers) * 100;
    return `${Math.min(Math.round(percentile), 99)}%`;
}
