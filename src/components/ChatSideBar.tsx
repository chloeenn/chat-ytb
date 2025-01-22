"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Plus, Bot } from "lucide-react";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const sortedChats = chats.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col ">
      <div className="sticky top-0 z-10 bg-gray-50 p-6 shadow-sm">
      <div className="flex text-2xl m-2 font-bold text-black hover:text-gray-600 mb-5 justify-center">
        <Bot size={30} className="mr-2"/>
        <Link href="/">
          ChatYTB
        </Link>
      </div>
        <Button className="w-full flex items-center justify-center gap-2 font-medium text-md  shadow hover:bg-gray-800 bg-black text-white">
          <Plus size={16} />
          <Link href="/">New Chat</Link>
        </Button>

        <h3 className="mt-7 text-xs font-semibold text-gray-500 tracking-wide">
          CHAT HISTORY
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sortedChats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className={`block px-3 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-200 ${
              chatId === chat.id ? "bg-gray-100 font-medium" : ""
            }`}
          >
            <p className="truncate">{chat.ytbTitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
