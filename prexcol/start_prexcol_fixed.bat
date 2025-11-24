@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo ========================================
echo PREXCOL - Quick Start Fixed Script
echo ========================================

:: ---- Paths ----
SET BACKEND_DIR=%CD%\backend
SET FRONTEND_DIR=%CD%\frontend
SET LOGS_DIR=%CD%\logs
SET VENV_DIR=%CD%\scripts


:: ---- Crear directorios de logs ----
IF NOT EXIST "%LOGS_DIR%\backend" mkdir "%LOGS_DIR%\backend"
IF NOT EXIST "%LOGS_DIR%\frontend" mkdir "%LOGS_DIR%\frontend"

:: ---- Arrancar Backend ----
echo [1/3] Starting Django Backend...
IF EXIST "%VENV_DIR%\activate.bat" (
    call "%VENV_DIR%\activate.bat"
    cd "%BACKEND_DIR%"
    start "Django Backend" cmd /k "python manage.py runserver > \"%LOGS_DIR%\backend\backend.log\" 2>&1"
) ELSE (
    echo ERROR: No se encuentra el entorno virtual en %VENV_DIR%
)

:: ---- Arrancar Frontend ----
echo [2/3] Starting React Frontend...
IF EXIST "%FRONTEND_DIR%\package.json" (
    cd "%FRONTEND_DIR%"
    npm install
    start "React Frontend" cmd /k "npm run dev > \"%LOGS_DIR%\frontend\frontend.log\" 2>&1"
) ELSE (
    echo ERROR: No se encontró package.json en %FRONTEND_DIR%
)

:: ---- Abrir navegador ----
timeout /t 5
start http://localhost:5173/

echo ========================================
echo PREXCOL Quick Start Fixed Script ejecutado
echo Backend + Frontend + Browser listos
echo Revisar TESTING_GUIDE.md para flujo completo
echo Logs guardados en logs\backend y logs\frontend
echo ========================================
pause
