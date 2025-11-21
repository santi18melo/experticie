# Script PowerShell para cargar datos de prueba en Windows
# Uso: .\cargar_datos.ps1

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║      CARGANDO DATOS DE PRUEBA - APP PRODUCTOS        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (!(Test-Path "manage.py")) {
    Write-Host "❌ Error: manage.py no encontrado" -ForegroundColor Red
    Write-Host "Asegúrate de estar en la carpeta del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host "📂 Directorio: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Método 1: Usar stdin directo con Python
Write-Host "🔄 Cargando datos de prueba..." -ForegroundColor Cyan
Write-Host ""

$pythonScript = @"
exec(open('test_productos_v2.py').read())
"@

$pythonScript | python manage.py shell

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Datos cargados exitosamente!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Error al cargar datos" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎯 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Inicia el servidor:" -ForegroundColor White
Write-Host "    python manage.py runserver" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Accede al admin:" -ForegroundColor White
Write-Host "    http://localhost:8000/admin/" -ForegroundColor Gray
Write-Host "    Usuario: admin@prexcol.com" -ForegroundColor Gray
Write-Host "    Contraseña: admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Prueba los endpoints:" -ForegroundColor White
Write-Host "    http://localhost:8000/api/" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Ver documentación:" -ForegroundColor White
Write-Host "    INICIO_APP_PRODUCTOS.md" -ForegroundColor Gray
Write-Host "    EJEMPLOS_API_PRODUCTOS.md" -ForegroundColor Gray
Write-Host ""
