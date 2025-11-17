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
- Windows 7 ou superior
- Arquitetura 64-bit recomendada

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
**Gera:** `.dmg` e `.zip` na pasta `dist-electron/`

#### Windows (PCs)
```bash
npm run electron:build:win
```
**Gera:** `.exe` (instalador) e versão portátil na pasta `dist-electron/`

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
