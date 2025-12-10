@echo off
echo ========================================
echo   PREXCOL - Verificacion de Red
echo ========================================
echo.

echo [1/3] Obteniendo tu IP local...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%a
    goto :found
)
:found
echo Tu IP local es:%IP%
echo.

echo [2/3] URLs de acceso:
echo.
echo Desde esta computadora:
echo   Frontend: http://localhost:5175
echo   Backend:  http://localhost:8000
echo.
echo Desde otros dispositivos (celular, tablet):
echo   Frontend: http:%IP%:5175
echo   Backend:  http:%IP%:8000
echo.

echo [3/3] Verificando configuracion...
echo.
echo Archivo .env configurado: backend\.env
echo Archivo vite.config.js configurado: frontend\vite.config.js
echo.

echo ========================================
echo   SIGUIENTE PASO
echo ========================================
echo.
echo 1. Reinicia AMBOS servidores (backend y frontend)
echo 2. Conecta tu celular al mismo WiFi
echo 3. Abre en el celular: http:%IP%:5175
echo.
echo Presiona cualquier tecla para salir...
pause >nul
