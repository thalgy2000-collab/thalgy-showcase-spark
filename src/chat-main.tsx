import { createRoot } from "react-dom/client";
import { ChatWidget } from "./components/chat/ChatWidget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";

const queryClient = new QueryClient();

const container = document.getElementById("chat-widget-root");
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
