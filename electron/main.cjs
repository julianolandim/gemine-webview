const { app, BrowserWindow, Menu, shell, ipcMain, clipboard } = require('electron');
const path = require('path');

// Flag para verificar suporte a speechSynthesis
let hasSpeechSupport = true;

// Handler para receber informação de suporte a speech
ipcMain.on('speech-support-check', (event, supported) => {
  hasSpeechSupport = supported;
});

// Menu de contexto (clique direito)
function createContextMenu(window) {
  window.webContents.on('context-menu', (event, params) => {
    const menuTemplate = [];

    // Opções de texto selecionado
    if (params.selectionText) {
      menuTemplate.push(
        { label: 'Copiar', role: 'copy' },
        { label: 'Recortar', role: 'cut', enabled: params.isEditable }
      );

      // Adiciona separador antes das novas opções
      menuTemplate.push({ type: 'separator' });

      // Submenu Voz (apenas se o sistema suportar)
      if (hasSpeechSupport) {
        menuTemplate.push({
          label: 'Voz',
          submenu: [
            {
              label: 'Começar a falar',
              click: () => {
                window.webContents.send('speak-text', params.selectionText);
              }
            },
            {
              label: 'Parar de falar',
              click: () => {
                window.webContents.send('stop-speaking');
              }
            }
          ]
        });
      }

      // Separador antes de ferramentas
      menuTemplate.push({ type: 'separator' });

      // Mostrar Ferramentas de Escrita
      menuTemplate.push({
        label: 'Mostrar Ferramentas de Escrita',
        click: () => {
          window.webContents.send('show-writing-tools', params.selectionText);
        }
      });

      // Resumir
      menuTemplate.push({
        label: 'Resumir',
        click: () => {
          window.webContents.send('summarize-text', params.selectionText);
        }
      });
    }

    // Opções para campos editáveis (sem texto selecionado)
    if (params.isEditable && !params.selectionText) {
      menuTemplate.push(
        { label: 'Colar', role: 'paste' },
        { label: 'Selecionar Tudo', role: 'selectAll' }
      );
    }

    // Opções para links
    if (params.linkURL) {
      if (menuTemplate.length > 0) {
        menuTemplate.push({ type: 'separator' });
      }
      menuTemplate.push(
        {
          label: 'Copiar Link',
          click: () => clipboard.writeText(params.linkURL)
        },
        {
          label: 'Abrir Link no Navegador',
          click: () => shell.openExternal(params.linkURL)
        }
      );
    }

    // Opções para imagens
    if (params.mediaType === 'image') {
      if (menuTemplate.length > 0) {
        menuTemplate.push({ type: 'separator' });
      }
      menuTemplate.push(
        {
          label: 'Copiar Imagem',
          click: () => {
            window.webContents.copyImageAt(params.x, params.y);
          }
        },
        {
          label: 'Copiar Endereço da Imagem',
          click: () => clipboard.writeText(params.srcURL)
        }
      );
    }

    // Se não há opções específicas, mostra menu básico
    if (menuTemplate.length === 0) {
      menuTemplate.push(
        { label: 'Voltar', click: () => window.webContents.goBack(), enabled: window.webContents.canGoBack() },
        { label: 'Avançar', click: () => window.webContents.goForward(), enabled: window.webContents.canGoForward() },
        { type: 'separator' },
        { label: 'Recarregar', role: 'reload' }
      );
    }

    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    contextMenu.popup({ window });
  });
}

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
      preload: path.join(__dirname, 'preload.cjs')
    },
    backgroundColor: '#1a1625',
    show: false
  });

  // Carrega o app React (interface do launcher)
  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    // Em produção, usa o caminho correto dentro do app empacotado
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('Loading from:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  // Mostra a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Ativa o menu de contexto (clique direito)
  createContextMenu(mainWindow);

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

// Handler para abrir Gemini dentro da janela
ipcMain.on('open-gemini', (event, url) => {
  if (mainWindow) {
    mainWindow.loadURL(url);
  }
});

// Handler para voltar ao app
ipcMain.on('go-back-to-app', () => {
  if (mainWindow) {
    const isDev = !app.isPackaged;
    if (isDev) {
      mainWindow.loadURL('http://localhost:8080');
    } else {
      const indexPath = path.join(__dirname, '../dist/index.html');
      mainWindow.loadFile(indexPath);
    }
  }
});

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