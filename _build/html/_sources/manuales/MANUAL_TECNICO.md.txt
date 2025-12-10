# Manual Técnico - PREXCOL

**Versión:** 1.0  
**Fecha:** 01 de Diciembre de 2025  
**Autor:** Equipo de Desarrollo PREXCOL

---

## 1. Introducción

Este documento técnico describe la arquitectura, implementación y mantenimiento de la plataforma **PREXCOL**. Está dirigido a desarrolladores, arquitectos de software y administradores de sistemas encargados de la evolución y soporte de la aplicación.

---

## 2. Análisis de Requerimientos

### 2.1 Objetivo del Proyecto
PREXCOL es una plataforma de comercio electrónico y gestión logística diseñada para conectar proveedores, tiendas y clientes finales. El sistema facilita la gestión de inventarios, procesamiento de pedidos, seguimiento de envíos y administración de usuarios con diferentes roles.

### 2.2 Requerimientos Funcionales
El sistema implementa las siguientes funciones esenciales:

1.  **Autenticación y Autorización**: Registro, inicio de sesión (JWT), recuperación de contraseña y gestión de roles (Admin, Proveedor, Logística, Cliente).
2.  **Gestión de Usuarios**: Creación, edición y desactivación de perfiles de usuario.
3.  **Catálogo de Productos**: Listado, filtrado, búsqueda y visualización de detalles de productos.
4.  **Gestión de Inventario**: Control de stock, alertas de bajo stock y configuración de recarga automática.
5.  **Carrito de Compras**: Adición de productos, cálculo de subtotales y totales.
6.  **Procesamiento de Pedidos**: Creación de pedidos, flujo de estados (Pendiente -> Preparando -> En Tránsito -> Entregado).
7.  **Pasarela de Pagos**: Registro y validación de pagos (simulación/integración).
8.  **Panel de Administración**: Dashboard para gestión global de tiendas y usuarios.
9.  **Panel de Proveedor**: Gestión de productos propios y visualización de ventas.
10. **Panel de Logística**: Gestión de despachos y actualización de estados de envío.
11. **Notificaciones**: Sistema de alertas para usuarios sobre estado de pedidos y stock.
12. **Soporte al Usuario**: Módulo de ayuda y asistente IA.

### 2.3 Requerimientos No Funcionales
1.  **Tecnología**: Backend basado en Python/Django y Frontend en React.
2.  **Seguridad**: Autenticación vía Tokens JWT (JSON Web Tokens) y contraseñas hasheadas (PBKDF2).
3.  **Escalabilidad**: Arquitectura desacoplada (API REST) que permite escalar frontend y backend independientemente.
4.  **Asincronía**: Uso de Celery y Redis para tareas en segundo plano (ej. envíos de correo, actualizaciones pesadas).
5.  **Compatibilidad**: Frontend responsivo compatible con navegadores modernos (Chrome, Firefox, Edge, Safari).

---

## 3. Arquitectura del Sistema

### 3.1 Patrón de Diseño
El sistema utiliza una arquitectura **Cliente-Servidor** desacoplada:

*   **Backend (API REST)**: Implementado con **Django REST Framework (DRF)**. Sigue el patrón MVT (Model-View-Template) de Django, aunque enfocado en la exposición de endpoints JSON (Serializers en lugar de Templates tradicionales).
*   **Frontend (SPA)**: Implementado con **React**. Sigue una arquitectura de componentes y gestión de estado global (Context API).

### 3.2 Diagrama de Arquitectura Simplificado
```mermaid
graph TD
    Client[Cliente Web (React)] <-->|JSON / HTTPS| API[API Gateway (Django)]
    API <--> DB[(Base de Datos SQL)]
    API <--> Cache[(Redis)]
    API --> Worker[Celery Worker]
    Worker --> Email[Servicio de Email]
```

---

## 4. Tecnologías y Herramientas

### 4.1 Backend
*   **Python 3.10+**: Lenguaje principal.
*   **Django 5.0**: Framework web de alto nivel.
*   **Django REST Framework 3.15**: Toolkit para construir APIs Web.
*   **SimpleJWT**: Autenticación basada en tokens.
*   **Celery 5.4**: Cola de tareas asíncronas.
*   **Redis 5.0**: Broker de mensajes y caché.
*   **Pillow**: Procesamiento de imágenes.

### 4.2 Frontend
*   **React 19**: Librería de UI.
*   **Vite 7.2**: Build tool y servidor de desarrollo rápido.
*   **React Router 7**: Enrutamiento del lado del cliente.
*   **Axios**: Cliente HTTP para peticiones a la API.
*   **React Icons**: Librería de iconos.

### 4.3 Base de Datos
*   **SQLite**: Base de datos por defecto para desarrollo.
*   **PostgreSQL**: Base de datos recomendada para producción (soportada vía configuración).

---

## 5. Diseño de Base de Datos (DER)

El modelo de datos relacional se estructura en torno a las siguientes entidades principales:

### 5.1 Entidades Principales

1.  **Usuario (`apps.usuarios.Usuario`)**
    *   `email` (PK), `nombre`, `rol`, `password`, `imagen`.
    *   Roles: Admin, Proveedor, Logística, Cliente.

2.  **Tienda (`apps.productos.Tienda`)**
    *   `nombre`, `direccion`, `administrador` (FK -> Usuario).

3.  **Producto (`apps.productos.Producto`)**
    *   `nombre`, `precio`, `stock`, `tienda` (FK), `proveedor` (FK).
    *   Relación: Un proveedor suministra múltiples productos.

4.  **Pedido (`apps.productos.Pedido`)**
    *   `cliente` (FK), `estado`, `total`, `fecha_creacion`.
    *   Estados: Pendiente, Preparando, En Tránsito, Entregado.

5.  **DetallePedido (`apps.productos.DetallePedido`)**
    *   Tabla intermedia entre Pedido y Producto.
    *   `cantidad`, `precio_unitario`, `subtotal`.

6.  **Venta (`apps.ventas.Venta`)**
    *   Registro histórico de venta finalizada.
    *   `pedido` (OneToOne), `total`, `fecha_venta`.

### 5.2 Esquema Relacional (Texto)
*   **Usuario** 1:N **Pedido** (Un cliente hace muchos pedidos)
*   **Tienda** 1:N **Producto** (Una tienda tiene muchos productos)
*   **Pedido** 1:N **DetallePedido** N:1 **Producto** (Relación muchos a muchos resuelta)
*   **Producto** 1:1 **StockConfig** (Configuración de stock por producto)

---

## 6. Implementación y Configuración

### 6.1 Requisitos Previos
*   Python 3.10 o superior.
*   Node.js 18 o superior.
*   Redis (para tareas asíncronas).

### 6.2 Instalación del Backend

1.  **Crear entorno virtual**:
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # Linux/Mac
    .venv\Scripts\activate     # Windows
    ```

2.  **Instalar dependencias**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3.  **Configurar variables de entorno**:
    Crear archivo `.env` en `backend/` basado en `.env.example`.

4.  **Migraciones y Superusuario**:
    ```bash
    python manage.py migrate
    python manage.py createsuperuser
    ```

### 6.3 Instalación del Frontend

1.  **Instalar paquetes**:
    ```bash
    cd frontend
    npm install
    ```

### 6.4 Despliegue (Desarrollo)

**Opción A: Scripts Automáticos (Windows)**
*   Ejecutar `start_prexcol.bat` en la raíz del proyecto.

**Opción B: Manual**
1.  **Backend**:
    ```bash
    cd backend
    python manage.py runserver
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
3.  **Celery (Opcional)**:
    ```bash
    celery -A experticie worker -l info
    ```

---

## 7. Mantenimiento y Soporte

*   **Logs**: Revisar `backend/error.log` para errores del servidor.
*   **Tests**: Ejecutar `python manage.py test` para pruebas unitarias.
*   **Documentación API**: Acceder a `/swagger/` o `/redoc/` con el servidor corriendo.
