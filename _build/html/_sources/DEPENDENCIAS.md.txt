# Dependencias del Proyecto PREXCOL

## Backend (Python)

### Archivo: `requirements.txt`

#### Framework Principal
- **Django==5.0.4** - Framework web principal
- **djangorestframework==3.15.2** - API REST
- **djangorestframework-simplejwt==5.3.1** - Autenticación JWT

#### Tareas Asíncronas
- **celery==5.4.0** - Sistema de tareas asíncronas
- **celery[redis]==5.4.0** - Integración con Redis
- **redis==5.0.3** - Base de datos en memoria para caché y cola de tareas

#### Utilidades
- **django-cors-headers==4.3.1** - Manejo de CORS
- **python-dotenv==1.0.1** - Variables de entorno
- **psycopg2-binary==2.9.9** - Conector PostgreSQL
- **supervisor==4.2.5** - Gestión de procesos

#### Mejoras y Filtros
- **django-filter==24.3** - Filtrado avanzado de querysets
- **django-ratelimit==4.1.0** - Limitación de tasa de peticiones
- **drf-yasg==1.21.7** - Documentación automática de API (Swagger)

#### Testing
- **pytest==7.4.3** - Framework de testing
- **pytest-django==4.7.0** - Integración pytest con Django
- **pytest-cov==4.1.0** - Cobertura de código
- **flake8==7.0.0** - Linter de código

### Instalación Backend
```bash
# Activar entorno virtual
.venv\Scripts\activate.bat

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
cd backend
python manage.py migrate
```

---

## Frontend (React + Vite)

### Archivo: `frontend/package.json`

#### Dependencias Principales
- **react@^19.2.0** - Biblioteca principal de React
- **react-dom@^19.2.0** - Renderizado de React para web
- **react-router-dom@^7.9.6** - Enrutamiento en React
- **axios@^1.13.2** - Cliente HTTP para peticiones API
- **react-icons@^5.5.0** - Biblioteca de iconos (Font Awesome, Material Design, etc.)

#### Dependencias de Desarrollo
- **vite@^7.2.2** - Build tool y dev server
- **@vitejs/plugin-react@^5.1.0** - Plugin de React para Vite
- **eslint@^9.39.1** - Linter de JavaScript
- **eslint-plugin-react-hooks@^7.0.1** - Reglas ESLint para hooks
- **eslint-plugin-react-refresh@^0.4.24** - Hot reload para React

#### Testing Frontend
- **vitest@^4.0.13** - Framework de testing para Vite
- **@testing-library/react@^16.3.0** - Testing utilities para React
- **@testing-library/jest-dom@^6.9.1** - Matchers personalizados para DOM
- **@playwright/test@^1.57.0** - Testing E2E
- **jsdom@^27.2.0** - Implementación de DOM para Node.js

#### TypeScript Support
- **@types/react@^19.2.2** - Tipos TypeScript para React
- **@types/react-dom@^19.2.2** - Tipos TypeScript para React DOM

### Instalación Frontend
```bash
cd frontend

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build

# Tests
npm test
```

---

## Servicios Externos Requeridos

### Redis
- **Versión recomendada**: 7.x o superior
- **Puerto por defecto**: 6379
- **Uso**: Cola de tareas para Celery, caché

#### Instalación Windows
```bash
# Descargar desde: https://github.com/microsoftarchive/redis/releases
# O usar WSL2 con Redis
```

### PostgreSQL (Opcional)
- **Versión recomendada**: 14.x o superior
- **Puerto por defecto**: 5432
- **Uso**: Base de datos principal (alternativa a SQLite)

---

## Script de Inicio Automático

### `start_prexcol.bat`

Este script automatiza:
1. ✅ Actualización de dependencias Python
2. ✅ Migraciones de base de datos
3. ✅ Inicio del servidor Django
4. ✅ Inicio de Celery Worker
5. ✅ Inicio de Celery Beat
6. ✅ Instalación/actualización de dependencias Node.js
7. ✅ Inicio del servidor de desarrollo Vite

### Uso
```bash
.\start_prexcol.bat
```

---

## Verificación de Dependencias

### Backend
```bash
# Verificar instalación
pip list

# Verificar versiones específicas
pip show django djangorestframework celery
```

### Frontend
```bash
cd frontend

# Verificar instalación
npm list --depth=0

# Verificar dependencias específicas
npm list react react-icons axios
```

---

## Actualización de Dependencias

### Backend
```bash
# Actualizar todas las dependencias
pip install --upgrade -r requirements.txt

# Actualizar una dependencia específica
pip install --upgrade django
```

### Frontend
```bash
cd frontend

# Actualizar todas las dependencias
npm update

# Actualizar una dependencia específica
npm install react-icons@latest

# Verificar dependencias obsoletas
npm outdated
```

---

## Problemas Comunes

### Error: "Module not found"
**Solución Backend:**
```bash
pip install -r requirements.txt
```

**Solución Frontend:**
```bash
cd frontend
npm install
```

### Error: "Failed to resolve import"
**Causa**: Falta una dependencia en `package.json`

**Solución:**
```bash
cd frontend
npm install [nombre-paquete]
```

### Error: Celery no se conecta a Redis
**Solución:**
1. Verificar que Redis esté corriendo
2. Verificar configuración en `backend/settings.py`:
   ```python
   CELERY_BROKER_URL = 'redis://localhost:6379/0'
   ```

---

## Notas Importantes

1. **react-icons** se agregó recientemente para mejorar la UI de las páginas de autenticación
2. Siempre ejecutar `npm install` después de hacer `git pull` si `package.json` cambió
3. El script `start_prexcol.bat` ahora verifica e instala automáticamente nuevas dependencias
4. Para producción, usar `npm run build` en lugar de `npm run dev`

---

**Última actualización**: 2025-12-01
