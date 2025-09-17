// Minimal type shim for the Vercel AI SDK React hook in a Vite app
import type * as React from 'react';

declare module 'ai/react' {
  export type ChatRole = 'system' | 'user' | 'assistant' | 'tool';

  export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
  }

  export interface UseChatOptions {
    api?: string;
    initialMessages?: Array<Partial<ChatMessage> & { role: ChatRole; content: string }>;
  }

  export interface UseChatReturn {
    messages: ChatMessage[];
    input: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
  }

  export function useChat(options?: UseChatOptions): UseChatReturn;
}
