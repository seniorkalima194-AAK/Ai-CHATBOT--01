import { useState } from "react";
import { CameraIcon, PaperclipIcon, Pencil, Send } from "lucide-react";
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevents page reload
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue(""); // Clears field instantly
    }
  };

  return (
    <div className="w-full">
      
      <form
        onSubmit={handleSubmit}
        className="border border-gray-700 rounded-full flex items-center px-5 py-3.5 gap-3 shadow-md"
      >
        <button
          type="button"
          className="text-gray-400 hover:text-white transition"
        >
          <Pencil size={20} />
        </button>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Ask anything here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent outline-none text-black placeholder-gray-400 text-base"
          />
        </div>

        <button
          type="submit"
          className="text-black text-xl hover:scale-110 transition active:scale-95"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>

      <div className="flex flex-row flex-wrap gap-2.5 mt-4 justify-center items-center">
        <button className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-4 py-1.5 bg-white hover:bg-gray-50 text-sm font-medium transition shadow-sm">
          <Pencil size={16} />
          <span>Write / Edit</span>
        </button>
        <button className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-4 py-1.5 bg-white hover:bg-gray-50 text-sm font-medium transition shadow-sm">
          <PaperclipIcon size={16} />
          <span>Attach file</span>
        </button>
        <button className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-4 py-1.5 bg-white hover:bg-gray-50 text-sm font-medium transition shadow-sm">
          <CameraIcon size={16} />
          <span>Camera capture</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
