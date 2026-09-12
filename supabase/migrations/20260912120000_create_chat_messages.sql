-- Tabela para rastreamento de conversas com o assistente de IA
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Política para permitir que o front-end envie as mensagens do chat (anon e authenticated)
CREATE POLICY "Permitir insercao de mensagens no chat"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política para leitura das mensagens
CREATE POLICY "Permitir leitura de mensagens no chat"
ON public.chat_messages
FOR SELECT
TO anon, authenticated
USING (true);

-- Índices para consultas otimizadas por sessão e data
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages (session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages (created_at DESC);
