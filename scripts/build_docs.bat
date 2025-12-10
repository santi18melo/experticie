@echo off
REM Script para instalar y generar documentación con Sphinx

echo ========================================
echo PREXCOL - Instalacion de Documentacion
echo ========================================
echo.

REM Verificar que estamos en el entorno virtual
if not exist ".venv\Scripts\activate.bat" (
    echo ERROR: No se encontro el entorno virtual .venv
    echo Por favor ejecuta primero: python -m venv .venv

    exit /b 1
)

echo Activando entorno virtual...
call .venv\Scripts\activate.bat

echo.
echo Instalando dependencias de documentacion...
.venv\Scripts\python.exe -m pip install -r requirements.txt

if errorlevel 1 (
    echo ERROR: Fallo la instalacion de dependencias

    exit /b 1
)

echo.
echo ========================================
echo Generando documentacion...
echo ========================================
echo.

cd docs

REM Limpiar builds anteriores
if exist "_build" (
    echo Limpiando builds anteriores...
    rmdir /s /q _build
)

if exist "apidocs" (
    echo Limpiando documentacion API anterior...
    rmdir /s /q apidocs
)

echo.
echo Construyendo documentacion HTML...
set SPHINXBUILD=..\.venv\Scripts\sphinx-build.exe
call make.bat html

if errorlevel 1 (
    echo.
    echo ERROR: Fallo la construccion de la documentacion
    echo Revisa los errores anteriores
    cd ..

    exit /b 1
)

echo.
echo ========================================
echo Documentacion generada exitosamente!
echo ========================================
echo.
echo La documentacion se encuentra en: docs\_build\html\index.html
echo.
echo Para ver la documentacion, ejecuta:
echo   start docs\_build\html\index.html
echo.

cd ..

:end
echo.
echo Proceso completado.
echo.
echo Proceso completado.

