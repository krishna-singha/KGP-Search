import { handleGenerateText } from "./generateText";

export async function GET() {
  console.log("hello");
  return new Response("Hello from Chatbot", { status: 200 });
}

export async function POST(request: Request) {
  try {
    const userPrompt = await request.json();
    const response = await handleGenerateText(userPrompt);

    // Return a successful response with JSON
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);

    // Return an error response with status 500
    return new Response(
      JSON.stringify({ error: "Failed to generate suggestion" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
