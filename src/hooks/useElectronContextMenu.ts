import { useState, useEffect, useCallback } from "react";

interface ElectronContextMenuState {
  writingToolsOpen: boolean;
  summarizeOpen: boolean;
  selectedText: string;
}

export const useElectronContextMenu = () => {
  const [state, setState] = useState<ElectronContextMenuState>({
    writingToolsOpen: false,
    summarizeOpen: false,
    selectedText: "",
  });

  const handleWritingTools = useCallback((event: CustomEvent<{ text: string }>) => {
    setState({
      writingToolsOpen: true,
      summarizeOpen: false,
      selectedText: event.detail.text,
    });
  }, []);

  const handleSummarize = useCallback((event: CustomEvent<{ text: string }>) => {
    setState({
      writingToolsOpen: false,
      summarizeOpen: true,
      selectedText: event.detail.text,
    });
  }, []);

  const closeWritingTools = useCallback(() => {
    setState(prev => ({ ...prev, writingToolsOpen: false }));
  }, []);

  const closeSummarize = useCallback(() => {
    setState(prev => ({ ...prev, summarizeOpen: false }));
  }, []);

  useEffect(() => {
    // Adiciona listeners para eventos do Electron
    window.addEventListener('electron-writing-tools', handleWritingTools as EventListener);
    window.addEventListener('electron-summarize', handleSummarize as EventListener);

    return () => {
      window.removeEventListener('electron-writing-tools', handleWritingTools as EventListener);
      window.removeEventListener('electron-summarize', handleSummarize as EventListener);
    };
  }, [handleWritingTools, handleSummarize]);

  return {
    ...state,
    closeWritingTools,
    closeSummarize,
  };
};
