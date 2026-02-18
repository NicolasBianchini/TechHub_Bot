/**
 * Handler de interações relacionadas ao comando de Otimização
 * Responsável por enviar scripts de otimização do Windows
 */

const path = require('path');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { COLORS } = require('../utils/constants');

/**
 * Configuração dos níveis de otimização
 */
const OPTIMIZATION_LEVELS = {
    basico: {
        file: 'basico.ps1',
        color: COLORS.SUCCESS,
        title: '🟢 Otimização Básica',
        description: 'Script seguro para ajustes básicos e melhorias de performance.',
        details: '✓ Desativa serviços desnecessários\n✓ Otimiza configurações visuais\n✓ 100% seguro para iniciantes'
    },
    intermediario: {
        file: 'intermediario.ps1',
        color: COLORS.WARNING,
        title: '🟡 Otimização Intermediária',
        description: 'Script para ajustes técnicos moderados.',
        details: '✓ Tweaks de registro avançados\n✓ Otimizações de rede\n✓ Requer conhecimento básico'
    },
    avancado: {
        file: 'avancado.ps1',
        color: COLORS.DANGER,
        title: '🔴 Otimização Avançada',
        description: 'Script avançado com tweaks profundos. Use com cuidado!',
        details: '⚠️ Modificações profundas no sistema\n⚠️ Pode afetar funcionalidades\n⚠️ Apenas para usuários avançados'
    }
};

/**
 * Envia script de otimização
 */
async function handleOptimization(interaction, level) {
    const config = OPTIMIZATION_LEVELS[level];

    if (!config) {
        return interaction.reply({
            content: '❌ Nível de otimização inválido.',
            ephemeral: true
        });
    }

    const file = new AttachmentBuilder(
        path.join(__dirname, '../scripts', config.file)
    );

    const embed = new EmbedBuilder()
        .setColor(config.color)
        .setTitle(config.title)
        .setDescription(config.description)
        .addFields(
            { name: '📋 O que faz', value: config.details },
            { name: '💡 Como usar', value: '1. Baixe o arquivo\n2. Clique com botão direito\n3. Executar com PowerShell' }
        )
        .setFooter({ text: 'TechHub • Scripts de Otimização' })
        .setTimestamp();

    return interaction.reply({
        embeds: [embed],
        files: [file],
        ephemeral: true
    });
}

/**
 * Roteador principal de interações de Otimização
 */
module.exports = {
    customIds: ['opt_basico', 'opt_intermediario', 'opt_avancado'],

    async execute(interaction) {
        const level = interaction.customId.replace('opt_', '');
        return await handleOptimization(interaction, level);
    }
};
