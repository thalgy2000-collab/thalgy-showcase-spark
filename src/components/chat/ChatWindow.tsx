import { useEffect, useRef } from "react";
import { Message } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatWindow = ({
  isOpen,
  messages,
  onSendMessage,
  isLoading,
}: ChatWindowProps) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small timeout to allow DOM to update before scrolling
    setTimeout(() => {
      scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, isLoading, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right shadow-2xl",
        "w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-8rem)]",
        "bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50 bg-primary/5">
        <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
          <AvatarImage src="" alt="AI Avatar" />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm leading-none mb-1 text-foreground">Ask me anything</h3>
          <p className="text-xs text-muted-foreground">Questions about my experience and portfolio</p>
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-background/50 to-background">
        <div className="flex flex-col min-h-full justify-end">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 my-10 opacity-70">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">👋</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-[250px]">
                Hi! I'm an AI assistant trained on this portfolio. How can I help you today?
              </p>
            </div>
          ) : (
            <div className="space-y-1 mb-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex w-full mb-4 justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>
          )}
          <div ref={scrollEndRef} className="h-px w-full" />
        </div>
      </ScrollArea>

      {/* Footer */}
      <ChatInput onSend={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
