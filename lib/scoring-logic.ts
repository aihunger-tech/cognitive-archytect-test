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

    // Find which archetype the score falls into
    const archetype = ARCHETYPES.find(a => score >= a.minScore && score <= a.maxScore);

    return archetype || ARCHETYPES[ARCHETYPES.length - 1]; // Default to Seeker
}

export function getPercentile(score: number): string {
    // In a real app, this would fetch the average from Supabase.
    // For now, we simulate a viral "high percentile" to trigger the ego-hook.
    const percentiles = ["45%", "62%", "78%", "85%", "92%", "98%"];
    return percentiles[Math.min(score, percentiles.length - 1)];
}
