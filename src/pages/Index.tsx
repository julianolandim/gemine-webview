import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import geminiIcon from "@/assets/gemini-icon.png";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const geminiUrl = "https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const openGemini = () => {
    // Verifica se está rodando no Electron
    if (window.electronAPI) {
      window.electronAPI.openGemini(geminiUrl);
    } else {
      // Fallback para navegador
      window.open(geminiUrl, '_blank');
    }
  };

  // Auto-open após loading
  useEffect(() => {
    if (!isLoading) {
      const autoOpenTimer = setTimeout(() => {
        openGemini();
      }, 500);
      return () => clearTimeout(autoOpenTimer);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
          <div className="mb-8 animate-pulse">
            <img 
              src={geminiIcon} 
              alt="Gemini" 
              className="w-32 h-32 rounded-3xl shadow-glow"
            />
          </div>
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-base">Inicializando Gemini AI...</p>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background">
          <div className="mb-8 relative">
            <div className="absolute inset-0 animate-pulse blur-2xl opacity-50 bg-gradient-gemini rounded-full"></div>
            <img 
              src={geminiIcon} 
              alt="Gemini" 
              className="w-32 h-32 rounded-3xl shadow-glow relative z-10"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-gemini bg-clip-text text-transparent">
            Gemini AI
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Seu assistente de inteligência artificial do Google, agora em um app nativo profissional
          </p>

          <Button 
            onClick={openGemini}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Abrir Gemini
          </Button>

          <p className="text-xs text-muted-foreground mt-6 max-w-sm">
            O Gemini será aberto no seu navegador padrão, onde você pode fazer login normalmente
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
