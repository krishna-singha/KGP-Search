import { log } from "console";
import data from "@/data/preprocessed_data.json";

interface Data{
    text: string;
    url: string;
    timestamp: string;
}

export async function GET() {
    const prompt = "Research";
    if(data.find((item: Data) => item.text === prompt)) {
        return new Response("Found", { status: 200 });
    }
}

export async function POST(request: Request) {
    log(request);

    return new Response("Hello from POST", { status: 200 });
}