import { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Message } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  isOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatWindow = ({
  isOpen,
  toggleChat,
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
        "fixed bottom-[100px] right-6 z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)]",
        "w-[calc(100vw-24px)] sm:w-[360px] md:w-[380px] h-[70vh] md:h-[620px] max-h-[70vh] md:max-h-[75vh]",
        "bg-background/80 backdrop-blur-2xl border border-border/40 rounded-[20px]",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-background/50 h-[64px]">
        <Avatar className="h-9 w-9 border border-primary/20 shadow-sm">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-sm leading-tight text-foreground">Thalgy's AI</h3>
          <p className="text-[11px] text-muted-foreground leading-tight">Ask me about his work</p>
        </div>
        <button
          onClick={toggleChat}
          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <ScrollArea className="flex-1 px-4 py-4 bg-transparent">
        <div className="flex flex-col min-h-full justify-end">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 my-8 opacity-90">
              <div className="h-14 w-14 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-1">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="text-sm text-foreground font-medium">
                Welcome!
              </p>
              <p className="text-xs text-muted-foreground max-w-[240px]">
                I'm an AI assistant trained on Thalgy's portfolio. How can I help you today?
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
