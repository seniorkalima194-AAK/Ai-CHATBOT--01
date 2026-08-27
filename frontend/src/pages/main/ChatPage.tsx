import { useState } from 'react';
import ChatWindow from '../../components/ChatWindow';
import ChatInput from '../../components/ChatInput';

interface MessageType {
  id: string;
  text: string;
  timestamp: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] justify-between max-w-4xl mx-auto w-full">
      <div className="flex-1 overflow-y-auto pr-2">
        <ChatWindow messages={messages} />
      </div>
      
      <div className="mt-4 bg-white pb-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
