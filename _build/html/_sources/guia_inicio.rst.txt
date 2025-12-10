Guía de Inicio Rápido
=====================

Esta guía te ayudará a configurar y ejecutar PREXCOL en tu entorno local.

Requisitos Previos
------------------

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.11+**
- **Node.js 18+** y npm
- **PostgreSQL 14+**
- **Redis 7+** (opcional, para cache y Celery)
- **Git**

Instalación
-----------

1. Clonar el Repositorio
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    git clone https://github.com/santi18melo/experticie.git
    cd PREXCOL_FINAL

2. Configurar el Backend
~~~~~~~~~~~~~~~~~~~~~~~~~

Crear y activar el entorno virtual:

.. code-block:: bash

    # Windows
    python -m venv .venv
    .venv\Scripts\activate

    # Linux/Mac
    python3 -m venv .venv
    source .venv/bin/activate

Instalar dependencias:

.. code-block:: bash

    pip install -r requirements.txt

3. Configurar Variables de Entorno
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Copiar el archivo de ejemplo y configurar:

.. code-block:: bash

    copy .env.example .env

Editar ``.env`` con tus configuraciones:

.. code-block:: ini

    # Django
    SECRET_KEY=tu-clave-secreta-aqui
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1

    # Database
    DATABASE_URL=postgresql://usuario:password@localhost:5432/prexcol_db

    # Redis (opcional)
    REDIS_URL=redis://localhost:6379/0

    # Frontend
    FRONTEND_URL=http://localhost:3000

4. Configurar la Base de Datos
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Crear la base de datos:

.. code-block:: bash

    # PostgreSQL
    createdb prexcol_db

Ejecutar migraciones:

.. code-block:: bash

    cd src/backend
    python manage.py migrate

Crear superusuario:

.. code-block:: bash

    python manage.py createsuperuser

5. Configurar el Frontend
~~~~~~~~~~~~~~~~~~~~~~~~~~

Instalar dependencias:

.. code-block:: bash

    cd src/frontend
    npm install

Configurar variables de entorno:

.. code-block:: bash

    # Crear .env en src/frontend
    echo "REACT_APP_API_URL=http://localhost:8000" > .env

Ejecutar el Sistema
-------------------

Opción 1: Script Automático (Recomendado)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    # Windows
    start_prexcol.bat

    # Linux/Mac
    ./start_prexcol.sh

Opción 2: Manual
~~~~~~~~~~~~~~~~

**Terminal 1 - Backend:**

.. code-block:: bash

    cd src/backend
    python manage.py runserver

**Terminal 2 - Frontend:**

.. code-block:: bash

    cd src/frontend
    npm start

**Terminal 3 - Celery (Opcional):**

.. code-block:: bash

    cd src/backend
    celery -A backend worker -l info

Acceder al Sistema
------------------

Una vez iniciado, puedes acceder a:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin
- **API Docs (Swagger)**: http://localhost:8000/swagger/
- **API Docs (ReDoc)**: http://localhost:8000/redoc/

Usuarios de Prueba
------------------

El sistema incluye usuarios de prueba para cada rol:

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 40

   * - Usuario
     - Contraseña
     - Rol
     - Descripción
   * - admin
     - admin123
     - Administrador
     - Acceso completo al sistema
   * - proveedor1
     - proveedor123
     - Proveedor
     - Gestión de productos
   * - logistica1
     - logistica123
     - Logística
     - Gestión de entregas
   * - cliente1
     - cliente123
     - Cliente
     - Realizar pedidos

Verificación de la Instalación
-------------------------------

Para verificar que todo está funcionando correctamente:

1. **Backend**: Visita http://localhost:8000/api/ - Deberías ver la API root
2. **Frontend**: Visita http://localhost:3000 - Deberías ver la página de inicio
3. **Login**: Intenta iniciar sesión con uno de los usuarios de prueba
4. **API Docs**: Visita http://localhost:8000/swagger/ - Deberías ver la documentación interactiva

Solución de Problemas
----------------------

Error de Base de Datos
~~~~~~~~~~~~~~~~~~~~~~~

Si obtienes errores de conexión a la base de datos:

.. code-block:: bash

    # Verificar que PostgreSQL está corriendo
    # Windows
    sc query postgresql-x64-14

    # Linux
    sudo systemctl status postgresql

Error de Migraciones
~~~~~~~~~~~~~~~~~~~~

Si las migraciones fallan:

.. code-block:: bash

    # Eliminar migraciones anteriores
    cd src/backend
    python manage.py migrate --fake-initial

Error de Dependencias
~~~~~~~~~~~~~~~~~~~~~

Si faltan dependencias:

.. code-block:: bash

    # Backend
    pip install -r requirements.txt --upgrade

    # Frontend
    cd src/frontend
    npm install --force

Puerto en Uso
~~~~~~~~~~~~~

Si el puerto 8000 o 3000 está en uso:

.. code-block:: bash

    # Backend - usar otro puerto
    python manage.py runserver 8001

    # Frontend - usar otro puerto
    PORT=3001 npm start

Próximos Pasos
--------------

- Lee la :doc:`introduccion` para entender mejor el sistema
- Consulta la :doc:`arquitectura` para conocer la estructura del proyecto
- Explora la :doc:`apidocs/index` para ver la API completa
- Revisa :doc:`deployment` para desplegar en producción

Recursos Adicionales
---------------------

- `Documentación de Django <https://docs.djangoproject.com/>`_
- `Documentación de React <https://react.dev/>`_
- `Django REST Framework <https://www.django-rest-framework.org/>`_
- `PostgreSQL Docs <https://www.postgresql.org/docs/>`_
