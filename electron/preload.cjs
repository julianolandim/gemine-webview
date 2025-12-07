const { contextBridge, ipcRenderer } = require('electron');

// Expor API segura para o renderer
contextBridge.exposeInMainWorld('electronAPI', {
  openGemini: (url) => {
    ipcRenderer.send('open-gemini', url);
  },
  goBackToApp: () => {
    ipcRenderer.send('go-back-to-app');
  }
});

// Verificar suporte a speechSynthesis após DOM carregar
// Usando ipcRenderer diretamente pois estamos no contexto do preload
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se speechSynthesis existe no contexto isolado
  try {
    const hasSpeechSupport = typeof speechSynthesis !== 'undefined';
    ipcRenderer.send('speech-support-check', hasSpeechSupport);
  } catch (e) {
    ipcRenderer.send('speech-support-check', false);
  }
});

// Handlers para funcionalidades de texto - executados no contexto do preload
ipcRenderer.on('speak-text', (event, text) => {
  try {
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
      
      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        
        // Procura uma voz em pt-BR (português brasileiro) disponível no sistema
        const ptBRVoice = voices.find(v => v.lang === 'pt-BR') || 
                          voices.find(v => v.lang.startsWith('pt')) ||
                          voices.find(v => v.default);
        
        if (ptBRVoice) {
          utterance.voice = ptBRVoice;
          utterance.lang = ptBRVoice.lang;
        }
        
        speechSynthesis.speak(utterance);
      };
      
      // Vozes podem carregar de forma assíncrona
      if (speechSynthesis.getVoices().length > 0) {
        speak();
      } else {
        speechSynthesis.onvoiceschanged = speak;
      }
    }
  } catch (e) {
    console.error('Speech synthesis error:', e);
  }
});

ipcRenderer.on('stop-speaking', () => {
  try {
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
  } catch (e) {
    console.error('Stop speaking error:', e);
  }
});

ipcRenderer.on('show-writing-tools', (event, text) => {
  // Dispara evento customizado - precisa usar window do contexto isolado
  window.dispatchEvent(new CustomEvent('electron-writing-tools', { detail: { text } }));
});

ipcRenderer.on('summarize-text', (event, text) => {
  // Dispara evento customizado
  window.dispatchEvent(new CustomEvent('electron-summarize', { detail: { text } }));
});