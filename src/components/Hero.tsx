import { motion } from "framer-motion";
import { Linkedin, MapPin, ArrowDown } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import profilePhotoFallback from "@/assets/profile-photo.jpg";

const Hero = () => {
  const { data: profile } = useProfile();

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract geometric bg */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 px-6 py-20">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                <img
                  src={profile?.photo_url || profilePhotoFallback}
                  alt={profile?.full_name || "Thalgy Lino"}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -inset-2 rounded-full border border-primary/10 animate-pulse" />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-3">
              {profile?.full_name || "Thalgy Lino"}
            </h1>
            <p className="text-xl md:text-2xl font-display font-light text-primary/80 mb-4">
              {profile?.title || "Product Manager"}
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-primary-foreground/60 text-base md:text-lg max-w-lg mb-8 leading-relaxed"
          >
            {profile?.bio || "De Marketing e Growth para Product Management. Unindo visão estratégica de negócio, análise de dados e mentalidade centrada no usuário."}
          </motion.p>

          {/* Links - only LinkedIn and location, no sensitive data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-xl text-primary-foreground font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5 text-primary-foreground/40 text-sm">
                <MapPin size={14} />
                {profile.location}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sobre" className="text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors">
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
