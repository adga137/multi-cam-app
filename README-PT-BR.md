[README em Inglês](https://github.com/adga137/multi-cam-app/blob/main/README.md) , [README em Espanhol](https://github.com/adga137/multi-cam-app/blob/main/README-ES.md) ,  [README em Português](https://github.com/adga137/multi-cam-app/blob/main/README-PT-BR.md)

# 📷 Aplicativo de Câmeras (Multi-Cam Desktop)

Um aplicativo de desktop multiplataforma, criado com **Electron**, que permite gerenciar múltiplas webcams em janelas independentes — sem bordas do sistema operacional. Inclui controles de zoom, recorte, movimentação (pan) e ativação de flash (*torch*), caso o hardware ofereça suporte. Conta com suporte a múltiplos idiomas e uma interface limpa e otimizada.

![Captura de tela](img/screenshot_app.png)

---

## 🤝 Créditos e Desenvolvimento

Este projeto é o resultado de uma colaboração entre inteligência artificial e desenvolvimento humano:

- **Desenvolvimento Principal e Arquitetura**: Desenvolvido pelo **Qwen3.7** (modelo de IA da Alibaba Cloud).
- **Co-desenvolvedor e Ajustes Finos**: Alejandro García (GitHub: **adga137**) — responsável pela supervisão, ajustes finos de UI/UX, testes de hardware e otimização visual.

---

## ⚖️ Licença

Este software está protegido pela **Licença Pública Geral GNU v3.0 (GPLv3)**.
Isso significa que você tem liberdade para usar, modificar e distribuir o software, desde que qualquer trabalho derivado seja distribuído sob a mesma licença e o código permaneça aberto. Consulte o arquivo `LICENSE` para mais detalhes ou acesse: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

---

## ☕ Apoie o Desenvolvimento

Se este aplicativo for útil para você e você desejar apoiar sua manutenção, a correção de erros e o desenvolvimento de novas funcionalidades no futuro, pode fazer uma doação por meio dos seguintes canais:

- **Binance ID**: `[60122342]`
- **Bitcoin (BTC)**: `[1PFp17P2fHH1kwywHsuR84XDU9jZfXR6gU]`
- **Litecoin (LTC)**: `[LRqgbivRfHTqk3S2iU5QKN5Hsfnqufzikj]`

*Qualquer contribuição, por menor que seja, é profundamente apreciada e destinada diretamente à melhoria contínua do projeto.*

---

## 🚀 Principais Funcionalidades

- 🪟 **Janelas Independentes**: Cada câmera é aberta em uma janela nativa do sistema operacional, sem barra de título (`frame: false`).
- 💡 **Suporte a Flash/Lanterna (Torch)**: Botão dedicado para ativar a luz da câmera (ocultado automaticamente caso o hardware não ofereça suporte).
- 🔍 **Controles de Imagem**: Zoom digital, recorte (*crop*) e movimentação da imagem (*pan*) em tempo real.
- 🌍 **Multi-idioma**: Suporte nativo para espanhol, inglês e português (facilmente expansível), com persistência da preferência do usuário.
- 🖥️ **Multiplataforma**: Compilável para Windows, macOS e Linux.

---

## 🛠️ Requisitos de Software e Código

Para compilar e executar este projeto, você precisa ter instalado em seu sistema:

1. **Node.js**: Versão LTS (recomendada: v20.x ou superior). [Baixe aqui](https://nodejs.org/)
2. **npm**: Incluído junto com o Node.js.
3. **Git**: Para clonar o repositório.
4. **Dependências de compilação por sistema operacional**:
- **Windows**: Python 3.x e "Visual Studio Build Tools" (com a carga de trabalho/workload de C++). 
- **macOS**: Xcode e as ferramentas de linha de comando do Xcode (`xcode-select --install`). 
- **Linux**: `build-essential`, `fakeroot`, `dpkg`, `rpm` (dependendo se você está compilando um pacote `.deb` ou `.rpm`). No Ubuntu/Debian: `sudo apt install build-essential fakeroot dpkg`. ---

## 📦 Instalação e Configuração

1. Clone este repositório em sua máquina local:
```bash
git clone https://github.com/SEU_USUARIO/camaras-app.git
cd camaras-app
```

2. Instale as dependências do projeto:

```bash
npm install
```
3. (Opcional, mas recomendado): Coloque um ícone personalizado de 512x512 pixels, em formato PNG, dentro da pasta `assets/` com o nome `icon.png`.

---

## 💻 Execução em Modo de Desenvolvimento

Para testar o aplicativo em tempo real com as ferramentas de desenvolvimento (DevTools) habilitadas:

```bash
npm run dev
```

Ou simplesmente use `npm start` para executá-lo sem as ferramentas de desenvolvimento.

---

## 🏗️ Compilação e Distribuição (Build)

O projeto utiliza o `electron-builder` para empacotar o aplicativo em instaladores nativos. Certifique-se de executar estes comandos no sistema operacional para o qual deseja compilar (por exemplo, compilar para macOS exige que você esteja em um Mac).

---

### Compilar para todas as plataformas (se estiver no macOS)

```bash
npm run build:all
```

### Compilar apenas para Windows (.exe / NSIS)

```bash
npm run build:win
```

O instalador será gerado na pasta `dist/`.

### Compilar apenas para macOS (.dmg)

```bash
npm run build:mac
```

**Nota:** Para distribuir publicamente no macOS, será necessário configurar certificados da Apple e a "notarização" (notarization) no arquivo `package.json`. Compilar apenas para Linux (.AppImage e .deb)

---

## 📂 Estrutura do Projeto

```text
camaras-app/
├── assets/                 # Ícones e recursos estáticos
├── .github/                # Workflows do GitHub Actions (CI/CD)
├── main.js                 # Processo principal do Electron
├── preload.js              # Ponte segura entre o backend e o frontend
├── index.html              # Interface da janela principal
├── camera-window.html      # Interface das janelas de câmera
├── renderer.js             # Lógica da janela principal
├── camera-renderer.js      # Lógica das janelas de câmera (WebRTC, controles)
├── i18n.js                 # Sistema de tradução e localização
├── styles.css              # Folha de estilos global
└── package.json            # Configuração do projeto e do electron-builder
```

---

## ⚠️ Notas Importantes

- Permissões de Câmera: Na primeira vez que você executar o aplicativo, o sistema operacional (especialmente o macOS e o Windows 11) solicitará permissão para acessar a câmera. Você deve concedê-la.
- Wayland no Linux: Se você utiliza uma distribuição Linux com Wayland, certifique-se de que as variáveis ​​de ambiente do PipeWire estejam habilitadas para a captura via WebRTC (isso já está incluído nas flags no `main.js`).
- Flash/Torch: A função de flash só aparecerá se a API do navegador detectar a capacidade "torch" (lanterna) na trilha de vídeo da câmera.

---

## 📬 Contato e Contribuições

Contribuições, relatos de bugs e sugestões de novas funcionalidades são bem-vindos. Por favor, abra uma *Issue* ou um *Pull Request* neste repositório.
Obrigado por usar o Cámaras App!
