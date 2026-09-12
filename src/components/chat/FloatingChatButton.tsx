import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingChatButtonProps {
  isOpen: boolean;
  toggleChat: () => void;
}

export const FloatingChatButton = ({ isOpen, toggleChat }: FloatingChatButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleChat}
        className="h-[60px] w-[60px] rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-500 to-indigo-600 text-white relative border-none"
        size="icon"
        aria-label="Abrir ou fechar chat"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-background"></span>
          </span>
        )}
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
};
