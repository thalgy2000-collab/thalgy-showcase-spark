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
    <div className="p-4 border-t border-border/30 bg-background/50 backdrop-blur-md rounded-b-[20px]">
      <div className="relative flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte qualquer coisa sobre o Thalgy..."
          className="min-h-[48px] max-h-[104px] resize-none pr-12 py-3 rounded-[20px] border-border/50 focus-visible:ring-blue-500/30 bg-muted/30 shadow-inner"
          disabled={isLoading}
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          size="icon"
          className="absolute right-2 bottom-1.5 h-[36px] w-[36px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-sm"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-muted-foreground">
          Pressione Enter para enviar, Shift + Enter para nova linha
        </span>
      </div>
    </div>
  );
};
