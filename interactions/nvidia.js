/**
 * Handler de interações relacionadas ao comando NVIDIA
 * Responsável por enviar guias com prints de configurações da NVIDIA
 */

const path = require('path');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { COLORS, NVIDIA_MODULES } = require('../utils/constants');
const fs = require('fs');

/**
 * Configuração dos módulos de otimização NVIDIA
 */
const NVIDIA_CONFIGS = {
    geral: {
        color: COLORS.SUCCESS,
        title: '⚡ Configurações Gerais NVIDIA - FPS & Baixa Latência',
        description: 'Otimize sua GPU para melhor FPS e menor latência nos jogos.',
        details: '✓ Aumenta FPS\n✓ Reduz latência de entrada\n✓ Melhora tempo de resposta\n✓ Configurações testadas',
        folder: 'config-fps',
        images: [
            { file: 'image-1.png', title: '📍 Passo 1/7', desc: 'Configurações iniciais do painel' },
            { file: 'image-2.png', title: '📍 Passo 2/7', desc: 'Ajustes de gerenciamento 3D' },
            { file: 'image-3.png', title: '📍 Passo 3/7', desc: 'Configurações de performance' },
            { file: 'image-4.png', title: '📍 Passo 4/7', desc: 'Otimizações de textura' },
            { file: 'image-5.png', title: '📍 Passo 5/7', desc: 'Ajustes de sincronização' },
            { file: 'image-6.png', title: '📍 Passo 6/7', desc: 'Configurações de energia' },
            { file: 'image-7.png', title: '📍 Passo 7/7', desc: 'Finalização e aplicação' }
        ],
        steps: '1. Abra o Painel de Controle NVIDIA\n2. Vá em "Gerenciar configurações 3D"\n3. Aplique as configurações dos prints na ordem\n4. Clique em "Aplicar"'
    },
    cores: {
        color: COLORS.PRIMARY,
        title: '🎨 Configurações de Cores NVIDIA',
        description: 'Ajuste o painel de controle NVIDIA para melhor qualidade visual.',
        details: '✓ Cores mais vibrantes\n✓ Melhor contraste\n✓ Nitidez aprimorada\n✓ Qualidade visual premium',
        folder: 'config-colors',
        images: [
            { file: 'image.png', title: '📍 Configuração de Cores', desc: 'Ajustes do painel de cores' }
        ],
        steps: '1. Abra o Painel de Controle NVIDIA\n2. Vá em "Ajustar configurações de cor da área de trabalho"\n3. Aplique as configurações do print\n4. Clique em "Aplicar"'
    }
};

/**
 * Envia guia de otimização NVIDIA
 */
async function handleNvidiaOptimization(interaction, module) {
    const config = NVIDIA_CONFIGS[module];

    if (!config) {
        return interaction.reply({
            content: '❌ Módulo NVIDIA inválido.',
            ephemeral: true
        });
    }

    // Envia cada imagem sequencialmente
    const imagesPath = path.join(__dirname, '..', 'utils', 'images', config.folder);

    for (let i = 0; i < config.images.length; i++) {
        const imageConfig = config.images[i];
        const imagePath = path.join(imagesPath, imageConfig.file);

        // Verifica se a imagem existe
        if (fs.existsSync(imagePath)) {
            const attachment = new AttachmentBuilder(imagePath);

            const stepEmbed = new EmbedBuilder()
                .setColor(config.color)
                .setTitle(imageConfig.title)
                .setDescription(imageConfig.desc)
                .setImage(`attachment://${imageConfig.file}`)
                .setFooter({ text: `TechHub • Guias NVIDIA` });

            // Primeira imagem usa reply, demais usam followUp
            if (i === 0) {
                await interaction.reply({
                    embeds: [stepEmbed],
                    files: [attachment],
                    ephemeral: true
                });
            } else {
                await interaction.followUp({
                    embeds: [stepEmbed],
                    files: [attachment],
                    ephemeral: true
                });
            }

            // Pequeno delay para garantir ordem correta
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

/**
 * Roteador principal de interações NVIDIA
 */
module.exports = {
    customIds: ['nvidia_geral', 'nvidia_cores'],

    async execute(interaction) {
        const module = interaction.customId.replace('nvidia_', '');
        return await handleNvidiaOptimization(interaction, module);
    }
};
