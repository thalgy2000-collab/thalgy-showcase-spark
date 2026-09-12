import { useState, useEffect } from "react";
import { getSessionId } from "../utils/session";
import { sendGeminiChatMessage } from "../services/geminiChat";
import { toast } from "sonner";

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Initialize session ID
    setSessionId(getSessionId());

    // Load messages from local storage
    const storedMessages = localStorage.getItem("chat_messages");
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error("Failed to parse stored messages", e);
      }
    }
  }, []);

  // Sync messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: text.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const outputText = await sendGeminiChatMessage(updatedMessages);

      const newAiMessage: Message = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: outputText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error: any) {
      const errorMsg =
        error?.message || "Desculpe, ocorreu um erro ao conectar com o Gemini.";
      toast.error(errorMsg, {
        action: {
          label: "Tentar novamente",
          onClick: () => sendMessage(text),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    isLoading,
  };
};
