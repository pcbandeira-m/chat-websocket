# Nem te conto... 👀 - Frontend Web

Frontend moderno e minimalista para um sistema de chat em tempo real com WebSocket.

## 📋 Índice

1. [Características](#características)
2. [Início Rápido](#início-rápido)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração e Personalização](#configuração-e-personalização)
5. [Comandos Disponíveis](#comandos-disponíveis)
6. [Integração com Backend](#integração-com-backend)
7. [Arquitetura Técnica](#arquitetura-técnica)
8. [Próximos Passos](#próximos-passos)

---

## ✨ Características

### 🎨 Design

- **Gradientes Vibrantes**: Combinação de índigo (#6366f1) e rosa (#ec4899)
- **Tema Escuro Minimalista**: Tons de cinza escuro para conforto visual
- **Responsivo**: Layout adaptável para todos os tamanhos de tela
- **Animações Suaves**: Transições e efeitos visuais refinados

### 💻 Tecnologia

- **TypeScript 5.1.6**: Tipagem completa e segura
- **Vite 4.4.9**: Build tool ultra-rápido com hot reload
- **Tailwind CSS 3.3.3**: Framework CSS utilitário
- **HTML5 Semântico**: Estrutura moderna e acessível

### 🎯 Funcionalidades

- ✅ Interface de chat funcional
- ✅ Uma única sala de bate-papo
- ✅ Identificação por nome, sem login
- ✅ Envio de mensagens com timestamp
- ✅ Scroll automático para novas mensagens
- ✅ Escape de HTML (proteção contra XSS)
- ✅ Client WebSocket pronto para integração

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Navegue até o diretório
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

**Resultado esperado:**

```
  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

Seu navegador abrirá automaticamente com a aplicação.

### Testando a Aplicação

1. Digite seu nome no campo **"Seu nome"**
2. Digite uma mensagem no campo de texto
3. Pressione **Enter** ou clique em **"Enviar"**
4. Você verá seu nome e a mensagem com um timestamp
5. Uma resposta simulada aparecerá automaticamente após ~800ms

O nome pode ser alterado a qualquer momento e vale para as próximas mensagens. Nome e mensagens são locais, não persistem ao recarregar e não são compartilhados entre usuários enquanto não houver integração com backend.

---

## 📁 Estrutura do Projeto

```
frontend/
├── 📄 Arquivos de Configuração
│   ├── package.json              # Dependências e scripts
│   ├── tsconfig.json             # Configuração TypeScript (strict)
│   ├── tsconfig.node.json        # Config TypeScript para Vite
│   ├── vite.config.ts            # Configuração do Vite
│   ├── tailwind.config.js        # Customização Tailwind
│   ├── postcss.config.js         # Processamento CSS
│   └── .gitignore                # Arquivos ignorados (Java/Maven/Gradle + Node)
│
├── 🌐 HTML
│   └── index.html                # Página principal (HTML5)
│
├── 📂 src/
│   ├── 📘 main.ts                # Lógica principal da aplicação
│   ├── 📋 types.ts               # Interfaces TypeScript
│   ├── 🛠️  utils.ts              # Funções utilitárias
│   ├── 🔌 websocket.ts           # Cliente WebSocket com reconnect
│   └── 🎨 styles.css             # Tailwind + estilos customizados
│
├── 📝 .env.example               # Exemplo de variáveis de ambiente
└── 📄 README.md                  # Esta documentação
```

### Descrição dos Arquivos

**index.html**: Template HTML5 com semântica moderna

- Header com logo e status de conexão
- Uma sala de chat com mensagens
- Input com suporte a Enter

**src/main.ts**: Aplicação principal

- Classe `ChatApp` com toda a lógica
- Event listeners para interações
- Renderização de mensagens

**src/types.ts**: Definições de tipos

```typescript
interface Message { ... }
interface Conversation { ... }
interface User { ... }
interface WebSocketMessage { ... }
```

**src/utils.ts**: Funções auxiliares

- `formatDate()` / `formatTime()` / `formatDateTime()`
- `escapeHtml()` - Proteção contra XSS
- `generateId()` - Geração de IDs únicos
- `debounce()` / `throttle()` - Controle de execução

**src/websocket.ts**: Cliente WebSocket

- Classe `ChatWebSocket` com suporte a reconnect
- Listeners customizados para eventos
- JSON serialization automática
- Reconexão automática (até 5 tentativas)

**src/styles.css**: Estilos

- Tailwind CSS directives (@tailwind)
- Scrollbar customizada
- Animações (slideIn, dots)
- Estilos para message bubbles

---

## 🎨 Configuração e Personalização

### Mudar Cores

**Arquivo**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',      // Mude a cor primária
      secondary: '#ec4899',    // Mude a cor secundária
      accent: '#f59e0b',       // Mude a cor de destaque
      dark: '#1f2937',         // Mude a cor de fundo
    },
  },
}
```

**Paleta de Cores Recomendadas:**

| Nome      | Cor Padrão       | Alternativas                            |
| --------- | ---------------- | --------------------------------------- |
| Primary   | #6366f1 (Índigo) | #3b82f6 (Azul), #8b5cf6 (Roxo)          |
| Secondary | #ec4899 (Rosa)   | #ef4444 (Vermelho), #f97316 (Laranja)   |
| Accent    | #f59e0b (Âmbar)  | #10b981 (Verde), #06b6d4 (Cyan)         |
| Dark      | #1f2937 (Cinza)  | #0f172a (Preto), #374151 (Cinza escuro) |

### Mudar Nome da Aplicação

**Arquivo**: `index.html` (linha ~24)

```html
<!-- Antes -->
<h1 class="text-2xl font-bold text-white">Nem te conto... 👀</h1>

<!-- Depois -->
<h1 class="text-2xl font-bold text-white">MyChat</h1>
```

### Configurar Variáveis de Ambiente

**Arquivo**: `.env` (copie de `.env.example`)

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3001
```

**Usar em código:**

```typescript
const wsUrl = import.meta.env.VITE_WS_URL;
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server com hot reload
npm run type-check      # Verifica erros de tipo TypeScript

# Produção
npm run build           # Cria build otimizado em dist/
npm run preview         # Visualiza build em modo produção
```

### Explicação dos Comandos

- **`npm run dev`**: Inicia o Vite em modo desenvolvimento
  - Hot reload automático ao salvar arquivos
  - Source maps para debug
  - Erros mostrados no navegador
  - Acessa em http://localhost:5173

- **`npm run build`**: Compila TypeScript + otimiza com Vite
  - Minificação com Terser
  - Build output em `dist/`
  - Pronto para produção

- **`npm run type-check`**: Verifica tipos sem compilar
  - Útil para CI/CD
  - Encontra erros de tipo antes do build

---

## 🔌 Integração com Backend

### Usando o Cliente WebSocket

O arquivo `src/websocket.ts` fornece uma classe pronta para usar:

```typescript
import { ChatWebSocket } from './websocket';

// Criar instância
const wsClient = new ChatWebSocket({
  url: 'ws://seu-servidor:3001',
  reconnectAttempts: 5,
  reconnectDelay: 3000,
});

// Conectar
await wsClient.connect();

// Escutar eventos
wsClient.on('message', (data) => {
  console.log('Nova mensagem:', data);
});

// Enviar dados
wsClient.send('message', {
  content: 'Olá!',
  sender: 'João',
});

// Desconectar
wsClient.disconnect();

// Verificar status
if (wsClient.isConnected()) {
  console.log('Conectado');
}
```

### Exemplo Completo de Integração

Modifique `src/main.ts` para integrar com seu backend:

```typescript
class ChatApp {
  private wsClient: ChatWebSocket | null = null;

  async initialize() {
    // Conectar ao WebSocket
    this.wsClient = new ChatWebSocket({
      url: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
    });

    await this.wsClient.connect();

    // Escutar mensagens do servidor
    this.wsClient.on('message', (data: any) => {
      this.handleIncomingMessage(data);
    });

    // Escutar status
    this.wsClient.on('status', (data: any) => {
      this.updateConnectionStatus(data);
    });
  }

  private sendMessage(): void {
    const content = this.messageInput.value.trim();
    if (!content || !this.wsClient) return;

    // Enviar para backend
    this.wsClient.send('message', {
      content,
      timestamp: new Date().toISOString(),
    });

    this.messageInput.value = '';
  }
}
```

### Protocolo WebSocket Esperado

**Formato das mensagens:**

```typescript
interface WebSocketMessage {
  type: 'message' | 'status' | 'error' | 'connection';
  payload: unknown;
  timestamp: string;
}
```

**Exemplo de envio:**

```json
{
  "type": "message",
  "payload": {
    "content": "Olá!",
    "sender": "João"
  },
  "timestamp": "2026-11-22T18:38:43.810Z"
}
```

**Exemplo de recebimento:**

```json
{
  "type": "message",
  "payload": {
    "id": "msg-123",
    "content": "Oi João!",
    "sender": "Maria"
  },
  "timestamp": "2026-11-22T18:38:50.000Z"
}
```

---

## 🏗️ Arquitetura Técnica

### Stack Técnico

| Camada    | Tecnologia | Versão |
| --------- | ---------- | ------ |
| Linguagem | TypeScript | 5.1.6  |
| Runtime   | Vite       | 4.4.9  |
| CSS       | Tailwind   | 3.3.3  |
| HTTP      | Axios      | 1.6.0  |
| Markup    | HTML5      | -      |

### Configuração TypeScript

**Modo Strict Ativado** (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "strict": true, // Verificação completa
    "noUnusedLocals": true, // Nenhuma variável não usada
    "noUnusedParameters": true, // Nenhum parâmetro não usado
    "noImplicitReturns": true, // Retorno explícito obrigatório
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true, // Gera .d.ts files
    "sourceMap": true // Source maps para debug
  }
}
```

### Componentes da UI

**Header**

- Logo com emoji 💬
- Nome da aplicação
- Indicador de status de conexão (verde = conectado)

**Chat Area**

- Container de mensagens com scroll automático
- Mensagens próprias (gradiente, alinhadas à direita)
- Mensagens de outros (cinzas, alinhadas à esquerda)
- Timestamps formatados

**Input Area**

- Campo de texto com foco destacado
- Botão de envio com gradient
- Suporte a Enter para enviar

### Paleta de Cores

```javascript
colors: {
  primary: '#6366f1',      // Índigo vibrante (botões, links)
  secondary: '#ec4899',    // Rosa quente (gradientes, destaques)
  accent: '#f59e0b',       // Âmbar (acentos)
  dark: '#1f2937'          // Cinza escuro (fundo)
}
```

### Responsividade

| Breakpoint | Largura        | Layout                        |
| ---------- | -------------- | ----------------------------- |
| Mobile     | < 768px        | Pronto para CSS media queries |
| Tablet     | 768px - 1920px | Ajustes de padding            |
| Desktop    | 1920px+        | Sala de chat centralizada     |

### Segurança Implementada

- ✅ **HTML Escaping**: Previne XSS attacks
- ✅ **TypeScript Strict**: Validação de tipos em compilação
- ✅ **Sem Inline Scripts**: Nenhum javascript malicioso
- ✅ **Sem Hard-coded Secrets**: Variáveis de ambiente
- ✅ **HTTPS Ready**: Pronto para produção

---

## 🤝 Próximos Passos

### Fase 1: Setup (Imediato)

```bash
cd frontend
npm install
npm run dev
```

### Fase 2: Personalização (1-2 horas)

1. Mudar cores em `tailwind.config.js`
2. Mudar nome em `index.html`
3. Configurar `.env` com URLs do seu backend
4. Testar interface no navegador

### Fase 3: Integração Backend (2-4 horas)

1. Implementar servidor WebSocket (Node/Express, Java/Spring, etc.)
2. Integrar `ChatWebSocket` em `src/main.ts`
3. Implementar autenticação
4. Testar fluxo completo

### Fase 4: Funcionalidades Adicionais (4+ horas)

- [ ] Upload de arquivos/imagens
- [ ] Typing indicators ("João está digitando...")
- [ ] Reações com emojis
- [ ] Busca de mensagens
- [ ] Notificações push
- [ ] Dark/Light mode toggle
- [ ] Perfis de usuário

---

## 📚 Dependências

### Production

- **axios** (1.6.0+): HTTP client para requisições

### Development

- **typescript** (5.1.6+): Linguagem compilada
- **vite** (4.4.9+): Build tool moderno
- **tailwindcss** (3.3.3+): Framework CSS
- **postcss** (8.4.24+): Processador CSS
- **autoprefixer** (10.4.14+): Adiciona prefixos de browser
- **@types/node** (20.0.0+): Tipos para Node.js

---

## 🔐 Segurança

Este projeto implementa as seguintes práticas de segurança:

1. **XSS Prevention**: HTML escapado em mensagens

   ```typescript
   const escaped = escapeHtml(userInput);
   ```

2. **Type Safety**: TypeScript strict mode

   ```typescript
   // ❌ Erro detectado em compile time
   const msg: Message = { id: 123 }

   // ✅ Correto
   const msg: Message = { id: 'msg-1', ... }
   ```

3. **Environment Variables**: Secrets em `.env`

   ```typescript
   const url = import.meta.env.VITE_WS_URL;
   ```

4. **No Inline Scripts**: HTML sem JavaScript malicioso

5. **HTTPS Ready**: Pronto para HTTPS/WSS em produção

---

## 💡 Dicas de Desenvolvimento

### Hot Reload

- Mudanças em arquivos TypeScript são recarregadas automaticamente
- Nenhuma necessidade de refresh manual
- Estado da aplicação é preservado (quando possível)

### Type Checking

```bash
# Verificar erros de tipo sem compilar
npm run type-check

# Leia as mensagens de erro com atenção
```

### DevTools

- Pressione **F12** para abrir DevTools
- Veja logs, erros, e requisições
- Use **Inspector** para inspecionar elementos
- Use **Network** para ver WebSocket em ação

### Debug Mode

- Source maps ativados por padrão
- Clique nos stack traces para ir para o código original
- Use `debugger;` em TypeScript para breakpoints

---

## 🎓 Conceitos Demonstrados

Este projeto demonstra:

- ✅ **TypeScript Avançado**: Interfaces, classes, tipos genéricos
- ✅ **Tailwind CSS**: Estilização com utilidades
- ✅ **Vite**: Build tool moderno
- ✅ **WebSocket**: Comunicação em tempo real
- ✅ **DOM Manipulation**: Renderização segura
- ✅ **Event Listeners**: Padrão Observer
- ✅ **CSS Animations**: Transições suaves
- ✅ **Responsive Design**: Layouts adaptáveis

---

## 📞 Troubleshooting

### Porta 5173 já em uso?

```bash
npm run dev -- --port 3000
# Acesse em http://localhost:3000
```

### Vite não está recargando?

1. Verifique se o arquivo foi salvo
2. Feche e abra o navegador
3. Limpe o cache (Ctrl+Shift+Delete)
4. Reinicie o dev server

### Tailwind não está aplicando estilos?

1. Certifique-se que a classe está em `tailwind.config.js` → `content`
2. Reinicie o dev server
3. Compile com `npm run build`

### Erro de tipos TypeScript?

```bash
npm run type-check
# Leia as mensagens de erro com atenção
```

---

## 📄 Licença

MIT - Livre para uso comercial e pessoal

---

## 📞 Suporte

Para dúvidas:

1. Consulte o código comentado
2. Verifique `src/websocket.ts` para exemplos de uso
3. Leia `src/types.ts` para interfaces disponíveis
4. Analise `index.html` para estrutura HTML

---

**Criado com ❤️ usando TypeScript, Tailwind CSS e Vite**

Última atualização: 2026-11-22
