@echo off
REM ============================================
REM PREXCOL Quick Start & Verification Script
REM Windows - Complete System Startup
REM ============================================

echo ================================================
echo PREXCOL - Complete System Startup
echo ================================================
echo.

REM Step 1: Check Python
echo [1/8] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    pause
    exit /b 1
)
echo   Python OK
echo.

REM Step 2: Check/Create Virtual Environment
echo [2/8] Checking virtual environment...
if not exist ".venv" (
    echo   Creating virtual environment...
    python -m venv .venv
)
echo   Virtual environment OK
echo.

REM Step 3: Activate venv and install backend dependencies
echo [3/8] Installing backend dependencies...
call .venv\Scripts\activate.bat
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo   Dependencies installed
echo.

REM Step 4: Run migrations
echo [4/8] Running database migrations...
cd backend
python manage.py migrate --noinput
if errorlevel 1 (
    echo ERROR: Migrations failed
    cd ..
    pause
    exit /b 1
)
cd ..
echo   Migrations complete
echo.

REM Step 5: Create superuser if needed (non-interactive)
echo [5/8] Checking Django setup...
cd backend
python manage.py check
cd ..
echo   Django OK
echo.

REM Step 6: Install frontend dependencies
echo [6/8] Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
)
cd ..
echo   Frontend dependencies OK
echo.

REM Step 7: Check ports
echo [7/8] Checking ports...
netstat -ano | findstr ":8000" >nul
if not errorlevel 1 (
    echo   WARNING: Port 8000 appears to be in use
)

netstat -ano | findstr ":5173" >nul
if not errorlevel 1 (
    echo   WARNING: Port 5173 appears to be in use
    echo   Attempting to free port...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
)
echo   Ports checked
echo.

REM Step 8: Start services
echo [8/8] Starting services...
echo.
echo   Starting Backend (Django)...
start "PREXCOL Backend" cmd /k "cd /d %CD%\backend && ..\. venv\Scripts\activate.bat && python manage.py runserver"

timeout /t 5 /nobreak >nul

echo   Starting Frontend (React)...
start "PREXCOL Frontend" cmd /k "cd /d %CD%\frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo PREXCOL SYSTEM STARTED
echo ================================================
echo.
echo BACKEND:  http://localhost:8000/api/
echo FRONTEND: http://localhost:5173/
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:5173/
echo.
echo To stop: Close console windows or press Ctrl+C
echo.
pause
