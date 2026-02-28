import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

const certifications = [
  "Product Management — PM3",
  "Scrum Master Professional Certificate (SMPC) — Certprof",
];

const tools = ["Jira", "Trello", "N8N", "Figma", "Meta Ads", "Google Analytics", "Power BI", "Excel Avançado"];

const Certifications = () => {
  return (
    <section id="certificacoes" className="py-24 bg-background">
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Certificações */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-display text-sm tracking-widest uppercase">Certificações</span>
            <h2 className="text-3xl font-display font-bold mt-2 mb-8">Certificados</h2>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 card-elevated"
                >
                  <Award size={20} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-medium">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Formação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary font-display text-sm tracking-widest uppercase">Formação</span>
            <h2 className="text-3xl font-display font-bold mt-2 mb-8">Educação</h2>
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 card-elevated">
                <GraduationCap size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Graduação em Marketing</p>
                  <p className="text-muted-foreground text-sm">Uniessa • Mar 2026 — Jun 2028</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 card-elevated">
                <GraduationCap size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Ciências Econômicas</p>
                  <p className="text-muted-foreground text-sm">Universidade Federal de Alfenas • 2019 — 2023</p>
                </div>
              </div>
            </div>

            <h3 className="font-display font-semibold mb-4">Ferramentas</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1.5 rounded-lg"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
