"use client";

import { chats, DrizzleChat } from "@/lib/db/schema";
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
        <div className="w-64 p-6 bg-gray-50 border-r border-gray-200 h-screen">
            <Button className="mb-6 w-full flex items-center justify-center gap-2 font-medium text-sm text-black bg-gray-100 hover:bg-gray-200">
                <Plus size={16} />
                New Chat
            </Button>

            <h3 className="mb-4 text-xs font-semibold text-gray-500 tracking-wide">
                CHAT HISTORY
            </h3>

            <div className="flex flex-col gap-2 overflow-y-auto pb-4">
                {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}
                        className={`block px-3 py-2 text-sm text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-200 ${
                            chatId === chat.id ? "bg-gray-100 font-medium" : ""
                        }`}>
                        <p className="truncate">{chat.ytbTitle}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ChatSideBar;
