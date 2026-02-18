/**
 * Sistema de carregamento automático de handlers de interações
 * Carrega dinamicamente todos os handlers da pasta interactions
 * Cada handler deve exportar: { customIds: [], execute: async function }
 */

const fs = require('fs');
const path = require('path');

class InteractionManager {
    constructor() {
        this.handlers = new Map();
        this.loadHandlers();
    }

    /**
     * Carrega todos os handlers da pasta interactions
     */
    loadHandlers() {
        const handlersPath = path.join(__dirname);
        const handlerFiles = fs.readdirSync(handlersPath)
            .filter(file => file.endsWith('.js') && file !== 'index.js');

        let totalHandlers = 0;

        for (const file of handlerFiles) {
            try {
                const handler = require(path.join(handlersPath, file));

                if (!handler.customIds || !handler.execute) {
                    console.warn(`⚠️  Handler ${file} inválido (faltando customIds ou execute)`);
                    continue;
                }

                // Registrar cada customId para o handler
                handler.customIds.forEach(customId => {
                    this.handlers.set(customId, {
                        name: file.replace('.js', ''),
                        execute: handler.execute
                    });
                    totalHandlers++;
                });

                console.log(`✅ Handler carregado: ${file} (${handler.customIds.length} customIds)`);
            } catch (error) {
                console.error(`❌ Erro ao carregar handler ${file}:`, error);
            }
        }

        console.log(`🎯 Total de ${totalHandlers} interações registradas de ${handlerFiles.length} handlers`);
    }

    /**
     * Processa uma interação de botão
     */
    async handleInteraction(interaction) {
        const handler = this.handlers.get(interaction.customId);

        if (!handler) {
            console.warn(`⚠️  Nenhum handler encontrado para: ${interaction.customId}`);
            return interaction.reply({
                content: '❌ Interação não reconhecida ou desabilitada.',
                ephemeral: true
            }).catch(() => { });
        }

        try {
            await handler.execute(interaction);
        } catch (error) {
            console.error(`❌ Erro no handler ${handler.name}:`, error);

            const errorMessage = {
                content: '❌ Erro ao processar interação. Tente novamente.',
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMessage).catch(() => { });
            } else {
                await interaction.reply(errorMessage).catch(() => { });
            }
        }
    }

    /**
     * Recarrega todos os handlers (útil para hot-reload em desenvolvimento)
     */
    reload() {
        this.handlers.clear();

        // Limpar cache do require
        Object.keys(require.cache).forEach(key => {
            if (key.includes('interactions/')) {
                delete require.cache[key];
            }
        });

        this.loadHandlers();
        console.log('🔄 Handlers recarregados!');
    }
}

// Exportar instância singleton
module.exports = new InteractionManager();
