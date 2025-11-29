@echo off
REM ============================================
REM PREXCOL Quick Start Script - Windows
REM Usage: .\start_prexcol.bat
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
if not exist "logs\celery" mkdir logs\celery

echo [1/6] Updating Dependencies & Database...
call .venv\Scripts\activate.bat
pip install -r requirements.txt
cd backend
python manage.py migrate
cd ..

echo [2/6] Starting Django Backend...
start "PREXCOL Backend" cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver > ..\logs\backend\server.log 2>&1"

echo [3/6] Starting Celery Worker...
start "PREXCOL Celery Worker" cmd /k "call .venv\Scripts\activate.bat && cd backend && celery -A backend worker -l info > ..\logs\celery\worker.log 2>&1"

echo [4/6] Starting Celery Beat...
start "PREXCOL Celery Beat" cmd /k "call .venv\Scripts\activate.bat && cd backend && celery -A backend beat -l info > ..\logs\celery\beat.log 2>&1"

echo [5/6] Starting React Frontend...
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)
start "PREXCOL Frontend" cmd /k "npm run dev > ..\logs\frontend\client.log 2>&1"
cd ..

echo [6/6] Waiting for services to start...
timeout /t 10 /nobreak >nul

echo [7/6] Opening Browser...
start http://localhost:5175/

echo.
echo ========================================
echo PREXCOL IS RUNNING
echo ========================================
echo Backend:  http://localhost:8000/api/
echo Frontend: http://localhost:5175/
echo.
echo IMPORTANT: Ensure Redis is running for Celery to work!
echo If you see "Token invalid" errors, please log out and log in again.
echo.
echo Logs are being written to logs/ directory.
echo To stop, close the opened terminal windows.
echo.
pause
