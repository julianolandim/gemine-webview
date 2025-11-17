/// <reference types="vite/client" />

interface Window {
  electronAPI?: {
    openGemini: (url: string) => void;
    goBackToApp: () => void;
  };
}
