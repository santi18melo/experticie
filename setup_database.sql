-- Script para crear la base de datos y usuario de PREXCOL
-- Ejecutar con: psql -U postgres -f setup_database.sql

-- Crear el usuario
CREATE USER prexcol_user WITH PASSWORD 'prexcol_password';

-- Crear la base de datos
CREATE DATABASE prexcol_db OWNER prexcol_user;

-- Configurar permisos
ALTER ROLE prexcol_user SET client_encoding TO 'utf8';
ALTER ROLE prexcol_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE prexcol_user SET timezone TO 'America/Bogota';

-- Dar todos los privilegios
GRANT ALL PRIVILEGES ON DATABASE prexcol_db TO prexcol_user;

-- Conectar a la base de datos y dar permisos en el schema public
\c prexcol_db
GRANT ALL ON SCHEMA public TO prexcol_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO prexcol_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO prexcol_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO prexcol_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO prexcol_user;

-- Mensaje de confirmación
\echo 'Base de datos prexcol_db creada exitosamente!'
\echo 'Usuario: prexcol_user'
\echo 'Puedes conectarte con: psql -U prexcol_user -d prexcol_db'
