@echo off
echo ==========================================
echo PREXCOL - Setup Project (Windows)
echo ==========================================

echo [1/3] Installing Backend Dependencies...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing backend dependencies.
    pause
    exit /b %errorlevel%
)

echo [2/3] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies.
    cd ..
    pause
    exit /b %errorlevel%
)
cd ..

echo [3/3] Setup Complete!
echo You can now run the project using start_system.bat
pause
