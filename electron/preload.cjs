const { ipcRenderer } = require('electron');

window.electronAPI = {
  openGemini: (url) => {
    ipcRenderer.send('open-gemini', url);
  },
  goBackToApp: () => {
    ipcRenderer.send('go-back-to-app');
  }
};

// Verificar suporte a speechSynthesis e notificar main process
window.addEventListener('DOMContentLoaded', () => {
  const hasSpeechSupport = 'speechSynthesis' in window;
  ipcRenderer.send('speech-support-check', hasSpeechSupport);
});

// Handlers para funcionalidades de texto
ipcRenderer.on('speak-text', (event, text) => {
  if ('speechSynthesis' in window) {
    // Parar qualquer fala em andamento
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  }
});

ipcRenderer.on('stop-speaking', () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
});

ipcRenderer.on('show-writing-tools', (event, text) => {
  // Dispara evento customizado para o React capturar
  window.dispatchEvent(new CustomEvent('electron-writing-tools', { detail: { text } }));
});

ipcRenderer.on('summarize-text', (event, text) => {
  // Dispara evento customizado para o React capturar
  window.dispatchEvent(new CustomEvent('electron-summarize', { detail: { text } }));
});
