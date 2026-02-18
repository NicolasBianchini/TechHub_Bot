/**
 * Constantes globais da aplicação
 * Centralize valores fixos aqui para fácil manutenção
 */

module.exports = {
    // Cores padrão dos embeds
    COLORS: {
        PRIMARY: 0x0078D7,
        SUCCESS: 0x00B050,
        WARNING: 0xFFC000,
        DANGER: 0xC00000,
        INFO: 0x3498DB,
        SECONDARY: 0x7289DA
    },

    // Emojis padronizados
    EMOJIS: {
        SUCCESS: '✅',
        ERROR: '❌',
        WARNING: '⚠️',
        INFO: 'ℹ️',
        LOADING: '⏳',
        DOWNLOAD: '📥',
        CHROME: '🌐',
        SECURITY: '🔒',
        PRODUCTIVITY: '⚡',
        DEVELOPER: '👨‍💻',
        PRIVACY: '🛡️',
        TOOLS: '🔧'
    },

    // Categorias de extensões
    EXTENSION_CATEGORIES: {
        SECURITY: {
            name: 'Segurança & Privacidade',
            emoji: '🛡️',
            color: 0xE74C3C
        },
        PRODUCTIVITY: {
            name: 'Produtividade',
            emoji: '⚡',
            color: 0x3498DB
        },
        DEVELOPER: {
            name: 'Desenvolvedor',
            emoji: '👨‍💻',
            color: 0x9B59B6
        },
        TOOLS: {
            name: 'Ferramentas',
            emoji: '🔧',
            color: 0xF39C12
        }
    },

    // Mensagens padrão
    MESSAGES: {
        COMMAND_SUCCESS: 'Comando executado com sucesso!',
        COMMAND_ERROR: 'Erro ao executar comando.',
        FILE_SENT: 'Arquivo enviado com sucesso!',
        INVALID_INTERACTION: 'Interação inválida ou expirada.'
    },

    // Timeouts (em milissegundos)
    TIMEOUTS: {
        DELETE_TEMP_FILE: 5000,
        INTERACTION_TIMEOUT: 15000,
        CACHE_CLEANUP: 300000 // 5 minutos
    }
};
