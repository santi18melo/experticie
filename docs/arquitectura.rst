Arquitectura del Sistema
========================

Esta sección describe la arquitectura técnica de PREXCOL.

Visión General
--------------

PREXCOL utiliza una arquitectura de aplicación web moderna basada en:

- **Frontend**: Single Page Application (SPA) con React
- **Backend**: API RESTful con Django REST Framework
- **Base de Datos**: PostgreSQL para persistencia
- **Cache**: Redis para optimización de rendimiento
- **Task Queue**: Celery para procesamiento asíncrono

Diagrama de Arquitectura
-------------------------

.. code-block:: text

    ┌─────────────────────────────────────────────────────────────┐
    │                        FRONTEND (React)                      │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
    │  │  Login   │  │Dashboard │  │ Productos│  │ Pedidos  │   │
    │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
    └─────────────────────────┬───────────────────────────────────┘
                              │ HTTP/REST API
                              ↓
    ┌─────────────────────────────────────────────────────────────┐
    │                    BACKEND (Django + DRF)                    │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │              API Layer (ViewSets)                     │  │
    │  │  • AuthViewSet  • ProductoViewSet  • PedidoViewSet   │  │
    │  └──────────────────────────────────────────────────────┘  │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │           Business Logic (Services)                   │  │
    │  │  • Authentication  • Permissions  • Validators       │  │
    │  └──────────────────────────────────────────────────────┘  │
    │  ┌──────────────────────────────────────────────────────┐  │
    │  │              Data Layer (Models)                      │  │
    │  │  • Usuario  • Producto  • Pedido  • Tienda          │  │
    │  └──────────────────────────────────────────────────────┘  │
    └─────────────────────────┬───────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │  PostgreSQL  │  │    Redis     │  │   Celery     │
    │  (Database)  │  │   (Cache)    │  │   (Tasks)    │
    └──────────────┘  └──────────────┘  └──────────────┘

Componentes del Sistema
------------------------

Frontend (React)
~~~~~~~~~~~~~~~~

**Estructura de Carpetas:**

.. code-block:: text

    src/frontend/src/
    ├── components/
    │   ├── common/          # Componentes reutilizables
    │   ├── admin/           # Componentes de administración
    │   ├── proveedor/       # Componentes de proveedor
    │   ├── logistica/       # Componentes de logística
    │   └── cliente/         # Componentes de cliente
    ├── contexts/            # Context API para estado global
    ├── services/            # Servicios de API
    ├── utils/               # Utilidades y helpers
    ├── i18n/                # Internacionalización
    └── styles/              # Estilos CSS

**Tecnologías Clave:**

- React 18 con Hooks
- React Router para navegación
- Context API para gestión de estado
- Axios para peticiones HTTP
- i18next para internacionalización

Backend (Django)
~~~~~~~~~~~~~~~~

**Estructura de Carpetas:**

.. code-block:: text

    src/backend/
    ├── apps/
    │   ├── usuarios/        # Gestión de usuarios
    │   ├── productos/       # Catálogo de productos
    │   ├── pedidos/         # Sistema de pedidos
    │   └── tiendas/         # Gestión de tiendas
    ├── middleware/          # Middleware personalizado
    ├── utils/               # Utilidades compartidas
    ├── settings.py          # Configuración de Django
    ├── urls.py              # Rutas principales
    └── wsgi.py              # WSGI application

**Tecnologías Clave:**

- Django 5.0.4
- Django REST Framework
- Simple JWT para autenticación
- drf-yasg para documentación API
- django-filter para filtrado
- django-cors-headers para CORS

Base de Datos
~~~~~~~~~~~~~

**Modelo de Datos Principal:**

.. code-block:: sql

    -- Usuarios
    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(150) UNIQUE,
        email VARCHAR(254),
        rol VARCHAR(20),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

    -- Productos
    CREATE TABLE productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(200),
        descripcion TEXT,
        precio DECIMAL(10, 2),
        stock INTEGER,
        proveedor_id INTEGER REFERENCES usuarios(id),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

    -- Pedidos
    CREATE TABLE pedidos (
        id SERIAL PRIMARY KEY,
        cliente_id INTEGER REFERENCES usuarios(id),
        estado VARCHAR(20),
        total DECIMAL(10, 2),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

    -- Detalles de Pedido
    CREATE TABLE detalles_pedido (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER REFERENCES pedidos(id),
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER,
        precio_unitario DECIMAL(10, 2),
        subtotal DECIMAL(10, 2)
    );

Flujos de Datos
---------------

Autenticación
~~~~~~~~~~~~~

.. code-block:: text

    1. Usuario envía credenciales → POST /api/auth/login/
    2. Backend valida credenciales
    3. Backend genera tokens JWT (access + refresh)
    4. Frontend almacena tokens en localStorage
    5. Frontend incluye token en headers: Authorization: Bearer <token>
    6. Backend valida token en cada request

Creación de Pedido
~~~~~~~~~~~~~~~~~~

.. code-block:: text

    1. Cliente selecciona productos → Frontend
    2. Cliente confirma pedido → POST /api/pedidos/
    3. Backend valida stock disponible
    4. Backend crea pedido y detalles
    5. Backend actualiza stock de productos
    6. Backend envía notificación (Celery task)
    7. Frontend muestra confirmación

Gestión de Productos (Proveedor)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

    1. Proveedor crea/edita producto → POST/PUT /api/productos/
    2. Backend valida permisos (solo productos propios)
    3. Backend procesa imagen (si existe)
    4. Backend guarda producto en DB
    5. Backend invalida cache
    6. Frontend actualiza lista de productos

Seguridad
---------

Autenticación y Autorización
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- **JWT Tokens**: Access token (15 min) + Refresh token (7 días)
- **Permisos basados en roles**: Admin, Proveedor, Logística, Cliente
- **Validación de permisos**: En cada ViewSet y acción

Protección de Datos
~~~~~~~~~~~~~~~~~~~

- **CORS configurado**: Solo orígenes permitidos
- **Rate Limiting**: Límite de requests por IP
- **Validación de entrada**: Serializers de DRF
- **SQL Injection**: Protección nativa de Django ORM
- **XSS**: Sanitización en frontend y backend

HTTPS y Encriptación
~~~~~~~~~~~~~~~~~~~~

- **Producción**: HTTPS obligatorio
- **Passwords**: Hasheados con PBKDF2
- **Tokens**: Firmados con SECRET_KEY
- **Comunicación**: TLS 1.2+

Escalabilidad
-------------

Estrategias de Cache
~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

    # Cache de vistas
    from django.views.decorators.cache import cache_page

    @cache_page(60 * 15)  # 15 minutos
    def lista_productos(request):
        ...

    # Cache de queries
    from django.core.cache import cache

    productos = cache.get('productos_destacados')
    if not productos:
        productos = Producto.objects.filter(destacado=True)
        cache.set('productos_destacados', productos, 60 * 30)

Optimización de Queries
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

    # Select related para ForeignKey
    pedidos = Pedido.objects.select_related('cliente', 'tienda')

    # Prefetch related para ManyToMany
    pedidos = Pedido.objects.prefetch_related('detalles__producto')

    # Only para campos específicos
    productos = Producto.objects.only('id', 'nombre', 'precio')

Procesamiento Asíncrono
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: python

    # Tareas Celery
    from celery import shared_task

    @shared_task
    def enviar_notificacion_pedido(pedido_id):
        pedido = Pedido.objects.get(id=pedido_id)
        # Enviar email, SMS, etc.
        ...

Monitoreo y Logging
-------------------

Logs Estructurados
~~~~~~~~~~~~~~~~~~

.. code-block:: python

    import logging
    logger = logging.getLogger(__name__)

    logger.info('Pedido creado', extra={
        'pedido_id': pedido.id,
        'cliente_id': pedido.cliente.id,
        'total': pedido.total
    })

Métricas
~~~~~~~~

- Tiempo de respuesta de API
- Tasa de errores
- Uso de cache
- Queries por request
- Usuarios activos

Deployment
----------

Ver :doc:`deployment` para información detallada sobre despliegue en producción.

**Servicios Recomendados:**

- **Backend**: Render, Railway, Heroku
- **Frontend**: Netlify, Vercel, Cloudflare Pages
- **Base de Datos**: Render PostgreSQL, AWS RDS
- **Cache**: Redis Cloud, AWS ElastiCache
- **CDN**: Cloudflare, AWS CloudFront

Próximos Pasos
--------------

- Consulta :doc:`apidocs/index` para ver la API completa
- Lee :doc:`deployment` para desplegar en producción
- Revisa :doc:`guias_usuario` para usar el sistema
