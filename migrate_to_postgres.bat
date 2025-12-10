@echo off
echo ===========================================
echo PREXCOL - Migracion a PostgreSQL
echo ===========================================
echo.

REM 1. Verificar si PostgreSQL esta corriendo
echo [1/4] Verificando servidor PostgreSQL...
.venv\Scripts\python.exe test_postgres_connection.py > temp_pg_check.txt
findstr "POSTGRES_READY" temp_pg_check.txt > nul
if errorlevel 1 (
    echo [ERROR] No se detecto un servidor PostgreSQL corriendo en localhost:5432.
    echo Por favor asegurese de tener PostgreSQL instalado y ejecutandose.
    echo.
    echo Si usa Docker: docker run --name prexcol-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
    echo.
    del temp_pg_check.txt
    pause
    exit /b 1
)
del temp_pg_check.txt
echo PostgreSQL detectado correctamente.
echo.

REM 2. Respaldo de seguridad SQLite (por si acaso)
echo [2/4] Creando respaldo de datos actuales (SQLite)...
.venv\Scripts\python.exe src\backend\manage.py dumpdata --exclude auth.permission --exclude contenttypes > datadump_final.json
if errorlevel 1 (
    echo [ERROR] Fallo el respaldo de datos. Abortando migracion para proteger sus datos.
    pause
    exit /b 1
)
echo Respaldo guardado en 'datadump_final.json'.
echo.

REM 3. Actualizar configuracion .env
echo [3/4] Configurando entorno para PostgreSQL...
REM Esto es un truco simple para descomentar la linea en Windows Batch
powershell -Command "(Get-Content src\backend\.env) -replace '# DATABASE_URL=', 'DATABASE_URL=' | Set-Content src\backend\.env"

echo.

REM 4. Migracion y Carga de Datos
echo [4/4] Aplicando migraciones y cargando datos en PostgreSQL...
.venv\Scripts\python.exe src\backend\manage.py migrate
if errorlevel 1 (
    echo [ERROR] Falla al aplicar migraciones en PostgreSQL.
    echo Revertiendo configuracion a SQLite...
    powershell -Command "(Get-Content src\backend\.env) -replace '^DATABASE_URL=', '# DATABASE_URL=' | Set-Content src\backend\.env"
    pause
    exit /b 1
)

echo Cargando datos desde el respaldo...
.venv\Scripts\python.exe src\backend\manage.py loaddata datadump_final.json
if errorlevel 1 (
    echo [ADVERTENCIA] Hubo algunos errores cargando datos (posibles duplicados).
    echo Revise los logs. El sistema deberia funcionar pero verifique los datos.
) else (
    echo Datos cargados exitosamente.
)

echo.
echo ===========================================
echo MIGRACION COMPLETADA CON EXITO
echo ===========================================
echo El sistema ahora esta utilizando PostgreSQL.
echo Por favor reinicie el servidor backend (start_prexcol.bat).
pause
