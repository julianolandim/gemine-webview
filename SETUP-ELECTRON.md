# ⚙️ Configuração Final - Scripts do Electron

Como o Lovable não permite editar o `package.json` diretamente, você precisará adicionar os scripts do Electron manualmente após exportar o projeto para o GitHub.

## 📝 Passo a Passo

### 1. Exporte para o GitHub
Clique no botão "Export to Github" no topo do Lovable

### 2. Clone o projeto
```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

### 3. Edite o package.json

Abra o arquivo `package.json` e adicione os seguintes scripts na seção `"scripts"`:

```json
"scripts": {
  // ... scripts existentes ...
  "electron:dev": "node scripts/electron-dev.js",
  "electron:build": "electron-builder",
  "electron:build:mac": "electron-builder --mac",
  "electron:build:win": "electron-builder --win",
  "electron:build:linux": "electron-builder --linux",
  "electron:build:all": "electron-builder --mac --win --linux"
}
```

**E adicione também** (no final do arquivo, antes do último `}`):

```json
"main": "electron/main.js"
```

### 4. Instale as dependências
```bash
npm install
```

### 5. Execute o app!
```bash
npm run electron:dev
```

## 🎯 Exemplo Completo do package.json

O seu `package.json` deve ficar assim:

```json
{
  "name": "gemini-ai-desktop",
  "version": "1.0.0",
  "description": "Gemini AI Desktop App for macOS, Windows and Linux",
  "main": "electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "electron:dev": "node scripts/electron-dev.js",
    "electron:build": "electron-builder",
    "electron:build:mac": "electron-builder --mac",
    "electron:build:win": "electron-builder --win",
    "electron:build:linux": "electron-builder --linux",
    "electron:build:all": "electron-builder --mac --win --linux"
  }
  // ... resto do arquivo
}
```

## ✅ Pronto!

Após esses passos, siga as instruções no arquivo `BUILD-INSTRUCTIONS.md` para compilar o app.
