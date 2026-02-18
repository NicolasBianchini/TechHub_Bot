const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { COLORS, EXTENSION_CATEGORIES } = require('../utils/constants');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('extensoes')
        .setDescription('Extensões recomendadas para navegadores'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(COLORS.INFO)
            .setTitle('🌐 Extensões Recomendadas para Chrome')
            .setDescription('Escolha uma categoria para ver extensões recomendadas.\n\n*Todas as extensões são da Chrome Web Store oficial.*')
            .addFields(
                {
                    name: `${EXTENSION_CATEGORIES.SECURITY.emoji} ${EXTENSION_CATEGORIES.SECURITY.name}`,
                    value: 'Bloqueadores de anúncios, anti-rastreamento e privacidade',
                    inline: true
                },
                {
                    name: `${EXTENSION_CATEGORIES.PRODUCTIVITY.emoji} ${EXTENSION_CATEGORIES.PRODUCTIVITY.name}`,
                    value: 'Aumente sua produtividade e organize melhor',
                    inline: true
                },
                {
                    name: `${EXTENSION_CATEGORIES.DEVELOPER.emoji} ${EXTENSION_CATEGORIES.DEVELOPER.name}`,
                    value: 'Ferramentas essenciais para desenvolvedores',
                    inline: true
                },
                {
                    name: `${EXTENSION_CATEGORIES.TOOLS.emoji} ${EXTENSION_CATEGORIES.TOOLS.name}`,
                    value: 'Utilitários diversos para facilitar seu dia',
                    inline: true
                }
            )
            .setFooter({ text: 'TechHub • Extensões Verificadas' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ext_security')
                    .setLabel('Segurança')
                    .setEmoji(EXTENSION_CATEGORIES.SECURITY.emoji)
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId('ext_productivity')
                    .setLabel('Produtividade')
                    .setEmoji(EXTENSION_CATEGORIES.PRODUCTIVITY.emoji)
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('ext_developer')
                    .setLabel('Desenvolvedor')
                    .setEmoji(EXTENSION_CATEGORIES.DEVELOPER.emoji)
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('ext_tools')
                    .setLabel('Ferramentas')
                    .setEmoji(EXTENSION_CATEGORIES.TOOLS.emoji)
                    .setStyle(ButtonStyle.Success)
            );

        // Enviar mensagem fixa no canal
        await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        // Confirmar para o usuário (temporária)
        await interaction.reply({
            content: '✅ Categorias de extensões enviadas!',
            ephemeral: true
        });
    }
};
