# Manual Técnico - PREXCOL

## 1. Arquitectura del Sistema

El sistema ha sido refactorizado para seguir una arquitectura modular y profesional, separando claramente el backend y el frontend dentro de una estructura `src/`.

### Estructura de Directorios
```
src/
├── backend/            # Aplicación Django (API REST)
│   ├── apps/           # Módulos de negocio (usuarios, productos, ventas, etc.)
│   ├── middleware/     # Middleware personalizado (Observabilidad)
│   ├── views/          # Vistas API (incluyendo Maps y Metrics)
│   └── settings.py     # Configuración centralizada
├── frontend/           # Aplicación React (Vite)
│   ├── src/
│   │   ├── components/ # Componentes (Atomic Design en common/)
│   │   ├── pages/      # Vistas principales
│   │   └── styles/     # Sistema de diseño (variables.css)
├── config/             # Configuraciones transversales
├── services/           # Capa de Servicios y Adaptadores
│   ├── database.py     # DatabaseAdapter (Facade para DB)
│   ├── celery_service.py # TaskQueueService (Facade para Celery)
│   └── observability.py # MetricsCollector y Logging
└── adapters/           # Adaptadores para integración externa
```

### Patrones de Diseño
- **Facade/Adapter**: Utilizados en `src/services/` para aislar la lógica de conexión a base de datos y cola de tareas (Celery), mejorando la estabilidad y facilitando pruebas.
- **Atomic Design**: Implementado en el frontend (`src/frontend/src/components/common/`) para estandarizar Botones, Tarjetas, Inputs y Tipografía.

## 2. Despliegue y Hosting (Render)

La aplicación está configurada para desplegarse en Render utilizando Infraestructura como Código (IaC).

### Archivos de Configuración
- **`render.yaml`**: Define los servicios:
    - `prexcol-backend`: Servicio Web Python (Gunicorn).
    - `prexcol-frontend`: Sitio Estático (React/Vite).
    - `prexcol-db`: Base de datos PostgreSQL.
    - `prexcol-redis`: Redis para Celery (Cola de tareas).
- **`Procfile`**: Define los comandos de inicio:
    - `web`: `cd src/backend && gunicorn ...`
    - `worker`: `cd src/backend && celery ...`

### Variables de Entorno Críticas
| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Conexión a PostgreSQL (Auto-inyectada por Render). |
| `CELERY_BROKER_URL` | URL de Redis para Celery. |
| `VITE_API_URL` | URL del backend para el frontend. |
| `VITE_MAP_TILE_LAYER` | URL de los tiles del mapa (OpenStreetMap por defecto). |
| `DJANGO_SETTINGS_MODULE`| Debe ser `backend.settings` o `settings` según el contexto. |

## 3. Observabilidad y Monitoreo

El sistema implementa un estándar de observabilidad nivel Google SRE.

### Logging Estructurado
Todos los logs se emiten en formato JSON incluyendo:
- `trace_id`: Identificador único por request (`X-Request-ID`).
- `user_id`: Usuario autenticado.
- `latency_ms`: Tiempo de respuesta.
- `level`: Nivel de severidad (INFO, ERROR).

### Métricas (SLIs)
El endpoint `/api/metrics/` expone indicadores clave de rendimiento (SLIs):
- **Tasa de Éxito**: Porcentaje de peticiones HTTP 200/201.
- **Latencia**: Tiempo promedio de respuesta por endpoint.
- **Conteo de Peticiones**: Tráfico total.

### Verificación
Para verificar la salud del sistema, ejecutar:
```bash
python verify_observability.py
python verify_map.py
```

## 4. Documentación de API y Admin

### Django Admin
El panel de administración se encuentra en `/admin/`. Se ha optimizado para:
- Mostrar fotos de perfil de usuarios.
- Visualizar permisos (Staff/Superusuario) mediante badges.
- Gestión de inventario automatizado mediante acciones.

**Nota Técnica:** Se ha deshabilitado `drf-yasg` debido a incompatibilidades con Django 5.0.4 que causaban errores (`AttributeError`) al acceder al panel de administración. Se recomienda utilizar la API navegable de DRF o migrar a `drf-spectacular` en el futuro.
