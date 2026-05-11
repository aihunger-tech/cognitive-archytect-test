// lib/scoring-logic.ts
import { ARCHETYPES } from "../constants/archetypes";
import { Archetype } from "../types";

export function calculateResult(userAnswers: number[], correctAnswers: number[]): Archetype {
    let score = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
    });

    const archetype = ARCHETYPES.find(a => score >= a.minScore && score <= a.maxScore);
    return archetype || ARCHETYPES[ARCHETYPES.length - 1];
}

export function calculatePercentile(userScore: number, totalUsers: number, usersWithLowerScore: number): string {
    if (totalUsers === 0) return "1%";
    
    // Percentile formula: (Number of people below you / Total people) * 100
    const percentile = (usersWithLowerScore / totalUsers) * 100;
    
    // We round and cap it at 99% (because you can't be the 100th percentile unless you're the only one)
    return `${Math.min(Math.round(percentile), 99)}%`;
}
