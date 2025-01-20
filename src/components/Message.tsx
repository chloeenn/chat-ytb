import React from "react";
import { Message } from "ai/react";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const MessageContainer = ({ messages, isLoading }: Props) => {
  return (
    <div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-md text-black${
                message.role === "user"
                  ? "bg-gray-200 "
                  : "bg-gray-50 "
              }`}
            >
              {message.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageContainer;
