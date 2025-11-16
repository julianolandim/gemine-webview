import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import geminiIcon from "@/assets/gemini-icon.png";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const geminiUrl = "https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all";

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-card">
          <div className="mb-8 animate-pulse">
            <img 
              src={geminiIcon} 
              alt="Gemini" 
              className="w-24 h-24 rounded-3xl shadow-glow"
            />
          </div>
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-sm">Carregando Gemini...</p>
        </div>
      )}

      {/* Main Webview Container */}
      <div className="flex-1 relative">
        <iframe
          src={geminiUrl}
          className="w-full h-full border-0"
          title="Gemini AI"
          allow="camera; microphone; clipboard-write; clipboard-read"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

export default Index;
