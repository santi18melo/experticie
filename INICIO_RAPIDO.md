# 🚀 GUÍA DE INICIO RÁPIDO - PREXCOL

## ✅ VERIFICACIÓN PREVIA

Antes de comenzar, asegúrate de tener instalado:
- Python 3.8+
- Node.js 16+
- PostgreSQL (opcional, usa SQLite por defecto)

## 📦 INSTALACIÓN

### 1. Backend (Django)

```bash
# Navegar al directorio backend
cd src/backend

# Crear entorno virtual (si no existe)
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r ../../requirements.txt

# Instalar psutil para métricas del sistema
pip install psutil

# Aplicar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# O usar script de usuarios de prueba
python scripts/create_complete_test_users.py
```

### 2. Frontend (React + Vite)

```bash
# Navegar al directorio frontend
cd src/frontend

# Instalar dependencias
npm install

# Verificar que todo esté instalado
npm list react react-dom react-router-dom axios
```

## 🏃 EJECUTAR EL PROYECTO

### Opción 1: Script Automático (Recomendado)

```bash
# Desde la raíz del proyecto
.\start_prexcol.bat
```

Este script inicia automáticamente:
- ✅ Backend en puerto 8000
- ✅ Frontend en puerto 5175

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd src/backend
python manage.py runserver 8000
```

**Terminal 2 - Frontend:**
```bash
cd src/frontend
npm run dev
```

## 🔐 CREDENCIALES DE PRUEBA

| Rol | Email | Password |
|-----|-------|----------|
| **Admin** | admin@prexcol.com | Admin123! |
| **Proveedor** | proveedor@prexcol.com | Proveedor123! |
| **Logística** | logistica@prexcol.com | Logistica123! |
| **Cliente** | cliente@prexcol.com | Cliente123! |

## 🎯 ACCESO AL SISTEMA

1. **Frontend**: http://localhost:5175
2. **Backend API**: http://localhost:8000/api
3. **Admin Django**: http://localhost:8000/admin
4. **API Docs (Swagger)**: http://localhost:8000/swagger

## 🧪 VERIFICAR QUE TODO FUNCIONA

```bash
# Ejecutar script de verificación
python src/backend/scripts/verify_system.py
```

Este script verifica:
- ✅ Conexión a base de datos
- ✅ Servidor backend activo
- ✅ Endpoints API funcionando
- ✅ Archivos críticos presentes
- ✅ Frontend activo

## 🔍 PROBAR FUNCIONALIDADES NUEVAS

### 1. Monitor de Métricas en Tiempo Real

1. Inicia sesión como **admin@prexcol.com**
2. Ve al Dashboard Admin
3. Haz clic en la gráfica de "Actividad Reciente"
4. Explora las 3 pestañas: Ventas, Usuarios, Plataforma
5. Prueba los diferentes rangos de tiempo

### 2. Sistema de Temas

1. Inicia sesión con cualquier usuario
2. Ve a **Configuración** (icono de usuario → Configuración)
3. Cambia entre tema Claro y Oscuro
4. El cambio se aplica instantáneamente

### 3. Cambio de Idioma

1. En el header, usa el selector de idioma
2. Cambia entre Español e Inglés
3. Las traducciones se actualizan en tiempo real

### 4. Desactivación de Cuenta

1. Ve a **Configuración**
2. Scroll hasta "Zona de Peligro"
3. Haz clic en "Desactivar Cuenta"
4. Confirma la acción
5. Recibirás un email de confirmación (revisa consola del backend)

## 🛠️ COMANDOS ÚTILES

### Backend

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar tests
python manage.py test

# Ejecutar tests específicos
python manage.py test tests.test_metrics_and_accounts

# Verificar sistema
python scripts/verify_system.py

# Crear usuarios de prueba
python scripts/create_complete_test_users.py
```

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 📊 COMPONENTES DISPONIBLES

### Componentes Comunes

```jsx
import { 
  LoadingSpinner,
  Toast,
  ConfirmDialog,
  DataTable,
  StatsCard
} from '@/components/common';

// Loading
<LoadingSpinner size="medium" message="Cargando..." />

// Toast
const { showSuccess, showError } = useToast();
showSuccess('¡Operación exitosa!');

// Confirm Dialog
const { showConfirm } = useConfirmDialog();
const confirmed = await showConfirm({
  title: '¿Confirmar?',
  message: 'Esta acción no se puede deshacer',
  type: 'danger'
});

// Data Table
<DataTable
  data={users}
  columns={columns}
  pageSize={10}
  sortable
  filterable
/>

// Stats Card
<StatsCard
  title="Total Usuarios"
  value={150}
  icon="👥"
  trend="up"
  trendValue="+12%"
  color="#3b82f6"
/>
```

## 🐛 SOLUCIÓN DE PROBLEMAS

### Backend no inicia

```bash
# Verificar puerto 8000 no esté en uso
netstat -ano | findstr :8000

# Matar proceso si es necesario
taskkill /PID <PID> /F

# Verificar migraciones
python manage.py showmigrations

# Aplicar migraciones pendientes
python manage.py migrate
```

### Frontend no inicia

```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Verificar puerto 5175
netstat -ano | findstr :5175
```

### Error de CORS

Verifica que en `src/backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5175",
    "http://127.0.0.1:5175",
]
```

### Error de importación en Python

```bash
# Activar entorno virtual
venv\Scripts\activate

# Reinstalar dependencias
pip install -r requirements.txt
```

## 📚 DOCUMENTACIÓN ADICIONAL

- **Métricas en Tiempo Real**: `docs/features/LIVE_METRICS.md`
- **Temas y Configuración**: `docs/features/THEME_AND_SETTINGS.md`
- **Resumen Completo**: `docs/RESUMEN_MEJORAS_COMPLETO.md`
- **Diagramas**: `docs/diagramas/`

## 🎓 PRÓXIMOS PASOS

1. ✅ Explora el Dashboard Admin
2. ✅ Prueba el Monitor de Métricas
3. ✅ Cambia temas e idiomas
4. ✅ Revisa la documentación
5. ✅ Ejecuta los tests
6. ✅ Personaliza según tus necesidades

## 💡 TIPS

- Usa **Ctrl+Shift+I** para abrir DevTools y ver logs
- El backend muestra logs detallados en consola
- Los emails se muestran en consola (modo desarrollo)
- Usa el script de verificación regularmente
- Revisa `docs/` para documentación completa

## 📞 SOPORTE

Si encuentras algún problema:
1. Revisa los logs del backend y frontend
2. Ejecuta `python scripts/verify_system.py`
3. Consulta la documentación en `docs/`
4. Revisa los tests para ejemplos de uso

---

**¡Listo para empezar! 🚀**

*Última actualización: 2025-12-09*
