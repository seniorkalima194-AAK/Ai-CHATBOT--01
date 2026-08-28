import { HandIcon } from "lucide-react";

interface ChatMessageProps {
  isWelcomeScreen?: boolean;
}

const ChatMessage = ({ isWelcomeScreen = false }: ChatMessageProps) => {
  if (!isWelcomeScreen) return null;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-full">
          <HandIcon size={48} className="" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Hello!
        </h2>
      </div>

      <div className="space-y-2">
        <p className="text-gray-600 text-lg max-w-md">
          How can I help you today?
        </p>
        <p className="text-gray-400 text-sm">
          Upload images or type your question below
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
