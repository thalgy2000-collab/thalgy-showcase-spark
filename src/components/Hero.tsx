import { motion } from "framer-motion";
import { ArrowDown, Linkedin, Mail, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-display text-sm tracking-widest uppercase">
              Product Manager
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[0.95] mb-6">
            Thalgy
            <br />
            <span className="text-gradient">Lino</span>
          </h1>



          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-10 font-light leading-relaxed"
          >
            De Marketing e Growth para Product Management. Unindo visão estratégica de negócio,
            análise de dados e mentalidade centrada no usuário para construir produtos digitais com impacto real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="https://www.linkedin.com/in/thalgy-lino-438445196/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-lg text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="mailto:thalgy2000@gmail.com"
              className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 rounded-lg text-primary-foreground/80 font-medium hover:border-primary-foreground/40 transition-colors"
            >
              <Mail size={18} />
              Contato
            </a>
            <span className="inline-flex items-center gap-1.5 text-primary-foreground/50 text-sm">
              <MapPin size={14} />
              Uberlândia, MG
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sobre" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
