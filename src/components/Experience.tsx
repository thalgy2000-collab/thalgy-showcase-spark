import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const experiences = [
  {
    role: "Analista de Marketplaces",
    company: "BRK Agro",
    period: "Out 2025 — Atual",
    current: true,
    results: [
      { metric: "+15%", label: "aumento em vendas via Testes A/B" },
      { metric: "-20%", label: "redução de churn com fluxo proativo" },
    ],
    description:
      "Gestão de funil de vendas de ponta a ponta na Shopee, unindo estratégias de Growth e Customer Experience. Estruturação de testes A/B e implementação de fluxos proativos de retenção.",
  },
  {
    role: "Analista de Marketplaces",
    company: "Balux Pet Market",
    period: "Jul 2024 — Set 2025",
    current: false,
    results: [
      { metric: "0→1", label: "fundação do setor de marketplaces" },
    ],
    description:
      "Responsável pela fundação e estruturação do setor de marketplaces (jornada 0 ao 1). Definição de estratégia de precificação, gestão do ciclo de vida dos produtos e criação de processos operacionais escaláveis.",
  },
  {
    role: "Coordenador de Operações",
    company: "Cyber for Business",
    period: "Ago 2022 — Mar 2023",
    current: false,
    results: [
      { metric: "+10%", label: "produtividade da equipe com automação de processos" },
    ],
    description:
      "Liderança do planejamento estratégico e execução de projetos para clientes B2B/B2C. Elo central entre stakeholders e equipes de Tráfego Pago, Social Media, TI e Design. Redução de processos operacionais através da automação, resultando em ganho de produtividade.",
  },
  {
    role: "Analista de Mídias Digitais",
    company: "Cyber for Business",
    period: "Ago 2022 — Mar 2023",
    current: false,
    results: [],
    description:
      "Gestão de canais de aquisição pagos (Meta/Google Ads), focando na análise da jornada do usuário desde o primeiro contato até a conversão.",
  },
];

const Experience = () => {
  return (
    <section id="experiencia" className="py-24 bg-secondary/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase">Experiência</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            Trajetória profissional
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-3xl">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                {exp.current && (
                  <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    Atual
                  </span>
                )}
              </div>

              <p className="text-primary font-medium text-sm mb-1">{exp.company}</p>
              <p className="text-muted-foreground text-sm mb-3">{exp.period}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

              {exp.results.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {exp.results.map((r, j) => (
                    <div key={j} className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 card-elevated">
                      <TrendingUp size={14} className="text-accent" />
                      <span className="font-display font-bold text-accent">{r.metric}</span>
                      <span className="text-muted-foreground text-sm">{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
