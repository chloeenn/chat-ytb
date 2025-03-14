"use client";
import React from "react";
import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MessageContainer from "./Message";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post('/api/fetch-message', { chatId });
      return response.data;
    }
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: { chatId },
    initialMessages: data || [],
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
    <div className="flex flex-col h-full ">
      <div
        id="message-container"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <MessageContainer messages={messages} isLoading={false} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow-md border-t border-gray-200"
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
            className="absolute inset-y-0 right-3 flex items-center justify-center text-black hover:text-gray-600"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
