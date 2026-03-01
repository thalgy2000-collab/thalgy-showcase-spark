import { motion } from "framer-motion";
import { Award, GraduationCap, LayoutDashboard, Trello, Workflow, Figma, BarChart3, FileSpreadsheet, Megaphone, Heart } from "lucide-react";

const certifications = [
  { name: "Product Management — PM3", link: "https://gerarcertificado.com.br/validar.php" },
  { name: "Scrum Master Professional Certificate (SMPC) — Certprof", link: "https://drive.google.com/drive/u/0/folders/1cP-AXITCA4U0YTIbpwTgN66e_GVu_heb" },
  { name: "Power BI para Business Intelligence — Data Science Academy", link: "https://drive.google.com/drive/u/0/folders/1cP-AXITCA4U0YTIbpwTgN66e_GVu_heb" },
];

const tools = [
  { name: "Jira", icon: LayoutDashboard },
  { name: "Trello", icon: Trello },
  { name: "N8N", icon: Workflow },
  { name: "Figma", icon: Figma },
  { name: "Meta Ads", icon: Megaphone },
  { name: "Google Ads", icon: Megaphone },
  { name: "Google Analytics", icon: BarChart3 },
  { name: "Power BI", icon: BarChart3 },
  { name: "Excel Avançado", icon: FileSpreadsheet },
  { name: "Lovable", icon: Heart },
];

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
                <motion.a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 card-elevated hover:border-primary/50 transition-colors"
                >
                  <Award size={20} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-medium">{cert.name}</span>
                </motion.a>
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
              <div className="bg-card border border-border rounded-xl p-4 card-elevated">
                <div className="flex items-start gap-3">
                  <GraduationCap size={20} className="text-primary mt-0.5 shrink-0" />
                  <div className="w-full">
                    <p className="font-medium">Graduação em Marketing</p>
                    <p className="text-muted-foreground text-sm">Uniessa • Mar 2026 — Jun 2028</p>
                    <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">Em andamento</span>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progresso</span>
                        <span>0%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: "0%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 card-elevated">
                <div className="flex items-start gap-3">
                  <GraduationCap size={20} className="text-primary mt-0.5 shrink-0" />
                  <div className="w-full">
                    <p className="font-medium">Ciências Econômicas</p>
                    <p className="text-muted-foreground text-sm">Universidade Federal de Alfenas • 2019 — 2023</p>
                    <span className="inline-block text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full mt-1">Incompleta</span>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progresso</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-muted-foreground/50"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-display font-semibold mb-4">Ferramentas</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1.5 rounded-lg"
                  >
                    <Icon size={16} className="text-primary shrink-0" />
                    {tool.name}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
