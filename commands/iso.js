const fs = require('fs');
const path = require('path');
const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iso')
        .setDescription('Canal oficial de ISOs Windows'),

    async execute(interaction) {
        // Carrega os dados das mensagens
        const dataPath = path.join(__dirname, '..', 'data', 'message.json');
        let messageData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Deleta a mensagem anterior se existir
        if (messageData.iso.messageId && messageData.iso.channelId) {
            try {
                const channel = await interaction.client.channels.fetch(messageData.iso.channelId);
                const oldMessage = await channel.messages.fetch(messageData.iso.messageId);
                await oldMessage.delete();
            } catch (error) {
                console.log('Mensagem anterior não encontrada ou já foi deletada');
            }
        }

        const embed = new EmbedBuilder()
            .setColor(0x0078D7)
            .setTitle("📀 Windows + Truques")
            .setDescription("Links oficiais da Microsoft\nInclui instalação automática.")
            .addFields(
                { name: "🪟 Windows 10", value: "Versão: 22H2" },
                { name: "🪟 Windows 11", value: "Versão: 23H2" },
                { name: "⚙️ Instalação Automática", value: "Clique no botão abaixo para baixar o **autounattend.xml**." },
                { name: "⚙️ Ativação do Windows", value: "irm https://get.activated.win/ | iex \n\n Cole o código no PowerShell como administrador." }
            )
            .setFooter({ text: "Última atualização manual" })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Download Windows 10')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://www.microsoft.com/software-download/windows10'),

                new ButtonBuilder()
                    .setLabel('Download Windows 11')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://www.microsoft.com/software-download/windows11'),

                new ButtonBuilder()
                    .setCustomId('download_xml')
                    .setLabel('Baixar Autounattend')
                    .setStyle(ButtonStyle.Primary)
            );

        // Envia a mensagem no canal
        const message = await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        // Salva o ID da nova mensagem
        messageData.iso.messageId = message.id;
        messageData.iso.channelId = interaction.channel.id;
        fs.writeFileSync(dataPath, JSON.stringify(messageData, null, 2));

        // Responde ao usuário de forma efêmera
        await interaction.reply({
            content: '✅ Menu de ISOs enviado!',
            ephemeral: true
        });
    }
};
