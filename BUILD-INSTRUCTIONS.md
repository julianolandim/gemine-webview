# 🚀 Como Compilar o App Desktop Gemini AI

Este é um app desktop **Electron** que funciona em macOS, Windows e Linux.

## 📋 Pré-requisitos

### Para macOS:
- macOS 10.13 (High Sierra) ou superior
- Node.js 18+ e npm
- Xcode Command Line Tools: `xcode-select --install`

### Para Windows:
- Windows 10 ou superior
- Node.js 18+ e npm

### Para Linux:
- Node.js 18+ e npm
- Dependências: `sudo apt install -y libgtk-3-0 libnotify4 libnss3 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libgbm1 libxcb-dri3-0`

## 🔧 Instalação

1. **Clone/baixe o projeto do GitHub**
   ```bash
   git clone <seu-repositorio>
   cd <nome-do-projeto>
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

## 🏃 Executar em Modo Desenvolvimento

```bash
npm run electron:dev
```

Isso abrirá o app Gemini AI em uma janela desktop.

## 📦 Compilar para Distribuição

### macOS (gera .dmg e .zip):
```bash
npm run electron:build:mac
```

**Compatibilidade macOS:**
- ✅ macOS 10.13 High Sierra
- ✅ macOS 10.14 Mojave
- ✅ macOS 10.15 Catalina
- ✅ macOS 11 Big Sur
- ✅ macOS 12 Monterey
- ✅ macOS 13 Ventura
- ✅ macOS 14 Sonoma
- ✅ macOS 15 Sequoia

**Arquiteturas:**
- Intel (x64)
- Apple Silicon (arm64 - M1/M2/M3)

### Windows (gera instalador .exe):
```bash
npm run electron:build:win
```

### Linux (gera .AppImage e .deb):
```bash
npm run electron:build:linux
```

### Todas as plataformas:
```bash
npm run electron:build:all
```

## 📁 Localização dos Arquivos Compilados

Os apps compilados estarão em: `dist-electron/`

### macOS:
- `Gemini AI-{version}.dmg` - Instalador
- `Gemini AI-{version}-mac.zip` - Versão portable

### Windows:
- `Gemini AI Setup {version}.exe` - Instalador
- `Gemini AI {version}.exe` - Versão portable

### Linux:
- `Gemini-AI-{version}.AppImage` - Portable
- `gemini-ai_{version}_amd64.deb` - Pacote Debian

## 🎨 Recursos do App

✅ Janela nativa do macOS/Windows/Linux
✅ Ícone personalizado
✅ Menu nativo em português
✅ Atalhos de teclado padrão
✅ Zoom e tela cheia
✅ Suporte a Intel e Apple Silicon (macOS)
✅ Atualização automática (pode ser configurada)

## 🔐 Assinatura de Código (macOS)

Para distribuir fora da App Store, você precisará:

1. **Conta de desenvolvedor Apple** ($99/ano)
2. **Certificado de desenvolvedor**
3. **Notarização** (requerida desde macOS 10.15)

```bash
# Com certificado instalado:
export APPLE_ID="seu@email.com"
export APPLE_APP_PASSWORD="senha-app-especifica"
npm run electron:build:mac
```

## 📝 Notas

- O app carrega o Gemini diretamente do Google
- Requer conexão com internet
- Funcionalidades do Gemini (câmera, upload) funcionam normalmente
- Os dados ficam na conta Google do usuário

## 🆘 Problemas Comuns

### "electron não encontrado"
```bash
npm install
```

### "Permissão negada" (Linux)
```bash
chmod +x ./dist-electron/*.AppImage
```

### App não abre no macOS
```bash
xattr -cr "Gemini AI.app"
```

## 📚 Mais Informações

- [Documentação Electron](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build/)
