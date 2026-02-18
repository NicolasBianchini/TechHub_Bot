# 🤖 TechHub Discord Bot

Bot profissional para o servidor TechHub com sistema escalável de comandos e interações.

## 📁 Estrutura do Projeto

```
bot-disc/
├── commands/              # Slash commands do Discord
│   ├── iso.js            # Comando /iso
│   ├── otimizacao.js     # Comando /otimizacao
│   └── extensoes.js      # Comando /extensoes
│
├── interactions/          # Handlers de interações (botões, menus)
│   ├── index.js          # Sistema de carregamento automático
│   ├── iso.js            # Handlers para /iso
│   ├── otimizacao.js     # Handlers para /otimizacao
│   └── extensoes.js      # Handlers para /extensoes
│
├── data/                  # Dados e configurações
│   ├── extensions.js     # Base de extensões do Chrome
│   ├── message.json      # Controle de mensagens persistentes
│   └── autounattend/     # Arquivos do autounattend.xml
│
├── scripts/               # Scripts PowerShell de otimização
│   ├── basico.ps1
│   ├── intermediario.ps1
│   └── avancado.ps1
│
├── utils/                 # Utilitários e constantes
│   └── constants.js      # Constantes globais
│
├── .env                   # Variáveis de ambiente
├── index.js              # Arquivo principal do bot
├── deploy-commands.js    # Deploy de comandos na API do Discord
└── package.json          # Dependências do projeto
```

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd bot-disc
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   TOKEN=seu_token_do_bot
   CLIENT_ID=id_da_aplicacao
   ```

4. **Registre os comandos**
   ```bash
   node deploy-commands.js
   ```

5. **Inicie o bot**
   ```bash
   npm start
   # ou
   node index.js
   ```

## 📋 Comandos Disponíveis

### `/iso`
Fornece links oficiais para ISOs do Windows 10 e 11, além de arquivo de instalação automática.

**Recursos:**
- Links oficiais da Microsoft
- Download do autounattend.xml (instalação automática)
- Instruções de uso completas

### `/otimizacao`
Scripts de otimização do Windows em três níveis.

**Níveis:**
- 🟢 **Básico**: Seguro para iniciantes
- 🟡 **Intermediário**: Tweaks moderados
- 🔴 **Avançado**: Modificações profundas

### `/extensoes`
Extensões recomendadas para Chrome, organizadas por categorias.

**Categorias:**
- 🛡️ **Segurança & Privacidade**: uBlock Origin, Privacy Badger, etc.
- ⚡ **Produtividade**: Vimium, OneTab, Dark Reader, etc.
- 👨‍💻 **Desenvolvedor**: React DevTools, Vue DevTools, etc.
- 🔧 **Ferramentas**: Grammarly, Google Translate, etc.

## 🏗️ Arquitetura

### Sistema de Comandos
- **Carregamento automático**: Todos os arquivos `.js` em `/commands` são carregados automaticamente
- **Estrutura padronizada**: Cada comando exporta `data` (SlashCommandBuilder) e `execute()`

### Sistema de Interações
- **Handlers separados**: Cada categoria de interação tem seu próprio arquivo
- **Roteamento inteligente**: O InteractionManager roteia automaticamente para o handler correto
- **Escalável**: Adicione novos handlers sem modificar o código principal

### Separação de Responsabilidades
- **Commands**: Definem e executam comandos slash
- **Interactions**: Processam interações de botões/menus
- **Data**: Armazenam dados estáticos e configurações
- **Utils**: Funções utilitárias e constantes compartilhadas

## 🔧 Desenvolvimento

### Adicionar um Novo Comando

1. Crie `commands/meu-comando.js`:
   ```javascript
   const { SlashCommandBuilder } = require('discord.js');

   module.exports = {
       data: new SlashCommandBuilder()
           .setName('meu-comando')
           .setDescription('Descrição do comando'),

       async execute(interaction) {
           await interaction.reply('Olá!');
       }
   };
   ```

2. Execute `node deploy-commands.js`
3. Reinicie o bot

### Adicionar um Novo Handler de Interação

1. Crie `interactions/meu-handler.js`:
   ```javascript
   module.exports = {
       customIds: ['botao1', 'botao2'],

       async execute(interaction) {
           // Lógica do handler
       }
   };
   ```

2. Reinicie o bot (carregamento automático)

### Boas Práticas

- ✅ Use constantes de `utils/constants.js`
- ✅ Separe dados de lógica
- ✅ Adicione logs informativos
- ✅ Trate erros apropriadamente
- ✅ Use ephemeral para mensagens sensíveis
- ✅ Documente funções complexas

## 🚀 Deploy em Produção

### Railway / Heroku
```bash
# Adicione buildpack do Node.js
# Configure variáveis de ambiente:
# - TOKEN
# - CLIENT_ID
```

### VPS / Servidor Próprio
```bash
# Use PM2 para gerenciamento
npm install -g pm2
pm2 start index.js --name techhub-bot
pm2 save
pm2 startup
```

## 📦 Dependências

- **discord.js** v14.x - Biblioteca principal do Discord
- **dotenv** - Gerenciamento de variáveis de ambiente
- **archiver** - Criação de arquivos ZIP

## 📝 Licença

Este projeto é privado e destinado ao servidor TechHub.

## 🤝 Contribuindo

1. Siga as convenções de código existentes
2. Teste todas as mudanças localmente
3. Mantenha a documentação atualizada
4. Use commits semânticos (feat, fix, docs, etc.)

---

**Desenvolvido para TechHub** 🚀
