// app/api/openai/route.ts
import { streamText } from "ai";

import { createOpenAI } from '@ai-sdk/openai';


export const runtime = "edge";

export async function POST(req: Request) {
  try {

    const openai = createOpenAI({
      compatibility: 'strict', // strict mode, enable when using the OpenAI API
      apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY
    });
    const { messages }: { messages: { role: string; content: string }[] } =
      await req.json();

    // streamText returns an object with .toDataStreamResponse()
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [
        {
          role: "system",
          content:
            "You are a football expert. You will be given a question about football and you will need to answer it.",
        },
        ...messages
          .filter((m) => m.role === "system" || m.role === "user")
          .map((m) => ({
            ...m,
            role: m.role as "system" | "user",
          })),
      ],
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in OpenAI API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}