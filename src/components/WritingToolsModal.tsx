import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  RefreshCw, 
  Languages, 
  Sparkles,
  Copy,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

interface WritingToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const WritingToolsModal = ({ isOpen, onClose, text }: WritingToolsModalProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const tools = [
    { id: "correct", label: "Corrigir", icon: CheckCircle, description: "Corrige erros gramaticais e ortográficos" },
    { id: "rewrite", label: "Reescrever", icon: RefreshCw, description: "Reescreve o texto de forma mais clara" },
    { id: "translate", label: "Traduzir", icon: Languages, description: "Traduz o texto para outro idioma" },
    { id: "improve", label: "Melhorar", icon: Sparkles, description: "Melhora o estilo e a clareza" },
  ];

  const handleToolClick = async (toolId: string) => {
    setSelectedTool(toolId);
    setIsProcessing(true);
    
    // Simula processamento - em produção, isso seria uma chamada à API
    setTimeout(() => {
      let processedText = text;
      
      switch (toolId) {
        case "correct":
          processedText = `[Texto corrigido]\n\n${text}`;
          break;
        case "rewrite":
          processedText = `[Texto reescrito]\n\n${text}`;
          break;
        case "translate":
          processedText = `[Tradução para Inglês]\n\n${text}`;
          break;
        case "improve":
          processedText = `[Texto melhorado]\n\n${text}`;
          break;
      }
      
      setResult(processedText);
      setIsProcessing(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result || text);
    toast.success("Texto copiado para a área de transferência");
  };

  const handleReset = () => {
    setSelectedTool(null);
    setResult("");
  };

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Ferramentas de Escrita
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Texto original */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Texto selecionado:
            </label>
            <Textarea 
              value={text} 
              readOnly 
              className="min-h-[100px] resize-none bg-muted/50"
            />
          </div>

          {/* Ferramentas */}
          {!selectedTool && (
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-accent"
                  onClick={() => handleToolClick(tool.id)}
                >
                  <div className="flex items-center gap-2">
                    <tool.icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{tool.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground text-left">
                    {tool.description}
                  </span>
                </Button>
              ))}
            </div>
          )}

          {/* Resultado */}
          {selectedTool && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4" />
                <span>
                  {tools.find(t => t.id === selectedTool)?.label}
                </span>
              </div>

              {isProcessing ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <Textarea 
                    value={result} 
                    readOnly 
                    className="min-h-[120px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleReset}
                    >
                      Voltar
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WritingToolsModal;
