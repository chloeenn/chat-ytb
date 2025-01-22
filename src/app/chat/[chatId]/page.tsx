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
  const { chatId } = params;
  
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const chatsDB = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!chatsDB) {
    console.error("No chats found for user:", userId);
    return redirect("/");
  }

  const currChat = chatsDB.find((chat) => chat.id === parseInt(chatId));
  if (!currChat) {
    console.error("Chat not found:", chatId);
    return redirect("/");
  }

  return (
    <div className="flex h-screen">
     <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="w-64 shadow-md max-h-screen bg-gray-50 ">
        <ChatSideBar chats={chatsDB} chatId={parseInt(chatId)} />
      </div>

      <div className="flex-1 flex flex-col space-y-6 overflow-hidden p-3">
        <div className="w-full bg-black rounded-xl shadow-lg overflow-hidden aspect-w-16 aspect-h-9">
          <PlayerContainer vid_url={currChat.ytbUrl ?? ""} />
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
