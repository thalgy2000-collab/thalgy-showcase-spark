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
          "max-w-[80%] px-4 py-3 shadow-sm relative group",
          isUser
            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
            : "bg-muted/80 backdrop-blur-sm border border-border/50 text-foreground rounded-2xl rounded-tl-sm"
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
