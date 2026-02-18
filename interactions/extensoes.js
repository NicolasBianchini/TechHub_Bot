/**
 * Handler de interações relacionadas ao comando de Extensões
 * Responsável por exibir categorias de extensões do Chrome
 */

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const extensions = require('../data/extensions');
const { EXTENSION_CATEGORIES } = require('../utils/constants');

/**
 * Mapeia categoria do customId para a chave no objeto extensions
 */
const CATEGORY_MAP = {
    ext_security: 'security',
    ext_productivity: 'productivity',
    ext_developer: 'developer',
    ext_tools: 'tools'
};

/**
 * Mapeia chave do categoryKey para EXTENSION_CATEGORIES
 */
const CATEGORY_INFO_MAP = {
    security: 'SECURITY',
    productivity: 'PRODUCTIVITY',
    developer: 'DEVELOPER',
    tools: 'TOOLS'
};

/**
 * Cria botões para extensões (máximo 5 por linha, 5 linhas = 25 botões)
 * NOTA: Botões com URL SEMPRE devem ser ButtonStyle.Link (regra do Discord)
 */
function createExtensionButtons(extensionList) {
    const rows = [];
    const maxPerRow = 5;

    for (let i = 0; i < extensionList.length; i += maxPerRow) {
        const row = new ActionRowBuilder();
        const chunk = extensionList.slice(i, i + maxPerRow);

        chunk.forEach(ext => {
            // Adiciona ⭐ no label para extensões recomendadas
            const label = ext.recommended ? `⭐ ${ext.name}` : ext.name;

            row.addComponents(
                new ButtonBuilder()
                    .setLabel(label)
                    .setEmoji(ext.emoji)
                    .setStyle(ButtonStyle.Link) // SEMPRE Link quando tem URL
                    .setURL(ext.url)
            );
        });

        rows.push(row);
    }

    return rows;
}

/**
 * Exibe extensões de uma categoria específica
 */
async function handleCategorySelection(interaction) {
    const categoryKey = CATEGORY_MAP[interaction.customId];
    const extensionList = extensions[categoryKey];

    if (!extensionList || extensionList.length === 0) {
        return interaction.reply({
            content: '❌ Nenhuma extensão encontrada nesta categoria.',
            ephemeral: true
        });
    }

    // Obter informações da categoria
    const categoryInfoKey = CATEGORY_INFO_MAP[categoryKey];
    const categoryInfo = EXTENSION_CATEGORIES[categoryInfoKey];

    // Criar embed
    const embed = new EmbedBuilder()
        .setColor(categoryInfo?.color || 0x3498DB)
        .setTitle(`${categoryInfo?.emoji || '🌐'} ${categoryInfo?.name || 'Extensões'}`)
        .setDescription(
            `Clique nos botões abaixo para abrir direto na Chrome Web Store.\n\n` +
            `✅ = **Altamente Recomendado**\n\n` +
            `**${extensionList.length} extensões disponíveis:**`
        );

    // Adicionar extensões como fields
    extensionList.forEach(ext => {
        const badge = ext.recommended ? '⭐ **RECOMENDADO**\n' : '';
        embed.addFields({
            name: `${ext.emoji} ${ext.name}`,
            value: `${badge}${ext.description}`,
            inline: false
        });
    });

    embed.setFooter({ text: 'TechHub • Chrome Web Store Oficial' })
        .setTimestamp();

    // Criar botões
    const buttons = createExtensionButtons(extensionList);

    // Enviar mensagem temporária (apenas para quem clicou)
    await interaction.reply({
        embeds: [embed],
        components: buttons,
        ephemeral: true
    });
}

/**
 * Roteador principal de interações de Extensões
 */
module.exports = {
    customIds: ['ext_security', 'ext_productivity', 'ext_developer', 'ext_tools'],

    async execute(interaction) {
        return await handleCategorySelection(interaction);
    }
};
