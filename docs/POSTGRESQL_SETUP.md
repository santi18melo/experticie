# 🐘 Guía de Configuración de PostgreSQL para PREXCOL

## 📋 Requisitos previos

- PostgreSQL 14 o superior instalado
- Python 3.11+ con el virtualenv activado
- Dependencias actualizadas (`psycopg2-binary` ya incluido en `requirements.txt`)

---

## 1️⃣ Instalación de PostgreSQL en Windows

### Opción A: Instalador oficial (recomendado)

1. Descarga PostgreSQL desde: https://www.postgresql.org/download/windows/
2. Ejecuta el instalador y sigue el asistente
3. **Importante:** Anota la contraseña que definas para el usuario `postgres`
4. Asegúrate de instalar pgAdmin 4 (interfaz gráfica)

### Opción B: Usando Chocolatey

```powershell
choco install postgresql
```

---

## 2️⃣ Crear la base de datos y el usuario

### Opción 1: Usando pgAdmin 4 (interfaz gráfica)

1. Abre **pgAdmin 4**
2. Conéctate al servidor local (usa la contraseña de instalación)
3. Click derecho en **Databases** → **Create** → **Database...**
   - **Database name:** `prexcol_db`
   - **Owner:** postgres (por ahora)
   - Click en **Save**

4. Click derecho en **Login/Group Roles** → **Create** → **Login/Group Role...**
   - **General tab - Name:** `prexcol_user`
   - **Definition tab - Password:** `prexcol_password` (o el que prefieras)
   - **Privileges tab:**
     - ✅ Can login
     - ✅ Create databases
   - Click en **Save**

5. Click derecho en la base de datos `prexcol_db` → **Properties**
   - **General tab - Owner:** selecciona `prexcol_user`
   - Click en **Save**

### Opción 2: Usando la línea de comandos (psql)

```powershell
# Abre PowerShell como administrador y ejecuta:

# 1. Conectarse como postgres
psql -U postgres

# 2. Dentro de psql, ejecuta:
CREATE DATABASE prexcol_db;
CREATE USER prexcol_user WITH PASSWORD 'prexcol_password';
ALTER ROLE prexcol_user SET client_encoding TO 'utf8';
ALTER ROLE prexcol_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE prexcol_user SET timezone TO 'America/Bogota';
GRANT ALL PRIVILEGES ON DATABASE prexcol_db TO prexcol_user;
ALTER DATABASE prexcol_db OWNER TO prexcol_user;

# 3. Salir de psql
\q
```

---

## 3️⃣ Configurar las variables de entorno

### Copiar el archivo de ejemplo

```powershell
cd C:\experticie-3\backend
copy .env.example .env
```

### Editar el archivo `.env`

Abre `backend\.env` con tu editor y **descomenta** una de estas opciones:

#### Opción 1: Usando DATABASE_URL (recomendado)

```env
DATABASE_URL=postgresql://prexcol_user:prexcol_password@localhost:5432/prexcol_db
```

#### Opción 2: Usando variables separadas

```env
POSTGRES_DB=prexcol_db
POSTGRES_USER=prexcol_user
POSTGRES_PASSWORD=prexcol_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

---

## 4️⃣ Migrar los datos de SQLite a PostgreSQL (opcional)

Si ya tienes datos en SQLite que quieres conservar:

```powershell
# Activar el virtualenv
& .\.venv\Scripts\Activate.ps1

# 1. Exportar los datos de SQLite
python backend/manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 2 > backup_data.json

# 2. Configurar PostgreSQL en .env (como en el paso 3)

# 3. Ejecutar las migraciones en PostgreSQL
python backend/manage.py migrate

# 4. Cargar los datos exportados
python backend/manage.py loaddata backup_data.json
```

---

## 5️⃣ Ejecutar las migraciones en PostgreSQL

```powershell
# Activar el virtualenv (si no lo está)
& .\.venv\Scripts\Activate.ps1

# Ejecutar migraciones
python backend/manage.py migrate

# Crear un superusuario
python backend/manage.py createsuperuser
```

---

## 6️⃣ Verificar la conexión

```powershell
python backend/manage.py shell
```

Dentro del shell de Django:

```python
from django.db import connection
print(connection.settings_dict)
# Deberías ver 'ENGINE': 'django.db.backends.postgresql'
exit()
```

---

## 7️⃣ Arrancar el servidor

```powershell
.\start_prexcol.bat
```

---

## 🔧 Solución de problemas

### Error: "password authentication failed for user"

- Verifica que la contraseña en `.env` coincida con la que configuraste en PostgreSQL
- Intenta conectarte manualmente: `psql -U prexcol_user -d prexcol_db -h localhost`

### Error: "database does not exist"

- Verifica que creaste la base de datos `prexcol_db`
- Lista las bases de datos: `psql -U postgres -l`

### Error: "could not connect to server"

- Verifica que el servicio de PostgreSQL esté corriendo:
  ```powershell
  Get-Service -Name postgresql*
  ```
- Si no está corriendo, inícialo:
  ```powershell
  Start-Service -Name "postgresql-x64-14"  # El número puede variar según tu versión
  ```

### Error: "relation does not exist"

- Ejecuta las migraciones: `python backend/manage.py migrate`

---

## ✅ Ventajas de PostgreSQL vs SQLite

| Característica | SQLite | PostgreSQL |
|----------------|--------|------------|
| **Concurrencia** | ❌ Limitada (escrituras bloqueantes) | ✅ Excelente (MVCC) |
| **Producción** | ❌ No recomendado | ✅ Ideal |
| **Tipos de datos** | ❌ Básicos | ✅ Avanzados (JSON, Arrays, UUID) |
| **Full-text search** | ❌ Limitado | ✅ Potente |
| **Escalabilidad** | ❌ Solo para apps pequeñas | ✅ Millones de registros |
| **Seguridad** | ❌ Sin autenticación | ✅ Roles y permisos |

---

## 📦 Para Render (producción)

Render creará automáticamente una base de datos PostgreSQL y configurará la variable `DATABASE_URL`.

**No necesitas hacer nada adicional**, solo asegúrate de que `psycopg2-binary` esté en `requirements.txt` (ya lo está ✅).

---

**¡Listo! Ahora tienes PostgreSQL configurado en tu entorno de desarrollo.** 🎉
