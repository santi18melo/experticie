# Script de PowerShell para instalar dependencias de Sphinx

Write-Host "========================================"
Write-Host "PREXCOL - Instalación de Documentación"
Write-Host "========================================"
Write-Host ""

# Activar entorno virtual
Write-Host "Activando entorno virtual..."
& ".venv\Scripts\Activate.ps1"

# Instalar dependencias
Write-Host ""
Write-Host "Instalando dependencias de documentación..."
pip install sphinx==7.2.6 sphinx-autodoc2==0.5.0 myst-parser==2.0.0 sphinx-rtd-theme==2.0.0

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Falló la instalación de dependencias" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================"
Write-Host "Generando documentación..."
Write-Host "========================================"
Write-Host ""

# Cambiar al directorio docs
Set-Location docs

# Limpiar builds anteriores
if (Test-Path "_build") {
    Write-Host "Limpiando builds anteriores..."
    Remove-Item -Recurse -Force "_build"
}

if (Test-Path "apidocs") {
    Write-Host "Limpiando documentación API anterior..."
    Remove-Item -Recurse -Force "apidocs"
}

# Construir documentación
Write-Host ""
Write-Host "Construyendo documentación HTML..."
& ".\make.bat" html

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Falló la construcción de la documentación" -ForegroundColor Red
    Write-Host "Revisa los errores anteriores" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host ""
Write-Host "========================================"
Write-Host "¡Documentación generada exitosamente!" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""
Write-Host "La documentación se encuentra en: docs\_build\html\index.html"
Write-Host ""

Set-Location ..

# Preguntar si abrir la documentación
$response = Read-Host "¿Deseas abrir la documentación ahora? (S/N)"
if ($response -eq "S" -or $response -eq "s") {
    Start-Process "docs\_build\html\index.html"
}

Write-Host ""
Write-Host "Proceso completado." -ForegroundColor Green
