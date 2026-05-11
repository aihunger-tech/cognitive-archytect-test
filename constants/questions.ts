// constants/questions.ts
import { Question } from "../types";

export const QUESTIONS: Question[] = [
    // --- PATTERN RECOGNITION (Fluid Intelligence) ---
    {
        id: 1,
        category: 'PATTERN',
        text: "Which number comes next in the sequence: 2, 6, 12, 20, 30, ?",
        options: ["38", "40", "42", "44"],
        correctAnswer: 2, 
        difficulty: 1,
        explanation: "The gap between numbers increases by 2 each time."
    },
    {
        id: 2,
        category: 'PATTERN',
        text: "If all Bloops are Razzles and all Razzles are Lurgs, are all Bloops definitely Lurgs?",
        options: ["Yes", "No", "Only on Tuesdays", "Not enough info"],
        correctAnswer: 0,
        difficulty: 1,
        explanation: "This is a transitive property of logic (If A=B and B=C, then A=C)."
    },
    {
        id: 3,
        category: 'PATTERN',
        text: "Complete the pattern: Circle, Square, Triangle, Circle, Square, ?",
        options: ["Circle", "Square", "Triangle", "Hexagon"],
        correctAnswer: 2,
        difficulty: 1,
        explanation: "A simple repeating sequence of three shapes."
    },
    {
        id: 4,
        category: 'PATTERN',
        text: "Which of these does NOT belong: Apple, Orange, Grape, Carrot?",
        options: ["Apple", "Orange", "Grape", "Carrot"],
        correctAnswer: 3,
        difficulty: 1,
        explanation: "Carrot is a root vegetable; others are fruits."
    },

    // --- LOGICAL DEDUCTION (Analytical Thinking) ---
    {
        id: 5,
        category: 'LOGIC',
        text: "A man looks at a portrait and says: 'Brothers and sisters I have none, but that man's father is my father's son.' Who is in the portrait?",
        options: ["His Father", "His Son", "Himself", "His Uncle"],
        correctAnswer: 1, 
        difficulty: 3,
        explanation: "'My father's son' (with no siblings) is ME. So, the man's father is ME."
    },
    {
        id: 6,
        category: 'LOGIC',
        text: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["100 minutes", "50 minutes", "5 minutes", "1 minute"],
        correctAnswer: 2, 
        difficulty: 2,
        explanation: "The rate is 1 machine per 5 minutes per widget."
    },
    {
        id: 7,
        category: 'LOGIC',
        text: "Which word is the odd one out: Courage, Bravery, Audacity, Caution?",
        options: ["Courage", "Bravery", "Audacity", "Caution"],
        correctAnswer: 3,
        difficulty: 2,
        explanation: "Caution is the opposite of the other three synonyms."
    },
    {
        id: 8,
        category: 'LOGIC',
        text: "Rearrange the letters 'LISTEN' to get another word for 'SILENT'.",
        options: ["Slight", "Silent", "Tinsel", "Enlist"],
        correctAnswer: 1, 
        difficulty: 2,
        explanation: "LISTEN and SILENT are anagrams."
    },

    // --- SPATIAL INTELLIGENCE (Visual-Spatial) ---
    {
        id: 9,
        category: 'SPATIAL',
        text: "Imagine a cube. If you unfold it, how many squares will the resulting shape have?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        difficulty: 1,
        explanation: "A cube has 6 faces."
    },
    {
        id: 10,
        category: 'SPATIAL',
        text: "Which shape is the mirror image of a 'P' reflected horizontally?",
        options: ["q", "d", "b", "p"],
        correctAnswer: 2, 
        difficulty: 2,
        explanation: "A horizontal reflection of P flips the loop to the left."
    },
    {
        id: 11,
        category: 'SPATIAL',
        text: "If you rotate a triangle 180 degrees, what happens to its orientation?",
        options: ["Stays same", "Flips Upside Down", "Becomes a Square", "Disappears"],
        correctAnswer: 1,
        difficulty: 2,
        explanation: "A 180-degree rotation is an upside-down flip."
    },
    {
        id: 12,
        category: 'SPATIAL',
        text: "A clock shows 3:00. What is the angle between the hour and minute hand?",
        options: ["45°", "90°", "120°", "180°"],
        correctAnswer: 1,
        difficulty: 2,
        explanation: "At 3:00, the hands are perfectly perpendicular."
    }
];
