import ChatMessage from "./ChatMessage";

// 1. Model the internal signature of a single message node
interface MessageType {
  id: string;
  text: string;
  timestamp: string;
}

// 2. Define the structural configuration for props matching
interface ChatWindowProps {
  messages: MessageType[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  // Safe Empty state catch condition
  if (messages.length === 0) {
    return <ChatMessage isWelcomeScreen={true} />;
  }

  return (
    <div className="w-full flex flex-col gap-4 py-4">   
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="flex flex-col bg-gray-50 border border-gray-100 p-4 rounded-2xl max-w-2xl self-end shadow-sm"
        >
          <p className="text-gray-900 text-base break-words">{msg.text}</p>
          <span className="text-[10px] text-gray-400 self-end mt-1">{msg.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
