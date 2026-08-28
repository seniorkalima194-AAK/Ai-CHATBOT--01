import ChatMessage from "./ChatMessage";

interface MessageType {
  id: string;
  text: string;
  timestamp: string;
  images?: string[];
}

interface ChatWindowProps {
  messages: MessageType[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  if (messages.length === 0) {
    return <ChatMessage isWelcomeScreen={true} />;
  }

  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 p-4 rounded-2xl max-w-2xl self-end shadow-sm hover:shadow-md transition-shadow"
        >
          {msg.text && (
            <p className="text-gray-800 text-base break-words leading-relaxed">
              {msg.text}
            </p>
          )}

          {msg.images && msg.images.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${msg.text ? "mt-3" : ""}`}>
              {msg.images.map((imgUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imgUrl}
                    alt={`Uploaded media ${index + 1}`}
                    className="max-w-[200px] max-h-48 rounded-xl object-cover border-2 border-white shadow-md hover:shadow-xl transition-shadow"
                    onLoad={() => URL.revokeObjectURL(imgUrl)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-all" />
                </div>
              
              ))}
            </div>
          
          )}

          <span className="text-[10px] text-gray-400 self-end mt-2 font-mono">
            {msg.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
