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
    echo Please run setup_backend.bat first.
    pause
    exit /b 1
)

REM Create logs directories
if not exist "logs" mkdir logs
if not exist "logs\backend" mkdir logs\backend
if not exist "logs\frontend" mkdir logs\frontend
if not exist "logs\celery" mkdir logs\celery

echo [1/7] Updating Dependencies...
call .venv\Scripts\activate.bat
echo Installing core dependencies...
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet --no-warn-script-location 2>nul || (
    echo Warning: Some optional packages failed to install. Continuing...
)
echo Dependencies updated successfully.
echo.

echo [2/7] Running Database Migrations...
cd backend
python manage.py migrate
cd ..
echo.

echo [3/7] Starting Django Backend...
start "PREXCOL Backend" cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver > ..\logs\backend\server.log 2>&1"
echo.

echo [4/7] Starting Celery Worker...
start "PREXCOL Celery Worker" cmd /k "call .venv\Scripts\activate.bat && cd backend && celery -A backend worker -l info > ..\logs\celery\worker.log 2>&1"
echo.

echo [5/7] Starting Celery Beat...
start "PREXCOL Celery Beat" cmd /k "call .venv\Scripts\activate.bat && cd backend && celery -A backend beat -l info > ..\logs\celery\beat.log 2>&1"
echo.

echo [6/7] Starting React Frontend...
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Checking for new frontend dependencies...
    call npm install --quiet
)
start "PREXCOL Frontend" cmd /k "npm run dev > ..\logs\frontend\client.log 2>&1"
cd ..
echo.

echo [7/7] Waiting for services to start...
timeout /t 10 /nobreak >nul
echo.

echo Opening Browser...
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
