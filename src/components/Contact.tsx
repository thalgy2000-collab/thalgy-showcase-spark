import { motion } from "framer-motion";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const Contact = () => {
  const { data: profile } = useProfile();

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

          <div className="flex justify-center">
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25 text-lg"
              >
                <Linkedin size={20} />
                Conecte-se no LinkedIn
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>

          <p className="text-primary-foreground/30 text-sm mt-8">
            Para informações de contato direto, acesse meu perfil no LinkedIn.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
