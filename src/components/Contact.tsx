import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-24 hero-bg">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase">Contato</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-primary-foreground">
            Vamos conversar?
          </h2>
          <p className="text-primary-foreground/60 mb-10">
            Em transição de Marketing para Produto — aberto a oportunidades em PM, Growth PM e Product Ops.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:thalgy2000@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Mail size={18} />
              thalgy2000@gmail.com
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/thalgy-lino-438445196/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/20 text-primary-foreground/80 px-6 py-3 rounded-lg font-medium hover:border-primary-foreground/40 transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </div>

          <p className="text-primary-foreground/40 text-sm mt-8 flex items-center justify-center gap-1.5">
            <Phone size={14} />
            (16) 99465-7472
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
