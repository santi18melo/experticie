@echo off
REM ============================================
REM PREXCOL Backend Complete Setup Script
REM ============================================

echo ========================================
echo PREXCOL Backend - Complete Setup
echo ========================================
echo.

REM 1. Activate virtualenv
echo [1/9] Activating virtual environment...
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtualenv
    pause
    exit /b 1
)
echo   OK
echo.

REM 2. Go to backend directory
echo [2/9] Changing to backend directory...
cd backend
echo   OK
echo.

REM 3. Upgrade pip and tools
echo [3/9] Upgrading pip, setuptools, wheel...
python -m pip install --upgrade pip setuptools wheel
if errorlevel 1 (
    echo ERROR: Failed to upgrade pip tools
    cd ..
    pause
    exit /b 1
)
echo   OK
echo.

REM 4. Install dependencies
echo [4/9] Installing dependencies from requirements.txt...
pip install -r ..\requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    cd ..
    pause
    exit /b 1
)
echo   OK
echo.

REM 5. Apply migrations
echo [5/9] Applying database migrations...
python manage.py migrate
if errorlevel 1 (
    echo ERROR: Migrations failed
    cd ..
    pause
    exit /b 1
)
echo   OK
echo.

REM 6. Create superuser
echo [6/9] Creating superuser (admin)...
echo from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin','admin@prexcol.com','Prexcol123!') if not User.objects.filter(email='admin@prexcol.com').exists() else print('Superuser already exists') | python manage.py shell
echo   OK
echo.

REM 7. Collect static files
echo [7/9] Collecting static files...
python manage.py collectstatic --noinput
if errorlevel 1 (
    echo WARNING: Static files collection failed (non-critical)
)
echo   OK
echo.

REM 8. Test JWT tokens
echo [8/9] Testing JWT token generation...
python -c "from rest_framework_simplejwt.tokens import RefreshToken; from django.contrib.auth import get_user_model; user = get_user_model().objects.get(email='admin@prexcol.com'); token = RefreshToken.for_user(user); print('JWT Token generated successfully'); print('Access:', str(token.access_token)[:50] + '...'); print('Refresh:', str(token)[:50] + '...')"
if errorlevel 1 (
    echo WARNING: JWT test failed (check configuration)
)
echo   OK
echo.

echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Superuser credentials:
echo   Username: admin
echo   Email: admin@prexcol.com
echo   Password: Prexcol123!
echo.
echo [9/9] Starting Django development server...
echo Press Ctrl+C to stop the server
echo.
echo Backend will be available at:
echo   http://localhost:8000/
echo   http://localhost:8000/api/
echo   http://localhost:8000/admin/
echo.

REM 9. Start server
python manage.py runserver
