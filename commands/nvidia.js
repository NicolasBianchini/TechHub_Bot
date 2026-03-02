const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nvidia')
        .setDescription('Guia de otimização para placas NVIDIA'),

    async execute(interaction) {
        // Carrega os dados das mensagens
        const dataPath = path.join(__dirname, '..', 'data', 'message.json');
        let messageData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Deleta a mensagem anterior se existir
        if (messageData.nvidia?.messageId && messageData.nvidia?.channelId) {
            try {
                const channel = await interaction.client.channels.fetch(messageData.nvidia.channelId);
                const oldMessage = await channel.messages.fetch(messageData.nvidia.messageId);
                await oldMessage.delete();
            } catch (error) {
                console.log('Mensagem anterior não encontrada ou já foi deletada');
            }
        }

        const embed = new EmbedBuilder()
            .setColor(0x76B900)
            .setTitle("🎮 Otimização NVIDIA")
            .setDescription("Melhore o desempenho e qualidade visual da sua GPU NVIDIA.")
            .addFields(
                { name: "⚡ Configurações Gerais", value: "Otimize FPS e reduza latência" },
                { name: "🎨 Configurações de Cores", value: "Ajuste o painel de controle para melhor qualidade visual" }
            )
            .setFooter({ text: "TechHub • Guias NVIDIA • Hoje às " + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('nvidia_geral').setLabel('⚡ Configurações Gerais').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('nvidia_cores').setLabel('🎨 Configurações de Cores').setStyle(ButtonStyle.Primary)
            );

        // Envia a mensagem no canal
        const message = await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        // Inicializa o objeto nvidia se não existir
        if (!messageData.nvidia) {
            messageData.nvidia = {};
        }

        // Salva o ID da nova mensagem
        messageData.nvidia.messageId = message.id;
        messageData.nvidia.channelId = interaction.channel.id;
        fs.writeFileSync(dataPath, JSON.stringify(messageData, null, 2));

        // Responde ao usuário de forma efêmera
        await interaction.reply({
            content: '✅ Menu de otimização NVIDIA enviado!',
            ephemeral: true
        });
    }
};
