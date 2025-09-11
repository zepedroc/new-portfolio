import { convertToModelMessages, streamText } from 'ai';
import 'dotenv/config';
import { Hono } from 'hono';

import { groq } from '@ai-sdk/groq';
import { serve } from '@hono/node-server';

const app = new Hono();

app.options('/api/chat', (c) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  return c.body(null, 204);
});

app.post('/api/chat', async (c) => {
  try {
    const body = await c.req.json<{ messages: unknown }>();
    const uiMessages = (body as any)?.messages ?? [];
    const modelMessages = convertToModelMessages(uiMessages);

    const SYSTEM_PROMPT = "You are José's AI assistant. Be concise, friendly, and helpful.";

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    // Vercel AI SDK provides a web-standard Response (text stream)
    const response = await result.toTextStreamResponse();

    // Mirror CORS headers on the Response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response as unknown as Response;
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to process chat request' }, 500);
  }
});

const port = Number(process.env.PORT ?? 8787);
console.log(`API listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
