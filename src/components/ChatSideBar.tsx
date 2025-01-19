"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-64 border-r border-gray-200 flex flex-col h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 p-6 shadow-sm">
        <Button className="w-full flex items-center justify-center gap-2 font-medium text-sm text-black bg-gray-100 hover:bg-gray-200">
          <Plus size={16} />
          New Chat
        </Button>

        <h3 className="mt-6 text-xs font-semibold text-gray-500 tracking-wide">
          CHAT HISTORY
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.map((chat) => (
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
