╔═══════════════════════════════════════════════════════════════════════════╗
║                   COMO USAR O AUTOUNATTEND.XML                            ║
║                   Instalação Automática do Windows                        ║
╚═══════════════════════════════════════════════════════════════════════════╝

📋 O QUE É?
───────────
O autounattend.xml é um arquivo de configuração que automatiza a instalação
do Windows, pulando perguntas e aplicando configurações personalizadas.


🔧 COMO USAR:
─────────────

1️⃣  PREPARAR O PEN DRIVE:
    • Baixe a ISO oficial do Windows 10 ou 11
    • Use o Rufus ou outra ferramenta para criar um pen drive bootável
    • IMPORTANTE: Formate como FAT32 ou NTFS

2️⃣  ADICIONAR O ARQUIVO:
    • Coloque o arquivo "autounattend.xml" na RAIZ do pen drive
    • Deve ficar junto com as pastas "boot", "efi", "sources", etc.
    • Estrutura correta:
      └─ PEN DRIVE\
         ├─ autounattend.xml  ← AQUI!
         ├─ boot\
         ├─ efi\
         ├─ sources\
         └─ setup.exe

3️⃣  INSTALAR:
    • Dê boot pelo pen drive no computador
    • A instalação iniciará AUTOMATICAMENTE
    • Aguarde o processo finalizar (não precisa fazer nada!)


✨ O QUE ELE FAZ:
─────────────────
✓ Cria usuário "Usuario" sem senha
✓ Aceita termos automaticamente
✓ Remove aplicativos desnecessários (OneDrive, Cortana, etc)
✓ Desativa Copilot e widgets
✓ Ativa plano de energia "Ultimate Performance"
✓ Configurações de privacidade otimizadas


⚠️  ATENÇÃO:
────────────
• Alguns antivírus podem bloquear scripts - é normal
• O Windows pode avisar sobre "arquivos não confiáveis" - ignore
• O sistema reiniciará algumas vezes automaticamente
• Usuário criado: "Usuario" (sem senha)


🔑 ATIVAÇÃO DO WINDOWS:
───────────────────────
Após instalar, abra o PowerShell como administrador e execute:

    irm https://get.activated.win/ | iex


📞 SUPORTE:
───────────
Em caso de dúvidas, retorne ao servidor Discord TechHub.


════════════════════════════════════════════════════════════════════════════
                    © TechHub - Instalação Simplificada
════════════════════════════════════════════════════════════════════════════
