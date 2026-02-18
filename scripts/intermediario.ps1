# Ajustar memória virtual automaticamente
wmic computersystem where name="%computername%" set AutomaticManagedPagefile=True

# Desativar serviço SysMain
Stop-Service SysMain -Force
Set-Service SysMain -StartupType Disabled

Write-Host "Otimização intermediária concluída!"
Pause
