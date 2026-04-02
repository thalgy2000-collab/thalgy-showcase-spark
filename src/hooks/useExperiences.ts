import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ExperienceResult {
  metric: string;
  label: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  is_current: boolean;
  description: string | null;
  products: string | null;
  technologies: string[] | null;
  pm_skills: string[] | null;
  results: ExperienceResult[];
  sort_order: number;
  images?: { id: string; image_url: string; caption: string | null }[];
}

const defaultExperiences: Experience[] = [
  {
    id: "1",
    role: "Analista de Marketplaces",
    company: "",
    period: "Out 2025 — Atual",
    is_current: true,
    products: "Gestão de loja oficial em marketplace, incluindo criação e otimização de listings, gestão de campanhas promocionais e estruturação do funil de vendas completo na plataforma.",
    technologies: ["Marketplace Seller Center", "Google Analytics", "Excel", "Bling ERP"],
    pm_skills: ["Testes A/B", "Análise de Funil", "Retenção de Clientes", "Growth"],
    results: [
      { metric: "+15%", label: "aumento em vendas via Testes A/B" },
      { metric: "-20%", label: "redução de churn com fluxo proativo" },
    ],
    description: "Gestão de funil de vendas de ponta a ponta em marketplace, unindo estratégias de Growth e Customer Experience. Estruturação de testes A/B e implementação de fluxos proativos de retenção.",
    sort_order: 0,
  },
  {
    id: "2",
    role: "Analista de Marketplaces",
    company: "",
    period: "Jul 2024 — Set 2025",
    is_current: false,
    products: "Fundação do setor de marketplaces do zero. Estruturação de operação multi-marketplace (Mercado Livre, Amazon), definição de processos de cadastro, precificação dinâmica e gestão do ciclo de vida dos produtos.",
    technologies: ["Mercado Livre", "Amazon", "Shankya", "Excel"],
    pm_skills: ["Jornada 0→1", "Processos Escaláveis", "Precificação", "Discovery"],
    results: [
      { metric: "0→1", label: "fundação do setor de marketplaces" },
    ],
    description: "Responsável pela fundação e estruturação do setor de marketplaces (jornada 0 ao 1). Definição de estratégia de precificação, gestão do ciclo de vida dos produtos e criação de processos operacionais escaláveis.",
    sort_order: 1,
  },
  {
    id: "3",
    role: "Coordenador de Operações",
    company: "",
    period: "Ago 2022 — Mar 2023",
    is_current: false,
    products: "Implementação de dashboard de acompanhamento de projetos e automação de relatórios de performance para clientes B2B/B2C. Criação de fluxos automatizados de onboarding de clientes.",
    technologies: ["Trello", "Google Workspace", "ClickUp", "Power BI", "Slack", "Meta Ads", "Google Ads", "Google Data Studio"],
    pm_skills: ["Gestão de Stakeholders", "Automação de Processos", "Liderança", "Delivery"],
    results: [
      { metric: "+10%", label: "produtividade da equipe com automação de processos" },
    ],
    description: "Liderança do planejamento estratégico e execução de projetos para clientes B2B/B2C. Elo central entre stakeholders e equipes de Tráfego Pago, Social Media, TI e Design. Redução de processos operacionais através da automação, resultando em ganho de produtividade.",
    sort_order: 2,
  },
  {
    id: "4",
    role: "Analista de Mídias Digitais",
    company: "",
    period: "Ago 2022 — Mar 2023",
    is_current: false,
    products: "Gestão de campanhas de aquisição paga em Meta Ads e Google Ads. Criação de landing pages otimizadas para conversão e implementação de tracking completo da jornada do usuário.",
    technologies: ["Meta Ads", "Google Ads", "Google Analytics", "Facebook Pixel", "Google Tag Manager"],
    pm_skills: ["Análise de Jornada", "Otimização de Conversão", "Métricas de Aquisição", "Growth Hacking"],
    results: [
      { metric: "+5%", label: "crescimento de seguidores dos clientes" },
      { metric: "+10%", label: "aumento em leads quentes" },
    ],
    description: "Gestão de canais de aquisição pagos (Meta/Google Ads), focando na análise da jornada do usuário desde o primeiro contato até a conversão. Estratégias de conteúdo e tráfego pago que resultaram em crescimento da base de seguidores e geração de leads qualificados.",
    sort_order: 3,
  },
];

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*, experience_images(*)")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) return defaultExperiences;

      return data.map((exp: any) => ({
        ...exp,
        results: (exp.results as ExperienceResult[]) || [],
        images: exp.experience_images || [],
      })) as Experience[];
    },
    placeholderData: defaultExperiences,
  });
}
