import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

interface SummarizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const SummarizeModal = ({ isOpen, onClose, text }: SummarizeModalProps) => {
  const [summary, setSummary] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const generateSummary = () => {
    setIsProcessing(true);
    
    // Simula processamento - em produção, isso seria uma chamada à API
    setTimeout(() => {
      // Cria um resumo simples baseado no texto
      const words = text.split(/\s+/);
      const wordCount = words.length;
      
      let summaryText = "";
      
      if (wordCount <= 20) {
        summaryText = `O texto é muito curto para resumir. Contém ${wordCount} palavras.`;
      } else {
        // Simula um resumo pegando as primeiras frases
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const firstSentences = sentences.slice(0, Math.min(2, sentences.length)).join('. ');
        
        summaryText = `📝 Resumo:\n\n${firstSentences}.\n\n📊 Estatísticas:\n• ${wordCount} palavras\n• ${sentences.length} sentenças`;
      }
      
      setSummary(summaryText);
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Resumo copiado para a área de transferência");
  };

  useEffect(() => {
    if (isOpen && text) {
      generateSummary();
    }
  }, [isOpen, text]);

  useEffect(() => {
    if (!isOpen) {
      setSummary("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Resumir Texto
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Texto original (colapsado) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Texto original:
            </label>
            <Textarea 
              value={text} 
              readOnly 
              className="min-h-[80px] max-h-[100px] resize-none bg-muted/50 text-sm"
            />
          </div>

          {/* Resumo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Resumo:
            </label>
            
            {isProcessing ? (
              <div className="flex items-center justify-center py-8 border rounded-md bg-muted/30">
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Gerando resumo...
                  </span>
                </div>
              </div>
            ) : (
              <>
                <Textarea 
                  value={summary} 
                  readOnly 
                  className="min-h-[150px] resize-none"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateSummary}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummarizeModal;
