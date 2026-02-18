const path = require('path');
const fs = require('fs');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const archiver = require('archiver');

module.exports = async (interaction) => {

    /* =========================
       ISO - Download XML
    ========================== */
    if (interaction.customId === 'download_xml') {

        const zipPath = path.join(__dirname, '../temp-autounattend.zip');
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Promessa para aguardar a criação do ZIP
        await new Promise((resolve, reject) => {
            output.on('close', resolve);
            archive.on('error', reject);

            archive.pipe(output);

            // Adiciona os arquivos dentro de uma pasta "Autounattend"
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
            .setColor(0x0078D7)
            .setTitle("📥 Instalação Automática do Windows")
            .setDescription("**Conteúdo do arquivo:**\n📁 `Autounattend/`\n├─ 📄 `autounattend.xml` - Arquivo de configuração\n└─ 📖 `LEIA-ME.txt` - Instruções detalhadas\n\n⚠️ Extraia o ZIP e coloque o `autounattend.xml` na raiz do pen drive bootável!");

        const reply = await interaction.reply({
            embeds: [embed],
            files: [zipFile],
            ephemeral: true
        });

        // Deleta o arquivo ZIP temporário após enviar
        setTimeout(() => {
            fs.unlink(zipPath, (err) => {
                if (err) console.error('Erro ao deletar ZIP temporário:', err);
            });
        }, 5000);

        return reply;
    }

    /* =========================
       OTIMIZAÇÃO - BÁSICO
    ========================== */
    if (interaction.customId === 'opt_basico') {

        const file = new AttachmentBuilder(
            path.join(__dirname, '../scripts/basico.ps1')
        );

        const embed = new EmbedBuilder()
            .setColor(0x00B050)
            .setTitle("🟢 Otimização Básica")
            .setDescription("Script seguro para ajustes básicos.");

        return interaction.reply({
            embeds: [embed],
            files: [file],
            ephemeral: true
        });
    }

    /* =========================
       OTIMIZAÇÃO - INTERMEDIÁRIO
    ========================== */
    if (interaction.customId === 'opt_intermediario') {

        const file = new AttachmentBuilder(
            path.join(__dirname, '../scripts/intermediario.ps1')
        );

        const embed = new EmbedBuilder()
            .setColor(0xFFC000)
            .setTitle("🟡 Otimização Intermediária")
            .setDescription("Script para ajustes técnicos moderados.");

        return interaction.reply({
            embeds: [embed],
            files: [file],
            ephemeral: true
        });
    }

    /* =========================
       OTIMIZAÇÃO - AVANÇADO
    ========================== */
    if (interaction.customId === 'opt_avancado') {

        const file = new AttachmentBuilder(
            path.join(__dirname, '../scripts/avancado.ps1')
        );

        const embed = new EmbedBuilder()
            .setColor(0xC00000)
            .setTitle("🔴 Otimização Avançada")
            .setDescription("Script avançado. Use com cuidado.");

        return interaction.reply({
            embeds: [embed],
            files: [file],
            ephemeral: true
        });
    }
};
