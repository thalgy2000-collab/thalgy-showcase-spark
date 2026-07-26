import { useState, useEffect } from "react";
import { getSessionId } from "../utils/session";
import { sendChatMessage } from "../services/chatWebhook";
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

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // We will define the webhook URL in env variables, fallback to empty to avoid crash
      const webhookUrl = import.meta.env.VITE_CHAT_WEBHOOK_URL || "http://localhost:5678/webhook-test/45635239-eab9-4fac-a7d2-8e9d535ce68a";
      if (!webhookUrl) {
        throw new Error("Webhook URL is not configured. Please set VITE_CHAT_WEBHOOK_URL.");
      }

      const response = await sendChatMessage(sessionId, text, webhookUrl);

      if (response.status === "success" && response.output) {
        const newAiMessage: Message = {
          id: crypto.randomUUID(),
          sender: "ai",
          text: response.output,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, newAiMessage]);
      }
    } catch (error) {
      toast.error("Sorry, something went wrong.", {
        action: {
          label: "Retry",
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
