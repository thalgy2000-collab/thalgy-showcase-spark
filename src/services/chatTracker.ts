import { supabase } from "../integrations/supabase/client";

export interface LogChatMessageParams {
  sessionId: string;
  sender: "user" | "ai";
  message: string;
  metadata?: Record<string, any>;
}

/**
 * Registra cada mensagem enviada (pelo usuário ou pela IA) no Supabase.
 * Executa em segundo plano com tratamento de erros resiliente para não travar a conversa.
 */
export const trackChatMessage = async ({
  sessionId,
  sender,
  message,
  metadata = {},
}: LogChatMessageParams): Promise<void> => {
  try {
    const { error } = await supabase.from("chat_messages").insert({
      session_id: sessionId,
      sender,
      message,
      metadata: {
        ...metadata,
        url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        logged_at: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.warn("[chatTracker] Erro ao salvar mensagem no Supabase:", error.message);
    }
  } catch (err: any) {
    console.warn("[chatTracker] Falha na requisição para o Supabase:", err?.message || err);
  }
};
