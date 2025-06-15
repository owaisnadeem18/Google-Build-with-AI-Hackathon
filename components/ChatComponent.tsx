// components/ChatComponent.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface ChatComponentProps {
  chatId: string;
}

interface Message {
  id: number;
  sender: 'user' | 'freelancer';
  content: string;
}

export default function ChatComponent({ chatId }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messageIdRef = useRef(0);

  // Optional: load previous messages (in localStorage by chatId)
  useEffect(() => {
    const saved = localStorage.getItem(`chat-${chatId}`);
    if (saved) setMessages(JSON.parse(saved));
  }, [chatId]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
  }, [messages, chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messageIdRef.current++,
      sender: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(async () => {
      const result = await model.generateContent(input);
      const reply = await result.response.text();

      const aiMessage: Message = {
        id: messageIdRef.current++,
        sender: 'freelancer',
        content: reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 5 * 60 * 1000); // simulate 5-minute delay (adjust for production)
  };

  return (
    <div className="border p-4 rounded-lg space-y-4 bg-white shadow-sm">
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md text-sm w-fit max-w-[80%] ${
              msg.sender === 'user' ? 'ml-auto bg-blue-100' : 'bg-gray-100'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
