@echo off
REM Script para activar venv y ejecutar Django
REM Uso: runserver.bat

echo Activando entorno virtual...
call .\venv\Scripts\activate.bat

echo.
echo Iniciando servidor Django en http://127.0.0.1:8000
echo Presiona CTRL+C para detener
echo.

python manage.py runserver
