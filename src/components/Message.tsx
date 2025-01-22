import React from "react";
import { Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};
const MessageContainer = ({ messages, isLoading }: Props) => {
  return (
    <div className="space-y-2">
      
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-lg px-4 py-2 rounded-2xl shadow-md ${
                message.role === "user" ? "bg-black text-white" : "bg-gray-200 text-black "
              }`}
            >
              {message.content}
            </div>
          </div>
        );
      })}
      {isLoading && (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;