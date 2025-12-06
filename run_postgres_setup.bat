@echo off
echo ========================================
echo Creando base de datos PostgreSQL para PREXCOL
echo ========================================
echo.
echo Ingresa la contraseña del usuario 'postgres' cuando se te pida.
echo.

"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -f setup_database.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Base de datos creada exitosamente!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo Error al crear la base de datos
    echo ========================================
)

pause
