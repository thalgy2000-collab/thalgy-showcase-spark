import { createRoot } from "react-dom/client";
import { ChatWidget } from "./components/chat/ChatWidget";
import { AuroraHero } from "./components/ui/futurastic-hero-section";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";

const queryClient = new QueryClient();

// Mount Chat Widget
const chatContainer = document.getElementById("chat-widget-root");
if (chatContainer) {
  createRoot(chatContainer).render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ChatWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Mount Aurora Hero
const heroContainer = document.getElementById("hero-root");
if (heroContainer) {
  createRoot(heroContainer).render(
    <AuroraHero />
  );
}
