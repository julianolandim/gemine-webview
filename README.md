# 🚀 Gemini AI Desktop

Aplicativo desktop nativo do Google Gemini para **macOS, Windows e Linux**, construído com Electron.

## 📋 Sobre o Projeto

Este é um aplicativo desktop que traz a experiência completa do Google Gemini AI diretamente para o seu computador, sem precisar usar o navegador. O app roda nativamente no seu sistema operacional, oferecendo uma experiência mais integrada e conveniente.

### ✨ Características

- 🖥️ Interface nativa para macOS, Windows e Linux
- ⚡ Acesso rápido ao Gemini sem abrir o navegador
- 🎨 Experiência otimizada para desktop
- 📦 Instalador simples para cada plataforma

## 🛠️ Tecnologias Utilizadas

- **Electron** - Framework para aplicativos desktop multiplataforma
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18 ou superior ([Download](https://nodejs.org/))
- **npm** (vem junto com Node.js)

### Requisitos por Sistema Operacional

#### macOS
- macOS 10.13 (High Sierra) ou superior
- Suporta tanto Intel (x64) quanto Apple Silicon (arm64)

#### Windows
- Windows 7 ou superior
- Arquitetura 64-bit recomendada

#### Linux
- Qualquer distribuição moderna (Ubuntu, Fedora, Debian, etc.)
- Suporte para AppImage ou .deb

## 🚀 Instalação e Execução

### 1️⃣ Clone o Repositório

```bash
git clone <url-do-seu-repositorio>
cd <nome-da-pasta>
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

### 3️⃣ Execute o Aplicativo em Modo Desenvolvimento

```bash
npm run electron:dev
```

O aplicativo abrirá automaticamente em uma janela nativa do seu sistema operacional.

## 📦 Compilação (Build)

Para criar o instalador do aplicativo para distribuição:

### macOS

```bash
npm run electron:build:mac
```

Gera arquivos `.dmg` e `.zip` para instalação no macOS (Intel e Apple Silicon).

### Windows

```bash
npm run electron:build:win
```

Gera instalador `.exe` e versão portátil para Windows.

### Linux

```bash
npm run electron:build:linux
```

Gera `.AppImage` e `.deb` para distribuições Linux.

### Todas as Plataformas

```bash
npm run electron:build:all
```

Compila para macOS, Windows e Linux simultaneamente.

**📁 Os arquivos compilados estarão na pasta:** `dist-electron/`

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

## 🎯 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Executa apenas o frontend Vite |
| `npm run electron:dev` | Executa o app Electron em desenvolvimento |
| `npm run electron:build` | Compila para o sistema operacional atual |
| `npm run electron:build:mac` | Compila para macOS |
| `npm run electron:build:win` | Compila para Windows |
| `npm run electron:build:linux` | Compila para Linux |
| `npm run electron:build:all` | Compila para todos os sistemas |

## 🐛 Problemas Comuns

### O app não abre após compilar
- Verifique se todas as dependências foram instaladas: `npm install`
- Certifique-se de que está usando Node.js 18+

### Erro ao compilar para macOS
- No macOS, pode ser necessário dar permissões ao app nas configurações de Segurança

### Erro ao compilar para Windows
- Certifique-se de ter o Visual Studio Build Tools instalado

### Erro ao compilar para Linux
- Algumas distribuições podem precisar de dependências adicionais como `libgtk-3-0`

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
