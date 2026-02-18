const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otimizacao')
        .setDescription('Menu de otimização do Windows'),

    async execute(interaction) {
        // Carrega os dados das mensagens
        const dataPath = path.join(__dirname, '..', 'data', 'message.json');
        let messageData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Deleta a mensagem anterior se existir
        if (messageData.otimizacao.messageId && messageData.otimizacao.channelId) {
            try {
                const channel = await interaction.client.channels.fetch(messageData.otimizacao.channelId);
                const oldMessage = await channel.messages.fetch(messageData.otimizacao.messageId);
                await oldMessage.delete();
            } catch (error) {
                console.log('Mensagem anterior não encontrada ou já foi deletada');
            }
        }

        const embed = new EmbedBuilder()
            .setColor(0x00B050)
            .setTitle("⚡ Otimização Windows")
            .setDescription("Escolha o nível desejado.")
            .addFields(
                { name: "🟢 Básico", value: "Ajustes simples e seguros." },
                { name: "🟡 Intermediário", value: "Configurações moderadas." },
                { name: "🔴 Avançado", value: "Tweaks avançados." }
            )
            .setFooter({ text: "TechHub • ISOs Oficiais • Hoje às " + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('opt_basico').setLabel('🟢 Básico').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('opt_intermediario').setLabel('🟡 Intermediário').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('opt_avancado').setLabel('🔴 Avançado').setStyle(ButtonStyle.Danger)
            );

        // Envia a mensagem no canal
        const message = await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        // Salva o ID da nova mensagem
        messageData.otimizacao.messageId = message.id;
        messageData.otimizacao.channelId = interaction.channel.id;
        fs.writeFileSync(dataPath, JSON.stringify(messageData, null, 2));

        // Responde ao usuário de forma efêmera
        await interaction.reply({
            content: '✅ Menu de otimização enviado!',
            ephemeral: true
        });
    }
};
