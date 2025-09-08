import { useState } from 'react';

import { Bot, Send, User } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hey there! 👋 I'm José's AI assistant. While the full AI integration is coming soon, I'm here to give you a preview of what our conversation interface will look like. Feel free to type anything and see how the chat experience will work!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response (placeholder)
    setTimeout(() => {
      const responses = [
        "That's interesting! José would love to discuss this with you. The AI integration is currently in development.",
        "Great question! This chat interface will soon be powered by advanced AI to provide meaningful conversations about José's work and expertise.",
        "Thanks for testing the interface! Soon this will be a fully functional AI assistant that can discuss software development, AI, and robotics on José's behalf.",
        "I appreciate your message! The full AI capabilities are coming soon. For now, you can explore José's experience and projects on the other pages.",
      ];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in-up ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className={`${message.isUser ? 'bg-primary' : 'bg-accent'}`}>
                  <AvatarFallback>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col max-w-[70%] ${message.isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-6">
            <div className="flex space-x-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-primary hover:bg-primary/90 neon-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
