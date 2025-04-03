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

const handleGenerateText = async (userPrompt: GenerateTextRequest) => {
  // Define the prompt for the model
  const prompt = ` user prompt is: ${userPrompt}
    Greet the user warmly and provide friendly responses (including jokes or funny comments) while maintaining a polite tone.
    Avoid using rude language or bad words.
    Keep responses concise and avoid giving unnecessary details unless the user requests them.
    For tasks that require detailed information, ideas, or practical solutions, provide concise and relevant content.
    If the task involves writing, generate well-structured, clear, and relevant content.
    For coding requests, provide efficient, commented code with clear explanations.
    For problem-solving or brainstorming, offer creative suggestions and actionable insights.
  `;

  // Generate the response using the model
  const result = await model.generateContent(prompt);

  // Send back the generated response text
  return result.response.text();
};

export { handleGenerateText };
