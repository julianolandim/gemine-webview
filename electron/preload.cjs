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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
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