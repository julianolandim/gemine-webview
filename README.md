# 🚀 Gemini AI - Desktop & Mobile

Aplicativo multiplataforma do Google Gemini para **Desktop (macOS, Windows, Linux)** e **Mobile (Android, iOS)**.

## 📋 Sobre o Projeto

Este aplicativo traz a experiência completa do Google Gemini AI para todos os seus dispositivos:
- **Desktop**: Aplicativo nativo construído com Electron
- **Mobile**: Aplicativo nativo construído com Capacitor

### ✨ Características

- 🖥️ **Desktop**: Interface nativa para macOS, Windows e Linux
- 📱 **Mobile**: Aplicativo nativo para Android e iOS
- ⚡ Acesso rápido ao Gemini em qualquer dispositivo
- 🎨 Experiência otimizada para cada plataforma

## 🛠️ Tecnologias Utilizadas

- **Electron** - Framework para aplicativos desktop
- **Capacitor** - Framework para aplicativos mobile nativos
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI

## 📦 Pré-requisitos

### Requisitos Gerais
- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **npm** (vem junto com Node.js)

### Requisitos para Desktop (Electron)

#### macOS
- macOS 10.13 (High Sierra) ou superior
- Suporta Intel (x64) e Apple Silicon (arm64)

#### Windows
- Windows 7 SP1 ou superior
- Suporta arquiteturas x64 (64-bit) e x86 (32-bit)

#### Linux
- Qualquer distribuição moderna (Ubuntu, Fedora, Debian, etc.)

### Requisitos para Mobile (Capacitor)

#### Android
- **Android Studio** instalado
- SDK do Android configurado

#### iOS
- **macOS** com **Xcode** instalado
- Conta Apple Developer (para distribuição)

## 🚀 Instalação

### 1️⃣ Clone o Repositório

```bash
git clone <url-do-seu-repositorio>
cd <nome-da-pasta>
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

---

## 🔧 Troubleshooting

### Página 404 ou Tela Preta ao Abrir o App (macOS/Windows/Linux)
Se o app mostrar erro 404 ou tela preta:
1. **Certifique-se de reconstruir o app completamente:**
   ```bash
   npm run build
   npm run electron:build:mac
   ```
2. **Não execute o app diretamente da pasta `dist-electron/mac-arm64/`**
3. Use o arquivo `.dmg` gerado (ex: `Gemini AI-1.0.0-arm64.dmg`) 
4. Abra o DMG e arraste o app para a pasta Aplicativos
5. Execute a partir da pasta Aplicativos

**Nota:** O app usa HashRouter para compatibilidade com Electron (protocolo `file://`)

### DMG Não Foi Gerado (macOS)
Se apenas a pasta `mac-arm64` foi criada mas o DMG não:
1. Verifique se o build terminou sem erros no terminal
2. Procure por arquivos `.dmg` na pasta `dist-electron/`
3. Execute novamente: `npm run electron:build:mac`
4. Aguarde o processo completar - pode demorar alguns minutos

### Problemas de Permissão (macOS)
Se o macOS bloquear o app ao tentar abrir:
1. Vá em **Preferências do Sistema > Privacidade e Segurança**
2. Clique em **"Abrir Assim Mesmo"**
3. Ou execute no terminal: `xattr -cr "/Applications/Gemini AI.app"`

### App Não Abre no Android/iOS
- Verifique se executou `npm run cap:sync` após alterações
- Certifique-se que o Android Studio ou Xcode está instalado
- Tente reconstruir o app nativo

---

## 🖥️ DESKTOP - Comandos Electron

### Desenvolvimento

Execute o aplicativo desktop em modo desenvolvimento:

```bash
npm run electron:dev
```

### Compilação para Distribuição

#### macOS (computadores Apple)
```bash
npm run electron:build:mac
```
**Gera:** 
- `.dmg` (instalador com interface "arrastar para Aplicativos") - **Localização:** `dist-electron/Gemini AI-[versão]-arm64.dmg`
- `.zip` (versão compactada do app)
- Arquivos salvos em `dist-electron/`

> 💡 **Dica:** O instalador DMG abre uma janela onde você arrasta o ícone do app para a pasta Aplicativos - experiência nativa do macOS!

> ⚠️ **Importante:** Não execute o app diretamente da pasta `dist-electron/mac-arm64/`. Use o arquivo `.dmg` gerado para instalação!

#### Windows (PCs)
```bash
npm run electron:build:win
```
**Gera:** 
- Instaladores NSIS (`.exe`) para x64 e ia32
- Versões portáteis para x64 e ia32
- Arquivos salvos em `dist-electron/`

> 💡 **Compatibilidade:** Gera instaladores para sistemas 64-bit (x64) e 32-bit (ia32), garantindo máxima compatibilidade

#### Linux
```bash
npm run electron:build:linux
```
**Gera:** `.AppImage` e `.deb` na pasta `dist-electron/`

#### Todas as Plataformas Desktop
```bash
npm run electron:build:all
```
**Gera:** Instaladores para macOS + Windows + Linux simultaneamente

---

## 📱 MOBILE - Comandos Capacitor

### Configuração Inicial (executar 1 vez)

Inicialize o projeto Capacitor:
```bash
npm run cap:init
```

Adicione a plataforma desejada:
```bash
npm run cap:add:android    # Para Android
npm run cap:add:ios        # Para iOS
```

### Sincronizar Código

Após fazer mudanças no código, sincronize com as plataformas nativas:
```bash
npm run cap:sync
```

### Executar no Dispositivo/Emulador

#### Android
```bash
npm run cap:run:android
```
**Requer:** Android Studio instalado

#### iOS
```bash
npm run cap:run:ios
```
**Requer:** macOS com Xcode instalado

### Abrir nos IDEs Nativos

Para desenvolvimento avançado, abra o projeto nos IDEs nativos:

```bash
npm run cap:open:android   # Abre no Android Studio
npm run cap:open:ios       # Abre no Xcode
```

---

## 📊 Resumo Rápido por Plataforma

| Plataforma | Comando Principal |
|------------|-------------------|
| **macOS** | `npm run electron:build:mac` |
| **Windows** | `npm run electron:build:win` |
| **Linux** | `npm run electron:build:linux` |
| **Android** | `npm run cap:run:android` |
| **iOS** | `npm run cap:run:ios` |


## 📂 Estrutura do Projeto

```
├── electron/              # Código do processo principal do Electron
│   ├── main.js           # Arquivo principal do Electron
│   └── preload.js        # Script de preload para segurança
├── src/                   # Código-fonte React
├── public/                # Arquivos públicos (ícones, etc)
├── scripts/               # Scripts auxiliares
├── electron-builder.json  # Configuração do electron-builder
└── package.json          # Dependências e scripts
```

## 🎯 Todos os Scripts Disponíveis

### Desenvolvimento
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Executa apenas o frontend Vite |
| `npm run electron:dev` | Executa o app desktop Electron |

### Build Desktop (Electron)
| Comando | Descrição |
|---------|-----------|
| `npm run electron:build:mac` | Compila para macOS |
| `npm run electron:build:win` | Compila para Windows |
| `npm run electron:build:linux` | Compila para Linux |
| `npm run electron:build:all` | Compila para todas as plataformas desktop |

### Mobile (Capacitor)
| Comando | Descrição |
|---------|-----------|
| `npm run cap:init` | Inicializa o Capacitor (executar 1 vez) |
| `npm run cap:add:android` | Adiciona plataforma Android |
| `npm run cap:add:ios` | Adiciona plataforma iOS |
| `npm run cap:sync` | Sincroniza código com plataformas nativas |
| `npm run cap:run:android` | Executa no Android |
| `npm run cap:run:ios` | Executa no iOS |
| `npm run cap:open:android` | Abre projeto no Android Studio |
| `npm run cap:open:ios` | Abre projeto no Xcode |

## 🐛 Problemas Comuns

### Desktop (Electron)

**O app não abre após compilar**
- Verifique se todas as dependências foram instaladas: `npm install`
- Certifique-se de que está usando Node.js 18+

**Erro ao compilar para macOS**
- Pode ser necessário dar permissões ao app nas configurações de Segurança

**Erro ao compilar para Windows**
- Certifique-se de ter o Visual Studio Build Tools instalado

**Erro ao compilar para Linux**
- Algumas distribuições precisam de dependências adicionais como `libgtk-3-0`

### Mobile (Capacitor)

**Erro ao executar no Android**
- Verifique se o Android Studio está instalado corretamente
- Certifique-se de que o SDK do Android está configurado
- Execute `npm run cap:sync` antes de tentar novamente

**Erro ao executar no iOS**
- Apenas funciona em macOS com Xcode instalado
- Verifique se o Xcode Command Line Tools está instalado: `xcode-select --install`
- Execute `npm run cap:sync` antes de tentar novamente

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📧 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Electron e React**
