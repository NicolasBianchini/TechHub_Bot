require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// ═══════════════════════════════════════════════════
// 🔥 SISTEMA DE CARREGAMENTO AUTOMÁTICO DE COMANDOS
// ═══════════════════════════════════════════════════
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('📦 Carregando comandos...');
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
    console.log(`  ✅ /${command.data.name}`);
}
console.log(`🎯 ${commandFiles.length} comandos carregados!\n`);

// ═══════════════════════════════════════════════════
// 🔥 SISTEMA DE GERENCIAMENTO DE INTERAÇÕES
// ═══════════════════════════════════════════════════
const interactionManager = require('./interactions');

// ═══════════════════════════════════════════════════
// 📡 EVENT HANDLERS
// ═══════════════════════════════════════════════════

client.once('ready', () => {
    console.log('═══════════════════════════════════════════');
    console.log(`✅ Bot online: ${client.user.tag}`);
    console.log(`🌐 Servidores: ${client.guilds.cache.size}`);
    console.log(`👥 Usuários: ${client.users.cache.size}`);
    console.log('═══════════════════════════════════════════\n');
});

client.on('interactionCreate', async interaction => {

    // ─────────────────────────────────────────────────
    // Slash Commands
    // ─────────────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({
                content: '❌ Comando não encontrado.',
                ephemeral: true
            });
        }

        try {
            console.log(`📌 Comando executado: /${interaction.commandName} por ${interaction.user.tag}`);
            await command.execute(interaction);
        } catch (error) {
            console.error(`❌ Erro no comando /${interaction.commandName}:`, error);

            const errorMessage = {
                content: '❌ Erro ao executar comando. Tente novamente.',
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }

    // ─────────────────────────────────────────────────
    // Button Interactions (Sistema Escalável)
    // ─────────────────────────────────────────────────
    if (interaction.isButton()) {
        console.log(`🔘 Botão clicado: ${interaction.customId} por ${interaction.user.tag}`);
        await interactionManager.handleInteraction(interaction);
    }

    // ─────────────────────────────────────────────────
    // Select Menu Interactions (preparado para futuro)
    // ─────────────────────────────────────────────────
    if (interaction.isStringSelectMenu()) {
        console.log(`📋 Select Menu: ${interaction.customId} por ${interaction.user.tag}`);
        await interactionManager.handleInteraction(interaction);
    }
});

// ═══════════════════════════════════════════════════
// 🚨 ERROR HANDLERS
// ═══════════════════════════════════════════════════

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

// ═══════════════════════════════════════════════════
// 🚀 INICIALIZAÇÃO
// ═══════════════════════════════════════════════════

client.login(process.env.TOKEN)
    .then(() => console.log('🔐 Autenticação bem-sucedida'))
    .catch(error => {
        console.error('❌ Erro na autenticação:', error);
        process.exit(1);
    });

