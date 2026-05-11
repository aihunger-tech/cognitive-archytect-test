// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { archetype, score, username } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API Key missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are a world-class cognitive psychologist. A user named ${username} just took an IQ test.
            Their result is the "${archetype}" archetype with a weighted score of ${score}/24.
            
            Write a 3-sentence personalized analysis. 
            - Sentence 1: Acknowledge their specific archetype in a sophisticated way.
            - Sentence 2: Explain a hidden strength this archetype has in the real world.
            - Sentence 3: Give one a brief, high-impact piece of advice for their personal growth.
            
            Keep the tone: Futuristic, elite, psychological, and encouraging. 
            Avoid generic phrases like "Congratulations." Be concise and punchy.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ analysis: text });

    } catch (error: any) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "AI analysis unavailable" }, { status: 500 });
    }
}
