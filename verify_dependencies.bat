@echo off
REM ============================================
REM PREXCOL - Dependency Verification Script
REM Verifica que todas las dependencias estén instaladas
REM ============================================

echo ========================================
echo PREXCOL - Verificacion de Dependencias
echo ========================================
echo.

REM Verificar entorno virtual
echo [1/4] Verificando entorno virtual Python...
if not exist ".venv" (
    echo [ERROR] Entorno virtual no encontrado.
    echo Por favor ejecuta: python -m venv .venv
    pause
    exit /b 1
)
echo [OK] Entorno virtual encontrado.
echo.

REM Verificar dependencias Python
echo [2/4] Verificando dependencias Python...
call .venv\Scripts\activate.bat
pip list | findstr /i "Django djangorestframework celery redis" >nul
if errorlevel 1 (
    echo [WARNING] Algunas dependencias Python pueden faltar.
    echo Instalando dependencias...
    pip install -r requirements.txt
) else (
    echo [OK] Dependencias Python principales instaladas.
)
echo.

REM Verificar Node.js
echo [3/4] Verificando Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js no encontrado.
    echo Por favor instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo [OK] Node.js instalado.
echo.

REM Verificar dependencias Frontend
echo [4/4] Verificando dependencias Frontend...
cd frontend
if not exist "node_modules" (
    echo [WARNING] node_modules no encontrado.
    echo Instalando dependencias...
    call npm install
) else (
    echo Verificando react-icons...
    npm list react-icons --depth=0 >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] react-icons no encontrado. Instalando...
        call npm install react-icons
    ) else (
        echo [OK] react-icons instalado.
    )
    
    echo Verificando otras dependencias principales...
    npm list react react-dom axios react-router-dom --depth=0 >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Algunas dependencias pueden faltar. Reinstalando...
        call npm install
    ) else (
        echo [OK] Dependencias principales instaladas.
    )
)
cd ..
echo.

REM Verificar Redis (opcional)
echo [OPCIONAL] Verificando Redis...
redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Redis no está corriendo o no está instalado.
    echo Celery requiere Redis para funcionar.
    echo Puedes continuar sin Redis, pero las tareas asíncronas no funcionarán.
) else (
    echo [OK] Redis está corriendo.
)
echo.

echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
echo Resumen:
echo - Entorno virtual: OK
echo - Dependencias Python: Verificadas
echo - Node.js: OK
echo - Dependencias Frontend: Verificadas
echo.
echo Puedes iniciar el proyecto con: .\start_prexcol.bat
echo.
pause
