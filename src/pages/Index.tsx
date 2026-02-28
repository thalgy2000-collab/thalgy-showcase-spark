import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Certifications />
      <Contact />
      <footer className="bg-background border-t border-border py-6">
        <div className="container px-6 text-center text-muted-foreground text-sm">
          © 2025 Thalgy Lino. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
