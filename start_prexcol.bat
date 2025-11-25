@echo off
REM ============================================
REM PREXCOL Quick Start Script - Windows
REM ============================================

echo ========================================
echo PREXCOL - Quick Start Script
echo ========================================
echo.

REM Check if .venv exists
if not exist ".venv" (
    echo [ERROR] Virtual environment not found.
    echo Please run setup_server.sh or install manually.
    pause
    exit /b 1
)

REM Create logs directories
if not exist "logs" mkdir logs
if not exist "logs\backend" mkdir logs\backend
if not exist "logs\frontend" mkdir logs\frontend

echo [1/4] Starting Django Backend...
REM Start Backend in a new window
start "PREXCOL Backend" cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver > ..\logs\backend\server.log 2>&1"

echo [2/4] Starting React Frontend...
REM Start Frontend in a new window
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)
start "PREXCOL Frontend" cmd /k "npm run dev > ..\logs\frontend\client.log 2>&1"
cd ..

echo [3/4] Waiting for services to start...
timeout /t 5 /nobreak >nul

echo [4/4] Opening Browser...
start http://localhost:5173/

echo.
echo ========================================
echo PREXCOL IS RUNNING
echo ========================================
echo Backend:  http://localhost:8000/api/
echo Frontend: http://localhost:5173/
echo.
echo Logs are being written to logs/ directory.
echo To stop, close the opened terminal windows.
echo.
pause
