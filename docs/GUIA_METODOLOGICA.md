# Guía Metodológica de Desarrollo - PREXCOL

**Versión:** 1.0  
**Fecha:** 01 de Diciembre de 2025

---

## 1. Metodología de Trabajo

El equipo de desarrollo de PREXCOL adopta una metodología ágil adaptada, enfocada en entregas iterativas e incrementales.

### 1.1 Ciclo de Desarrollo
1.  **Planificación**: Definición de tareas y objetivos en `task.md`.
2.  **Diseño**: Creación de `implementation_plan.md` antes de codificar.
3.  **Implementación**: Desarrollo siguiendo los estándares de código.
4.  **Verificación**: Pruebas unitarias y manuales antes de cerrar la tarea.
5.  **Documentación**: Actualización de manuales y guías.

---

## 2. Estándares de Código

### 2.1 Backend (Python/Django)
*   **Estilo**: Seguir **PEP 8**.
*   **Estructura de Archivos**:
    *   Modelos en `models.py`.
    *   Vistas en `views/` (separadas por módulo si es necesario).
    *   Serializers en `serializers.py`.
    *   URLs en `urls.py`.
*   **Nombres**:
    *   Clases: `CamelCase` (ej. `Usuario`, `PedidoDetalle`).
    *   Funciones y Variables: `snake_case` (ej. `calcular_total`, `fecha_creacion`).
    *   Constantes: `UPPER_CASE` (ej. `ESTADOS_PEDIDO`).

### 2.2 Frontend (React)
*   **Estilo**: Seguir reglas de **ESLint** y **Prettier**.
*   **Componentes**:
    *   Funcionales con Hooks (`useState`, `useEffect`).
    *   Nombres en `PascalCase` (ej. `ProductCard.jsx`).
    *   Un componente por archivo.
*   **Estructura**:
    *   `components/`: Componentes reutilizables.
    *   `pages/`: Vistas completas (rutas).
    *   `context/`: Estados globales.
    *   `hooks/`: Hooks personalizados.

---

## 3. Control de Versiones (Git)

### 3.1 Ramas
*   `main`: Código estable y listo para producción.
*   `develop`: Rama de integración principal.
*   `feature/nombre-funcionalidad`: Para nuevas características.
*   `fix/nombre-bug`: Para corrección de errores.

### 3.2 Mensajes de Commit
Formato: `[Tipo] Descripción breve`
*   `[Feat]`: Nueva funcionalidad.
*   `[Fix]`: Corrección de error.
*   `[Docs]`: Cambios en documentación.
*   `[Refactor]`: Mejoras de código sin cambios funcionales.

---

## 4. Estrategia de Pruebas

### 4.1 Pruebas Unitarias (Backend)
*   Uso de `django.test` y `pytest`.
*   Cobertura mínima esperada: Modelos y Vistas críticas.
*   Ejecución: `python manage.py test`.

### 4.2 Pruebas de Integración
*   Verificación de flujos completos (API -> DB -> API).
*   Pruebas de autenticación y permisos.

### 4.3 Pruebas Manuales (Frontend)
*   Verificación visual de componentes.
*   Pruebas de flujo de usuario (Smoke Testing) en navegadores principales.

---

## 5. Gestión de Documentación
Toda la documentación debe mantenerse actualizada en la carpeta `docs/`.
*   **Manual Técnico**: `docs/manuales/MANUAL_TECNICO.md`
*   **Manual de Usuario**: `docs/manuales/MANUAL_USUARIO.md`
*   **API**: Documentada automáticamente vía Swagger (`/swagger/`).
