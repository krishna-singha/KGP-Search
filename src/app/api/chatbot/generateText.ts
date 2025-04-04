import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is missing or undefined");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handleGenerateText = async (userPrompt: string) => {
  try {
    const prompt = `
      Give reaponse according to the user prompt, user prompt is ${userPrompt}
      Begin with a warm, friendly greeting. Light humor or witty remarks are welcome (but stay respectful and inclusive).
      - Maintain a polite, positive, and approachable tone throughout.
      - Keep responses concise and to the point unless more detail is specifically requested.
      - For writing tasks:
        • Ensure clarity, coherence, and proper structure.
        • Use engaging and reader-friendly language.
      - For coding tasks:
        • Generate clean, efficient, and well-commented code.
        • Explain logic in simple terms, especially for complex sections.
      - For problem-solving:
        • Suggest practical, creative, and clearly actionable solutions.
        • Break down the steps logically and avoid jargon unless necessary.
      - Never use rude or inappropriate language.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};

export { handleGenerateText };
