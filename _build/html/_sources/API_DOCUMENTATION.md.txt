# Documentación de API - PREXCOL

**Versión:** 1.0  
**Fecha:** 01 de Diciembre de 2025

---

## 1. Acceso a la Documentación Interactiva

PREXCOL utiliza **Swagger/OpenAPI** para documentar sus endpoints de manera automática e interactiva.

### 1.1 Swagger UI
Interfaz gráfica para explorar y probar la API.
*   **URL Local**: `http://localhost:8000/swagger/`
*   **URL Producción**: `https://api.prexcol.com/swagger/` (Ejemplo)

### 1.2 ReDoc
Documentación alternativa enfocada en lectura.
*   **URL Local**: `http://localhost:8000/redoc/`

---

## 2. Autenticación

La API utiliza autenticación por **Token JWT (Bearer Token)**.

### 2.1 Obtener Token
*   **Endpoint**: `POST /api/auth/login/`
*   **Body**:
    ```json
    {
        "email": "usuario@ejemplo.com",
        "password": "tu_password"
    }
    ```
*   **Respuesta**:
    ```json
    {
        "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
    ```

### 2.2 Usar Token
Incluir el header `Authorization` en las peticiones protegidas:
```http
Authorization: Bearer <tu_token_access>
```

---

## 3. Principales Endpoints

### 3.1 Productos
*   `GET /api/productos/`: Listar productos (público).
*   `POST /api/productos/`: Crear producto (Proveedor/Admin).

### 3.2 Pedidos
*   `POST /api/ventas/pedidos/`: Crear pedido (Cliente).
*   `GET /api/ventas/pedidos/`: Listar mis pedidos.

### 3.3 Usuarios
*   `POST /api/auth/register/`: Registrar nuevo usuario.
*   `GET /api/users/profile/`: Ver perfil actual.
