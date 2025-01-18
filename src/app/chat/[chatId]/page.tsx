import ChatComponent from '@/components/ChatContainer';
import ChatSideBar from '@/components/ChatSideBar';
import PlayerContainer from '@/components/PlayerContainer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  // const { chatId } = params.chatId; // Get the chatId from the URL
  console.log(`ChatId: ${parseInt(chatId)}`);
  
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const chatsDB = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!chatsDB) {
    return redirect("/");
  }

  if (!chatsDB.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w">
          <ChatSideBar chats={chatsDB} chatId={parseInt(chatId)} />
        </div>
        {/* Playere */}
        
        <div className="flex-[2] max-w">
        <PlayerContainer chats={chatsDB} chatId={parseInt(chatId)}/>
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
