import { motion } from "framer-motion";
import { Target, BarChart3, Users, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Target,
    label: "Product Management",
    items: ["Product Discovery", "Roadmap & Backlog", "KPIs & OKRs", "A/B Testing"],
  },
  {
    icon: Users,
    label: "Metodologias Ágeis",
    items: ["Scrum (certificado SMPC)", "Kanban"],
  },
  {
    icon: BarChart3,
    label: "Ferramentas de Análise",
    items: ["Google Analytics", "Power BI"],
  },
  {
    icon: Rocket,
    label: "Growth & Aquisição",
    items: ["Meta Ads", "Google Ads", "Métricas de aquisição", "Teste A/B"],
  },
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
            De marketing a <span className="text-gradient">produto</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Minha trajetória começa em marketing digital e growth — gestão de canais pagos, testes A/B,
            análise de funil e otimização de conversão. Essa base me deu fluência em dados, comportamento
            do usuário e métricas de negócio. Agora, levo toda essa bagagem para Product Management,
            onde conecto necessidades reais dos usuários com oportunidades de negócio para construir
            produtos que geram valor de ponta a ponta.
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
              className="bg-card rounded-2xl p-6 card-elevated border border-border hover:border-primary/30 transition-all group hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-3">{item.label}</h3>
              <ul className="space-y-1.5">
                {item.items.map((sub) => (
                  <li key={sub} className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {sub}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
