require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// 🔥 Carregar comandos automaticamente
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('clientReady', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }

    // 🔥 Botões separados
    if (interaction.isButton()) {
        const buttonHandler = require('./interactions/buttons');
        buttonHandler(interaction);
    }
});

client.login(process.env.TOKEN);
