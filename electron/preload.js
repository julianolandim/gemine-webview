const { shell } = require('electron');

window.electronAPI = {
  openExternal: (url) => {
    shell.openExternal(url);
  }
};
