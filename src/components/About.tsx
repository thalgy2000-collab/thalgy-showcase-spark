import { motion } from "framer-motion";
import { Target, BarChart3, Users, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Target, label: "Product Discovery", desc: "Entrevistas, análise de concorrência, mapeamento de dores" },
  { icon: BarChart3, label: "Data & Analytics", desc: "Google Analytics, Power BI, Excel Avançado" },
  { icon: Users, label: "Product Delivery", desc: "Backlog, User Stories, Scrum/Kanban" },
  { icon: Lightbulb, label: "Growth & Aquisição", desc: "Meta Ads, Google Ads, Testes A/B" },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase">Sobre</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
            De operações a <span className="text-gradient">produto</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Profissional com sólida experiência em operações e e-commerce, migrando para Product Management.
            Especialista em otimização de processos e análise de dados, com histórico em liderança de equipes
            e implementação de automações que geram eficiência operacional. Atualmente cursando Product Management (PM3),
            unindo visão de negócio, análise econômica e conhecimento técnico para a construção de produtos digitais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 card-elevated border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{item.label}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
