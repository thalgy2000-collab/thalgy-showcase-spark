import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [text]);

  return (
    <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-md rounded-b-2xl">
      <div className="relative flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="min-h-[44px] max-h-[150px] resize-none pr-12 py-3 rounded-xl border-border/50 focus-visible:ring-primary/20 bg-muted/30"
          disabled={isLoading}
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          size="icon"
          className="absolute right-1 bottom-1 h-[36px] w-[36px] rounded-lg bg-primary hover:bg-primary/90 transition-colors"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-muted-foreground">
          Press Enter to send, Shift + Enter for new line
        </span>
      </div>
    </div>
  );
};
