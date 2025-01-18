import { db } from '@/lib/db';
import {chats} from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';
const chatPage = async (chatId:string) => {
  console.log(`Chatid: ${chatId}`);
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
        {/* Chat side bar */}
        {/* Video Viewer */}
        {/* Chat box */}
        <h1>Chat PAGGEGEGGEGE</h1>
      </div>
    </div>
  )
}

export default chatPage;
