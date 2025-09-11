'use client';

import React from 'react';

import { Bot, Send, User } from 'lucide-react';

import { useChat } from '@ai-sdk/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const getMessageText = (msg: unknown): string => {
  const m = msg as { content?: unknown; parts?: Array<{ type?: string; text?: string }>; text?: string };
  if (typeof m?.text === 'string') return m.text;
  if (typeof m?.content === 'string') return m.content;
  if (Array.isArray(m?.parts)) {
    const textPart = m.parts.find((p) => p?.type === 'text' && typeof p.text === 'string');
    if (textPart?.text) return textPart.text;
  }
  return '';
};

export default function ChatPage() {
  const chat = useChat({});
  const { messages, status } = chat;
  const [input, setInput] = React.useState('');

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    chat.sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gradient mb-6">Chat with José</h1>
        </div>

        {/* Chat Interface */}
        <Card className="glass-card h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages
              .filter((m) => m.role !== 'system')
              .map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 animate-fade-in-up ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Avatar className={`${message.role === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                    <AvatarFallback>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{getMessageText(message)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                autoFocus
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 neon-glow"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
