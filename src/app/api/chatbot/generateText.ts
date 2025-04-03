import { GoogleGenerativeAI } from "@google/generative-ai";

interface GenerateTextRequest {
  userPrompt: string;
}

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is missing or undefined");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handleGenerateText = async ({ userPrompt }: GenerateTextRequest) => {
  try {
    // Define the structured prompt
    const prompt = `
      User prompt: ${userPrompt}
      - Greet the user warmly and provide friendly responses (including jokes or funny comments) while maintaining a polite tone.
      - Avoid using rude language or bad words.
      - Keep responses concise and avoid unnecessary details unless requested.
      - Provide clear and structured content for writing tasks.
      - For coding, generate efficient, well-commented code with explanations.
      - Offer creative and actionable solutions for problem-solving.
    `;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Ensure response exists and return text
    return response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};

export { handleGenerateText };
