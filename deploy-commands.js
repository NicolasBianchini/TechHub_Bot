require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════
// 📦 CARREGAMENTO DE COMANDOS
// ═══════════════════════════════════════════════════

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('═══════════════════════════════════════════');
console.log('📦 Carregando comandos para deploy...\n');

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
    console.log(`  ✅ /${command.data.name.padEnd(15)} - ${command.data.description}`);
}

console.log(`\n🎯 Total: ${commands.length} comandos carregados`);
console.log('═══════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════
// 🚀 DEPLOY NA API DO DISCORD
// ═══════════════════════════════════════════════════

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('🔄 Iniciando registro de comandos na API do Discord...\n');

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('═══════════════════════════════════════════');
        console.log(`✅ ${data.length} comandos registrados com sucesso!`);
        console.log('═══════════════════════════════════════════\n');

        console.log('📌 Comandos disponíveis no Discord:');
        data.forEach(cmd => {
            console.log(`  • /${cmd.name}`);
        });
        console.log('');

    } catch (error) {
        console.error('═══════════════════════════════════════════');
        console.error('❌ Erro ao registrar comandos:');
        console.error('═══════════════════════════════════════════');
        console.error(error);
        process.exit(1);
    }
})();

