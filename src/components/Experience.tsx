import { motion } from "framer-motion";
import { TrendingUp, Cpu, Wrench, Package } from "lucide-react";
import { useExperiences } from "@/hooks/useExperiences";

const Experience = () => {
  const { data: experiences } = useExperiences();

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

        <div className="space-y-10 max-w-4xl">
          {experiences?.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                {exp.is_current && (
                  <span className="text-xs font-medium bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    Atual
                  </span>
                )}
              </div>

              <p className="text-primary font-medium text-sm mb-1">{exp.company}</p>
              <p className="text-muted-foreground text-sm mb-3">{exp.period}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

              {/* Products section */}
              {exp.products && (
                <div className="mb-4 bg-card border border-border rounded-xl p-4 card-elevated">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={16} className="text-primary" />
                    <span className="font-display font-semibold text-sm">Produtos & Entregas</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.products}</p>
                </div>
              )}

              {/* Technologies & PM Skills */}
              <div className="flex flex-wrap gap-4 mb-4">
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Cpu size={14} className="text-accent" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tecnologias</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, j) => (
                        <span key={j} className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {exp.pm_skills && exp.pm_skills.length > 0 && (
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Wrench size={14} className="text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills de PM</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.pm_skills.map((skill, j) => (
                        <span key={j} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              {exp.results.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {exp.results.map((r, j) => (
                    <div key={j} className="inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 card-elevated">
                      <TrendingUp size={14} className="text-accent" />
                      <span className="font-display font-bold text-accent">{r.metric}</span>
                      <span className="text-muted-foreground text-sm">{r.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience images */}
              {exp.images && exp.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {exp.images.map((img) => (
                    <div key={img.id} className="shrink-0 rounded-lg overflow-hidden border border-border">
                      <img src={img.image_url} alt={img.caption || ""} className="h-32 w-auto object-cover" />
                      {img.caption && (
                        <p className="text-xs text-muted-foreground p-2">{img.caption}</p>
                      )}
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
