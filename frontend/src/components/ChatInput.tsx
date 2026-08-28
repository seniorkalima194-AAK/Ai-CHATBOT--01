import { useState, useRef } from "react";
import {
  CameraIcon,
  PaperclipIcon,
  Pencil,
  Send,
  X,
  FileIcon,
  ImageIcon,
  FileTextIcon,
} from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string, attachments: File[]) => void;
}

interface LocalPreview {
  id: string;
  file: File;
  url: string;
  type: "image" | "document";
}

const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getFileIcon = (file: File) => {
  const type = file.type;
  const name = file.name.toLowerCase();

  if (type.startsWith("image/")) {
    return <ImageIcon size={16} className="text-blue-500" />;
  }

  if (type === "application/pdf" || name.endsWith(".pdf")) {
    return <FileTextIcon size={16} className="text-red-500" />;
  }

  if (
    type === "application/msword" ||
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".doc") ||
    name.endsWith(".docx")
  ) {
    return <FileTextIcon size={16} className="text-blue-600" />;
  }

  if (
    type === "application/vnd.ms-excel" ||
    type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    name.endsWith(".xls") ||
    name.endsWith(".xlsx")
  ) {
    return <FileTextIcon size={16} className="text-green-600" />;
  }

  if (type === "text/plain" || name.endsWith(".txt")) {
    return <FileTextIcon size={16} className="text-gray-500" />;
  }

  return <FileIcon size={16} className="text-gray-400" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [previews, setPreviews] = useState<LocalPreview[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const inputTextFieldRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const newPreviews: LocalPreview[] = selectedFiles.map((file) => {
      const isImage = file.type.startsWith("image/");
      return {
        id: generateId(),
        file: file,
        url: isImage ? URL.createObjectURL(file) : "",
        type: isImage ? "image" : "document",
      };
    });

    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removePreview = (id: string, url: string) => {
    if (url) URL.revokeObjectURL(url);
    setPreviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() || previews.length > 0) {
      const filesToSend = previews.map((p) => p.file);
      onSendMessage(inputValue, filesToSend);

      setInputValue("");
      setPreviews([]);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />

      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-200 rounded-2xl flex flex-col px-5 py-3.5 gap-3 shadow-sm hover:shadow-md transition-shadow bg-white"
      >
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-200">
            {previews.map((item) => (
              <div key={item.id} className="relative group">
                {item.type === "image" ? (
                  // Image preview
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-200 shadow-sm">
                    <img
                      src={item.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center bg-gray-50 p-2">
                    {getFileIcon(item.file)}
                    <span className="text-[8px] text-gray-600 text-center mt-1 truncate w-full">
                      {item.file.name}
                    </span>
                    <span className="text-[7px] text-gray-400">
                      {formatFileSize(item.file.size)}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removePreview(item.id, item.url)}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 transition-all hover:scale-110 shadow-md"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => inputTextFieldRef.current?.focus()}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <Pencil size={20} />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              ref={inputTextFieldRef}
              placeholder="Ask anything here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base py-1"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
            disabled={!inputValue.trim() && previews.length === 0}
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="flex flex-row flex-wrap gap-2.5 mt-4 justify-center items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-5 py-2 bg-white hover:bg-gray-50 hover:border-gray-300 text-sm font-medium transition-all shadow-sm hover:shadow"
        >
          <PaperclipIcon size={16} />
          <span>Attach File</span>
        </button>

        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-5 py-2 bg-white hover:bg-gray-50 hover:border-gray-300 text-sm font-medium transition-all shadow-sm hover:shadow"
        >
          <CameraIcon size={16} />
          <span>Camera</span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
