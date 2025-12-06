@echo off
echo ========================================
echo Iniciando PostgreSQL Server
echo ========================================
echo.

REM Intentar varios nombres posibles del servicio
net start postgresql-x64-18 2>nul
if %errorlevel% equ 0 goto success

net start postgresql-18 2>nul
if %errorlevel% equ 0 goto success

net start PostgreSQL 2>nul
if %errorlevel% equ 0 goto success

echo.
echo ========================================
echo No se pudo iniciar automaticamente
echo ========================================
echo.
echo Por favor, inicia PostgreSQL manualmente:
echo 1. Presiona Win + R
echo 2. Escribe: services.msc
echo 3. Busca el servicio que empiece con "postgresql"
echo 4. Click derecho -^> Iniciar
echo.
pause
exit /b 1

:success
echo.
echo ========================================
echo PostgreSQL iniciado exitosamente!
echo ========================================
echo.
pause
