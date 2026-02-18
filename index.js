require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const fs = require('fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

    /* =========================
       SLASH COMMAND /iso
    ========================== */
    if (interaction.isChatInputCommand()) {

        if (interaction.commandName !== 'iso') return;

        await interaction.deferReply({ ephemeral: true });

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

        try {
            let messageData = null;

            if (fs.existsSync('message.json')) {
                messageData = JSON.parse(fs.readFileSync('message.json'));
            }

            // 🔥 Se existir mensagem antiga → deleta
            if (messageData) {
                try {
                    const channel = await client.channels.fetch(messageData.channelId);
                    const oldMessage = await channel.messages.fetch(messageData.messageId);
                    await oldMessage.delete();
                } catch (e) {
                    console.log("Mensagem antiga já não existe.");
                }
            }

            // 🔥 Sempre cria nova mensagem limpa
            const newMessage = await interaction.channel.send({
                embeds: [embed],
                components: [row]
            });

            fs.writeFileSync('message.json', JSON.stringify({
                messageId: newMessage.id,
                channelId: newMessage.channelId
            }, null, 2));

            await interaction.editReply("Mensagem atualizada com sucesso ✅");

        } catch (error) {
            console.error(error);
            await interaction.editReply("Erro ao criar mensagem ❌");
        }
    }

    /* =========================
       BOTÃO DE DOWNLOAD XML
    ========================== */
    if (interaction.isButton()) {
        if (interaction.customId === 'download_xml') {

            const file = new AttachmentBuilder('./autounattend.xml', {
                name: 'autounattend.xml'
            });

            await interaction.reply({
                files: [file], // 🔥 somente arquivo
                ephemeral: true
            });
        }
    }
});

client.login(process.env.TOKEN);