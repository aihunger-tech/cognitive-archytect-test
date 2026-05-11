// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { archetype, score, username } = body;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ analysis: "AI Analysis currently unavailable. Please check API keys." }, { status: 200 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Write a 3-sentence personalized cognitive analysis for ${username || 'the user'}.
            Archetype: ${archetype}. Weighted Score: ${score}/24.
            Tone: Elite, futuristic, psychological. 
            S1: Acknowledge archetype. S2: Hidden real-world strength. S3: Growth advice.
            Be punchy. No "Congratulations".
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ analysis: text });

    } catch (error: any) {
        console.error("Gemini Error:", error);
        return NextResponse.json({ analysis: "Your cognitive patterns suggest a rare ability to synthesize complex information rapidly." }, { status: 200 });
    }
}
