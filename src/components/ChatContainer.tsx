"use client";
import React from "react";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import MessageContainer from "./Message";

type Props = { chatId: number };
const fetchChat = async ({ chatId }: Props) => {
  const res = await axios.post("/api/message", { chatId });
  return res.data;
}
const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['chat-query', chatId],
    queryFn: () => fetchChat({ chatId }),
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api:"/api/chat",
  
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div
        id="message-container"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {isLoading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-lg shadow-sm ${message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
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
