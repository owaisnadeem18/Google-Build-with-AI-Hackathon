// app/chat/[id]/page.tsx

import { notFound } from 'next/navigation';
import ChatComponent from '@/components/ChatComponent';

export async function generateStaticParams() {
  try {
    // ✅ This must be a full URL during build time — use process.env.NEXT_PUBLIC_SITE_URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/chat`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn('Failed to fetch chat IDs. Using fallback.');
      return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
    }

    const chats = await res.json();

    return chats.map((chat: any) => ({
      id: chat.id.toString(),
    }));
  } catch (err) {
    console.error('Error fetching chat IDs:', err);
    return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }];
  }
}

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = params;

  if (!id) return notFound();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat with Freelancer</h1>
      <ChatComponent chatId={id} />
    </div>
  );
}
