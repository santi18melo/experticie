PREXCOL - Documentación Técnica
=================================

Bienvenido a la documentación técnica de **PREXCOL**, un sistema completo de gestión de productos, pedidos y logística.

.. toctree::
   :maxdepth: 2
   :caption: Contenido:

   introduccion
   guia_inicio
   arquitectura
   diagramas/INDEX_DIAGRAMAS
   diagramas/galeria
   apidocs/index
   guias_usuario
   deployment

Accesos Rápidos
===============

Acceda a las aplicaciones principales del sistema:

* **Aplicación Frontend**: http://localhost:5175
* **Backend API**: http://localhost:8000
* **Panel Administrativo**: http://localhost:8000/admin
* **Documentación API (Swagger)**: http://localhost:8000/api/docs

.. note::
   Asegúrese de que los servicios estén ejecutándose. El frontend está configurado en el puerto **75** (5175).

Índices y tablas
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

Descripción General
===================

PREXCOL es una plataforma integral que permite:

- Gestión de productos y catálogos
- Sistema de pedidos y seguimiento
- Panel administrativo completo
- Gestión de usuarios y roles
- Sistema de logística y entregas
- API RESTful completa

Características Principales
============================

Backend (Django)
----------------

- **Framework**: Django 5.0.4
- **API**: Django REST Framework
- **Autenticación**: JWT (Simple JWT)
- **Base de datos**: PostgreSQL
- **Documentación API**: drf-yasg (Swagger/OpenAPI)

Frontend (React)
----------------

- **Framework**: React 18
- **Enrutamiento**: React Router
- **Gestión de estado**: Context API
- **Estilos**: CSS moderno con variables
- **Internacionalización**: i18next

Arquitectura
============

El sistema sigue una arquitectura de microservicios con:

- **Backend API**: Django REST Framework
- **Frontend SPA**: React
- **Base de datos**: PostgreSQL
- **Cache**: Redis
- **Task Queue**: Celery
- **Servidor web**: Nginx + Gunicorn

Enlaces Rápidos
===============

- `Repositorio GitHub <https://github.com/santi18melo/experticie>`_
- `Documentación de API <../swagger.json>`_
- `Guía de inicio rápido <INICIO_RAPIDO.html>`_

Licencia
========

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
