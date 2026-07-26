export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 p-4 bg-muted/50 rounded-2xl rounded-tl-sm w-fit shadow-sm backdrop-blur-sm border border-border/50">
      <div
        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};
