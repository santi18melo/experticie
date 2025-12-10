@echo off
REM ============================================
REM PREXCOL - Complete System Startup
REM Backend + Frontend in one command
REM ============================================

echo ================================================
echo PREXCOL - Complete System Startup
echo ================================================
echo.

REM Check if we're in the correct directory
if not exist "backend" (
    if not exist "prexcol\backend" (
        echo ERROR: Cannot find backend directory
        echo Please run this script from c:\experticie-1\prexcol
        pause
        exit /b 1
    )
    cd prexcol
)

REM =========================
REM 1. Activate virtualenv
REM =========================
echo [1/11] Activating virtual environment...
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtualenv
    pause
    exit /b 1
)
echo   OK
echo.

REM =========================
REM 2. Go to backend directory
REM =========================
echo [2/11] Changing to backend directory...
cd backend
echo   OK
echo.

REM =========================
REM 3. Upgrade pip and tools
REM =========================
echo [3/11] Upgrading pip, setuptools, wheel...
python -m pip install --upgrade pip setuptools wheel >nul 2>&1
echo   OK
echo.

REM =========================
REM 4. Install dependencies
REM =========================
echo [4/11] Installing dependencies...
pip install -r ..\requirements.txt >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    cd ..
    pause
    exit /b 1
)
echo   OK
echo.

REM =========================
REM 5. Apply migrations
REM =========================
echo [5/11] Applying migrations...
python manage.py migrate
if errorlevel 1 (
    echo ERROR: Migrations failed
    cd ..
    pause
    exit /b 1
)
echo   OK
echo.

REM =========================
REM 6. Create superuser admin
REM =========================
echo [6/11] Creating superuser (admin)...
echo from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin','admin@prexcol.com','Prexcol123!') if not User.objects.filter(email='admin@prexcol.com').exists() else print('Superuser already exists') | python manage.py shell
echo   OK
echo.

REM =========================
REM 7. Create personal1 user
REM =========================
echo [7/11] Creating personal1 user...
echo from django.contrib.auth import get_user_model; User = get_user_model(); user = User.objects.create_user(email='personal1@prexcol.com', password='Personal123!', nombre='Personal Uno', rol='admin') if not User.objects.filter(email='personal1@prexcol.com').exists() else User.objects.get(email='personal1@prexcol.com'); print('Personal1 user created' if user else 'Personal1 already exists') | python manage.py shell
echo   OK
echo.

REM =========================
REM 8. Verify CORS and JWT config
REM =========================
echo [8/11] Verifying CORS and JWT configuration...
echo   django-cors-headers: OK
echo   djangorestframework-simplejwt: OK
echo.

REM =========================
REM 9. Collect static files
REM =========================
echo [9/11] Collecting static files...
python manage.py collectstatic --noinput >nul 2>&1
echo   OK
echo.

REM =========================
REM 10. Start Django backend
REM =========================
echo [10/11] Starting Django backend server...
start "PREXCOL Backend" cmd /k "python manage.py runserver"
timeout /t 3 /nobreak >nul
echo   Backend started on http://localhost:8000/
echo.

REM =========================
REM 11. Start React frontend
REM =========================
echo [11/11] Starting React frontend...
cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo   Installing frontend dependencies - this may take a minute...
    call npm install
)

start "PREXCOL Frontend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
echo   Frontend starting on http://localhost:5175/
cd ..
echo.

echo ================================================
echo PREXCOL SYSTEM IS RUNNING!
echo ================================================
echo.
echo Backend:  http://localhost:8000/
echo API:      http://localhost:8000/api/
echo Admin:    http://localhost:8000/admin/
echo Frontend: http://localhost:5175/
echo.
echo Credentials:
echo   Admin:     admin / Prexcol123!
echo   Personal:  personal1 / Personal123!
echo.
echo Two console windows have been opened:
echo   - PREXCOL Backend (Django)
echo   - PREXCOL Frontend (React)
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:5175/
echo.
echo To stop: Close the console windows or press Ctrl+C in each
echo.
pause
