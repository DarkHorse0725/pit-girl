// app/api/openai/route.ts
import { streamText } from "ai";
import { generateText } from 'ai';

import { createOpenAI } from '@ai-sdk/openai';


export const runtime = "edge";

export async function POST(req: Request) {
  try {

    return ;    
  } catch (error) {
    console.error("Error in OpenAI API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}