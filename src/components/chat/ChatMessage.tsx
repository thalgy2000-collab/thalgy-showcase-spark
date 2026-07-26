import { cn } from "@/lib/utils";
import { Message } from "../../hooks/useChat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 shadow-sm relative group",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[20px] rounded-tr-sm"
            : "bg-background/60 backdrop-blur-md border border-border/40 text-foreground rounded-[20px] rounded-tl-sm"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        
        <span
          className={cn(
            "text-[10px] opacity-0 group-hover:opacity-70 transition-opacity absolute -bottom-5",
            isUser ? "right-1 text-muted-foreground" : "left-1 text-muted-foreground"
          )}
        >
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
};
