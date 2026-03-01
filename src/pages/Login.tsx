import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setMessage("Verifique seu email para confirmar o cadastro.");
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          Voltar
        </a>

        <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-8 border border-border shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <LogIn size={20} className="text-primary" />
            <h1 className="font-display font-bold text-xl">
              {isSignUp ? "Criar conta" : "Área Admin"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {message && <p className="text-sm text-accent">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Carregando..." : isSignUp ? "Cadastrar" : "Entrar"}
            </button>
          </form>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            {isSignUp ? "Já tem conta? Entre aqui" : "Criar nova conta"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
