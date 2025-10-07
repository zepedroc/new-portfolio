'use client';

import React from 'react';

import { Bot, RotateCcw, Send, User } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [chatId, setChatId] = React.useState<string>(() =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  );
  const chat = useChat({
    id: chatId,
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });
  const { messages, status } = chat;
  const [input, setInput] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const previousMessageCountRef = React.useRef<number>(0);

  const isLoading = status === 'submitted' || status === 'streaming';
  const visibleMessages = React.useMemo(() => messages.filter((m) => m.role !== 'system'), [messages]);

  React.useEffect(() => {
    if (!messagesEndRef.current) return;
    const behavior: ScrollBehavior = previousMessageCountRef.current === 0 ? 'auto' : 'smooth';
    messagesEndRef.current.scrollIntoView({ behavior, block: 'end' });
    previousMessageCountRef.current = visibleMessages.length;
  }, [messages, visibleMessages.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    chat.sendMessage({ text: input });
    setInput('');
  };

  const handleReset = () => {
    setChatId(
      typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    );
    setInput('');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gradient mb-6">Chat with José's assistant</h1>
        </div>

        {/* Chat Interface */}
        <Card
          className="glass-card h-[480px] md:h-[500px] lg:h-[520px] xl:h-[580px] flex flex-col border border-white/90 rounded-t-lg"
          style={{ border: '1px solid' }}
        >
          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-3">
            {/* Persistent welcome bubble at the top */}
            <div className="flex items-start space-x-3 animate-fade-in-up">
              <Avatar className="bg-accent">
                <AvatarFallback>
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-[70%] items-start">
                <div className="px-4 py-3 rounded-lg bg-secondary text-secondary-foreground">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    Hello, this is José's assistant! What can I help you with today?
                  </Markdown>
                </div>
              </div>
            </div>

            {/* Conversation messages */}
            {visibleMessages.map((message) => (
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
                    <Markdown remarkPlugins={[remarkGfm]}>{getMessageText(message)}</Markdown>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="border-t border-white p-5"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button')) return;
              inputRef.current?.focus();
            }}
          >
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-background/50 border-border/50 focus:outline-hidden focus:ring-0 focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0"
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
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="border-white/60 text-white"
                aria-label="Start new chat"
                title="Start new chat"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
