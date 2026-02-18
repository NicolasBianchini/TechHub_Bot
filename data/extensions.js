/**
 * Base de dados de extensões do Chrome
 * Organizado por categorias para fácil manutenção
 */

module.exports = {
    security: [
        {
            id: 'ublock',
            name: 'uBlock Origin',
            description: 'Bloqueador de anúncios eficiente e leve',
            url: 'https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm',
            emoji: '🛡️',
            recommended: true
        },
        {
            id: 'privacy-badger',
            name: 'Privacy Badger',
            description: 'Bloqueia rastreadores invisíveis automaticamente',
            url: 'https://chromewebstore.google.com/detail/privacy-badger/pkehgijcmpdhfbdbbnkijodmdjhbjlgp',
            emoji: '🦡'
        },
        {
            id: 'https-everywhere',
            name: 'HTTPS Everywhere',
            description: 'Força conexões HTTPS em sites',
            url: 'https://chromewebstore.google.com/detail/https-everywhere/gcbommkclmclpchllfjekcdonpmejbdp',
            emoji: '🔒'
        },
        {
            id: 'decentraleyes',
            name: 'Decentraleyes',
            description: 'Proteção contra rastreamento via CDN',
            url: 'https://chromewebstore.google.com/detail/decentraleyes/ldpochfccmkkmhdbclfhpagapcfdljkj',
            emoji: '🌐'
        }
    ],

    productivity: [
        {
            id: 'vimium',
            name: 'Vimium',
            description: 'Navegue com atalhos de teclado estilo Vim',
            url: 'https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb',
            emoji: '⌨️',
            recommended: true
        },
        {
            id: 'one-tab',
            name: 'OneTab',
            description: 'Reduz uso de memória agrupando abas',
            url: 'https://chromewebstore.google.com/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall',
            emoji: '📑'
        },
        {
            id: 'dark-reader',
            name: 'Dark Reader',
            description: 'Modo escuro para todos os sites',
            url: 'https://chromewebstore.google.com/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh',
            emoji: '🌙'
        },
        {
            id: 'notion-web',
            name: 'Notion Web Clipper',
            description: 'Salve páginas web no Notion',
            url: 'https://chromewebstore.google.com/detail/notion-web-clipper/knheggckgoiihginacbkhaalnibhilkk',
            emoji: '📝'
        }
    ],

    developer: [
        {
            id: 'react-devtools',
            name: 'React Developer Tools',
            description: 'Inspeção de componentes React',
            url: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi',
            emoji: '⚛️',
            recommended: true
        },
        {
            id: 'vue-devtools',
            name: 'Vue.js devtools',
            description: 'Ferramentas de debug para Vue.js',
            url: 'https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd',
            emoji: '💚'
        },
        {
            id: 'jsonview',
            name: 'JSONView',
            description: 'Formatador de JSON no navegador',
            url: 'https://chromewebstore.google.com/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc',
            emoji: '📊'
        },
        {
            id: 'wappalyzer',
            name: 'Wappalyzer',
            description: 'Identifica tecnologias de sites',
            url: 'https://chromewebstore.google.com/detail/wappalyzer/gppongmhjkpfnbhagpmjfkannfbllamg',
            emoji: '🔍'
        },
        {
            id: 'octotree',
            name: 'Octotree',
            description: 'Navegação em árvore para GitHub',
            url: 'https://chromewebstore.google.com/detail/octotree-github-code-tree/bkhaagjahfmjljalopjnoealnfndnagc',
            emoji: '🌳'
        }
    ],

    tools: [
        {
            id: 'grammarly',
            name: 'Grammarly',
            description: 'Corretor gramatical e de escrita',
            url: 'https://chromewebstore.google.com/detail/grammarly-grammar-checker/kbfnbcaeplbcioakkpcpgfkobkghlhen',
            emoji: '✍️'
        },
        {
            id: 'google-translate',
            name: 'Google Translate',
            description: 'Tradutor integrado ao navegador',
            url: 'https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb',
            emoji: '🌍'
        },
        {
            id: 'video-speed',
            name: 'Video Speed Controller',
            description: 'Controle velocidade de vídeos HTML5',
            url: 'https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk',
            emoji: '🎬'
        },
        {
            id: 'lastpass',
            name: 'LastPass',
            description: 'Gerenciador de senhas',
            url: 'https://chromewebstore.google.com/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd',
            emoji: '🔑'
        }
    ]
};
