"use client";
import React from "react";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import MessageContainer from "./Message";

type Props = { };

const ChatComponent = ({ }: Props) => {

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div
        id="message-container"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <MessageContainer messages={messages} isLoading={false}/>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-white p-4 shadow-md border-t border-gray-200"
      >
        <div className="relative">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-600"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
