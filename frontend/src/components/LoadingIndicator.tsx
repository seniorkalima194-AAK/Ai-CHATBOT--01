const LoadingIndicator = () => {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="flex gap-1">
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-sm text-gray-500">AI is thinking...</span>
    </div>
  );
};

export default LoadingIndicator;
