const { app, BrowserWindow, Menu, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, '../public/gemini-icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      // Permissões adicionais para sites modernos
      webSecurity: true,
      allowRunningInsecureContent: false
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#1a1625',
    show: false
  });

  // User-Agent do Chrome para evitar bloqueio
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  mainWindow.webContents.setUserAgent(userAgent);

  // Modificar headers para simular navegador normal
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent;
    callback({ requestHeaders: details.requestHeaders });
  });

  // Carrega a URL do Gemini diretamente
  mainWindow.loadURL('https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all');

  // Mostra a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Menu customizado
  const template = [
    {
      label: 'Gemini AI',
      submenu: [
        { label: 'Sobre Gemini AI', role: 'about' },
        { type: 'separator' },
        { label: 'Ocultar', role: 'hide' },
        { label: 'Ocultar Outros', role: 'hideOthers' },
        { label: 'Mostrar Todos', role: 'unhide' },
        { type: 'separator' },
        { label: 'Sair', role: 'quit' }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { label: 'Desfazer', role: 'undo' },
        { label: 'Refazer', role: 'redo' },
        { type: 'separator' },
        { label: 'Recortar', role: 'cut' },
        { label: 'Copiar', role: 'copy' },
        { label: 'Colar', role: 'paste' },
        { label: 'Selecionar Tudo', role: 'selectAll' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { label: 'Recarregar', role: 'reload' },
        { label: 'Forçar Recarga', role: 'forceReload' },
        { type: 'separator' },
        { label: 'Aumentar Zoom', role: 'zoomIn' },
        { label: 'Diminuir Zoom', role: 'zoomOut' },
        { label: 'Zoom Real', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Tela Cheia', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Janela',
      submenu: [
        { label: 'Minimizar', role: 'minimize' },
        { label: 'Aproximar', role: 'zoom' },
        { type: 'separator' },
        { label: 'Trazer Todas para Frente', role: 'front' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
