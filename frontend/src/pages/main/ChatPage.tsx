import { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import ChatInput from "../../components/ChatInput";

interface MessageType {
  id: string;
  text: string;
  timestamp: string;
  images?: string[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = (text: string, files: File[]) => {
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    const newMessage: MessageType = {
      id: Date.now().toString(),
      text: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      images: imageUrls.length > 0 ? imageUrls : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] justify-between max-w-4xl mx-auto w-full">
      <div
        className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50/50"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <ChatWindow messages={messages} />
      </div>

      <div className="mt-2 bg-white pt-2 pb-4 px-2 border-t border-gray-200">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
