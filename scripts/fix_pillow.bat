@echo off
REM ============================================
REM Fix Pillow Installation - PREXCOL
REM ============================================

echo ========================================
echo Fixing Pillow Installation
echo ========================================
echo.

REM Activate virtual environment
call .venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip
echo.

echo Attempting to install Pillow...
echo.

REM Try installing Pillow with different methods
echo Method 1: Installing pre-built wheel...
pip install --upgrade Pillow --prefer-binary
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS: Pillow installed successfully!
    goto :success
)

echo.
echo Method 1 failed. Trying Method 2...
echo Method 2: Installing specific version...
pip install Pillow==10.0.0 --prefer-binary
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS: Pillow installed successfully!
    goto :success
)

echo.
echo Method 2 failed. Trying Method 3...
echo Method 3: Installing from PyPI with no cache...
pip install --no-cache-dir Pillow --prefer-binary
if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS: Pillow installed successfully!
    goto :success
)

echo.
echo All methods failed. Pillow installation requires build tools.
echo.
echo SOLUTION: The system can work without Pillow if you don't need image processing.
echo If you need Pillow, install Microsoft C++ Build Tools from:
echo https://visualstudio.microsoft.com/visual-cpp-build-tools/
echo.
goto :end

:success
echo.
echo ========================================
echo Pillow is now installed!
echo ========================================
echo.
echo Verifying installation...
python -c "from PIL import Image; print('Pillow version:', Image.__version__)"
echo.

:end
pause
