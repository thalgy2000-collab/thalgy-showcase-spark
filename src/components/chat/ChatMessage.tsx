import { cn } from "@/lib/utils";
import { Message } from "../../hooks/useChat";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

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
          "max-w-[88%] px-4 py-3 shadow-sm relative group",
          isUser
            ? "bg-[#1F3A5F] text-white rounded-[20px] rounded-tr-sm"
            : "bg-background/95 backdrop-blur-md border border-border/60 text-foreground rounded-[20px] rounded-tl-sm shadow-sm"
        )}
        style={isUser ? { backgroundColor: "#1F3A5F", color: "#FFFFFF" } : {}}
      >
        {isUser ? (
          <p
            className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap !text-white m-0"
            style={{ color: "#FFFFFF" }}
          >
            {message.text}
          </p>
        ) : (
          <div className="text-xs sm:text-sm leading-relaxed text-foreground">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h4 className="font-semibold text-sm mt-3 mb-1.5 text-foreground border-b border-border/40 pb-1">
                    {children}
                  </h4>
                ),
                h2: ({ children }) => (
                  <h4 className="font-semibold text-sm mt-2.5 mb-1 text-foreground">
                    {children}
                  </h4>
                ),
                h3: ({ children }) => (
                  <h5 className="font-semibold text-xs sm:text-sm mt-2 mb-1 text-foreground">
                    {children}
                  </h5>
                ),
                p: ({ children }) => (
                  <p
                    className="text-xs sm:text-sm leading-relaxed mb-2 last:mb-0 text-foreground"
                    style={{ color: "inherit", margin: "0 0 8px 0" }}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-4 space-y-1 my-2 text-xs sm:text-sm text-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-4 space-y-1 my-2 text-xs sm:text-sm text-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li
                    className="text-xs sm:text-sm leading-relaxed text-foreground"
                    style={{ color: "inherit" }}
                  >
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong
                    className="font-semibold text-foreground"
                    style={{ color: "inherit" }}
                  >
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        <span
          className={cn(
            "text-[10px] opacity-0 group-hover:opacity-70 transition-opacity absolute -bottom-5",
            isUser ? "right-1 text-muted-foreground" : "left-1 text-muted-foreground"
          )}
        >
          {format(message.timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};
