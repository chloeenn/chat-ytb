"use client";

import { chats, DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { History, Menu, Plus, MessageCircle, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    chats: DrizzleChat[];
    chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            // className={cn(
            //     "relative bg-gray-900 text-gray-200 transition-all duration-300 h-full",
            //     {
            //         "w-64 p-4": !collapsed,
            //         "w-76 p-2": collapsed,
            //     }
            // )}
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
            >
                {/* {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />} */}
                {collapsed ? <CollapseBar /> : <ExpandBar chats={chats} chatId={chatId} />}
            </button>




        </div>
    );
};
const CollapseBar = () => {
    return (
        <div>
            <h1>Collapsed</h1>
            <Menu />
            <Plus />
            <History />
        </div>
    )
}

const ExpandBar = ({ chats, chatId }: Props) => {
    return (
        <div className="w-76  relative bg-gray-900 text-gray-200 transition-all duration-300 h-full">
            <Menu />
            {/* New Chat Button */}
            <Link href="/">
                <Button className={cn("w-full border-dashed border-white border", { })}>
                    <Plus className="mr-2 w-4 h-4" />
                    New Chat
                </Button>
            </Link>
            <div className="flex max-h-full overflow-scroll pb-20 flex-col gap-2 mt-4">
                {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div
                            className={cn(
                                "rounded-lg p-3 text-slate-300 flex items-center",
                                {
                                    "bg-blue-600 text-white": chat.id === chatId,
                                    "hover:text-white": chat.id !== chatId,

                                }
                            )}
                        >
                            <MessageCircle className="mr-2" />
                            <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                                {chat.ytbTitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default ChatSideBar;
