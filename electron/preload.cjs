const { ipcRenderer } = require('electron');

window.electronAPI = {
  openGemini: (url) => {
    ipcRenderer.send('open-gemini', url);
  },
  goBackToApp: () => {
    ipcRenderer.send('go-back-to-app');
  }
};