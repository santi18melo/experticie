Introducción
============

PREXCOL es un sistema de gestión empresarial diseñado para facilitar la administración de productos, pedidos y logística.

Objetivos del Sistema
---------------------

El sistema PREXCOL tiene como objetivos principales:

1. **Gestión eficiente de productos**: Catálogo completo con categorías, precios y disponibilidad
2. **Control de pedidos**: Seguimiento completo del ciclo de vida de cada pedido
3. **Administración de usuarios**: Sistema de roles y permisos granular
4. **Logística integrada**: Gestión de entregas y seguimiento en tiempo real
5. **Reportes y métricas**: Dashboard con indicadores clave de rendimiento

Tecnologías Utilizadas
----------------------

Backend
~~~~~~~

- **Django 5.0.4**: Framework web principal
- **Django REST Framework**: API RESTful
- **PostgreSQL**: Base de datos relacional
- **Redis**: Cache y message broker
- **Celery**: Procesamiento asíncrono de tareas
- **JWT**: Autenticación basada en tokens

Frontend
~~~~~~~~

- **React 18**: Biblioteca de interfaz de usuario
- **React Router**: Navegación SPA
- **Axios**: Cliente HTTP
- **i18next**: Internacionalización
- **CSS Variables**: Sistema de diseño moderno

Infraestructura
~~~~~~~~~~~~~~~

- **Gunicorn**: Servidor WSGI
- **Nginx**: Proxy inverso y servidor de archivos estáticos
- **Supervisor**: Gestión de procesos
- **Git**: Control de versiones

Arquitectura del Sistema
-------------------------

El sistema sigue una arquitectura de tres capas:

1. **Capa de Presentación**: Frontend React (SPA)
2. **Capa de Lógica de Negocio**: Backend Django (API REST)
3. **Capa de Datos**: PostgreSQL + Redis

Flujo de Datos
~~~~~~~~~~~~~~

.. code-block:: text

    Usuario → Frontend (React) → API REST (Django) → Base de Datos (PostgreSQL)
                                       ↓
                                   Cache (Redis)
                                       ↓
                                 Tareas (Celery)

Módulos Principales
-------------------

1. **Autenticación y Usuarios**
   - Registro y login
   - Gestión de perfiles
   - Sistema de roles (Admin, Proveedor, Logística, Cliente)

2. **Productos**
   - Catálogo de productos
   - Categorías y subcategorías
   - Gestión de inventario
   - Imágenes y descripciones

3. **Pedidos**
   - Creación de pedidos
   - Seguimiento de estados
   - Historial de pedidos
   - Notificaciones

4. **Logística**
   - Asignación de entregas
   - Rutas de distribución
   - Seguimiento en tiempo real
   - Confirmación de entregas

5. **Administración**
   - Dashboard de métricas
   - Gestión de usuarios
   - Configuración del sistema
   - Reportes y análisis

Seguridad
---------

El sistema implementa las siguientes medidas de seguridad:

- **Autenticación JWT**: Tokens seguros con expiración
- **CORS configurado**: Control de acceso entre dominios
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **Validación de datos**: Sanitización en backend y frontend
- **HTTPS**: Comunicación encriptada en producción
- **Permisos granulares**: Control de acceso basado en roles

Próximos Pasos
--------------

Para comenzar a usar el sistema, consulta la :doc:`guia_inicio`.

Para información sobre la arquitectura detallada, ver :doc:`arquitectura`.

Para documentación de la API, consulta :doc:`apidocs/index`.
