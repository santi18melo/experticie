@echo off
REM ============================================
REM PREXCOL Simple Start Script - Windows
REM Solo inicia Backend y Frontend (sin Celery)
REM Usage: .\start_simple.bat
REM ============================================

echo ========================================
echo PREXCOL - Simple Start
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

echo [1/4] Activating Virtual Environment...
call .venv\Scripts\activate.bat
echo.

echo [2/4] Installing/Updating Dependencies...
pip install -r requirements.txt --quiet
echo.

echo [3/4] Running Database Migrations...
cd backend
python manage.py migrate
cd ..
echo.

echo [4/4] Starting Services...
echo.
echo Starting Django Backend on http://localhost:8000
start "PREXCOL Backend" cmd /k "call .venv\Scripts\activate.bat && cd backend && python manage.py runserver"
timeout /t 3 /nobreak >nul
echo.

echo Starting React Frontend on http://localhost:5175
cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies (this may take a while)...
    call npm install
)
start "PREXCOL Frontend" cmd /k "npm run dev"
cd ..
echo.

echo Waiting for services to start...
timeout /t 5 /nobreak >nul
echo.

echo Opening browser...
start http://localhost:5175/
echo.

echo ========================================
echo PREXCOL IS RUNNING
echo ========================================
echo Backend:  http://localhost:8000/api/
echo Frontend: http://localhost:5175/
echo.
echo NOTE: This is a simplified version without Celery/Redis.
echo For full functionality, use start_prexcol.bat instead.
echo.
echo To stop, close the terminal windows.
echo.
pause
