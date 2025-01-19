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
  params: { chatId: string };
};

const ChatPage = async ({ params }: Props) => {
  const chatId = params.chatId; // Extract chatId from params
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
  const currChat = chatsDB.find((chat) => chat.id === parseInt(chatId));
  return (
    <div className="flex h-screen overflow-scroll">
      <div className="flex w-full h-full">
        {/* Chat Sidebar */}
        <div className="flex-[1] max-w-xs h-full">
          <ChatSideBar chats={chatsDB} chatId={parseInt(chatId)} />
        </div>
        {/* Player */}
        <div className="flex-[2] p-4 overflow-scroll ">
          <PlayerContainer vid_url={currChat?.ytbUrl as string} />
        </div>
        {/* Chat Component */}
        <div className="flex-[3] border-l-4 border-l-slate-200 h-full">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
  
};

export default ChatPage;
