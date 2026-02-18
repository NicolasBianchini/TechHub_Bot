/**
 * Handler de interações relacionadas ao comando ISO
 * Responsável por gerenciar downloads e ações do autounattend
 */

const path = require('path');
const fs = require('fs');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const archiver = require('archiver');
const { COLORS, TIMEOUTS } = require('../utils/constants');

/**
 * Download do arquivo autounattend.xml empacotado
 */
async function handleDownloadXml(interaction) {
    const zipPath = path.join(__dirname, '../temp-autounattend.zip');
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Criar ZIP com os arquivos
    await new Promise((resolve, reject) => {
        output.on('close', resolve);
        archive.on('error', reject);

        archive.pipe(output);

        archive.file(path.join(__dirname, '../data/autounattend/autounattend.xml'), {
            name: 'Autounattend/autounattend.xml'
        });
        archive.file(path.join(__dirname, '../data/autounattend/AUTOUNATTEND-README.txt'), {
            name: 'Autounattend/LEIA-ME.txt'
        });

        archive.finalize();
    });

    const zipFile = new AttachmentBuilder(zipPath);

    const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle("📥 Instalação Automática do Windows")
        .setDescription(
            "**Conteúdo do arquivo:**\n" +
            "📁 `Autounattend/`\n" +
            "├─ 📄 `autounattend.xml` - Arquivo de configuração\n" +
            "└─ 📖 `LEIA-ME.txt` - Instruções detalhadas\n\n" +
            "⚠️ **Como usar:**\n" +
            "1. Extraia o ZIP\n" +
            "2. Coloque `autounattend.xml` na raiz do pen drive bootável\n" +
            "3. Leia o arquivo LEIA-ME.txt para instruções completas"
        );

    await interaction.reply({
        embeds: [embed],
        files: [zipFile],
        ephemeral: true
    });

    // Limpar arquivo temporário
    setTimeout(() => {
        fs.unlink(zipPath, (err) => {
            if (err) console.error('Erro ao deletar ZIP temporário:', err);
        });
    }, TIMEOUTS.DELETE_TEMP_FILE);
}

/**
 * Roteador principal de interações ISO
 */
module.exports = {
    customIds: ['download_xml'],

    async execute(interaction) {
        switch (interaction.customId) {
            case 'download_xml':
                return await handleDownloadXml(interaction);

            default:
                console.warn(`CustomId não reconhecido: ${interaction.customId}`);
        }
    }
};
