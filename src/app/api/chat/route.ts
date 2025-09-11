import { convertToModelMessages, streamText } from 'ai';

import { groq } from '@ai-sdk/groq';

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();
  const modelMessages = convertToModelMessages(messages ?? []);

  const SYSTEM_PROMPT = "You are José's AI assistant. Be concise, friendly, and helpful.";

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
