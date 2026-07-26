import { FloatingChatButton } from "./FloatingChatButton";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "../../hooks/useChat";

export const ChatWidget = () => {
  const { isOpen, toggleChat, messages, sendMessage, isLoading } = useChat();

  return (
    <>
      <FloatingChatButton isOpen={isOpen} toggleChat={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        toggleChat={toggleChat}
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </>
  );
};
