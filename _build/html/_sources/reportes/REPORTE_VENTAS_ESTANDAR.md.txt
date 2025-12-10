# 📄 Reporte de Ventas - Diseño Estándar Profesional

## 🎯 Objetivo de Diseño
Mantener la consistencia visual con el resto del Dashboard Administrativo, específicamente alineado con el módulo de **Automatización de Stock**. Se utilizan las clases CSS globales del proyecto en lugar de estilos ad-hoc.

## 🏗️ Componentes y Clases CSS

### 1. **Contenedor Principal**
- Clase: `content-section`
- Propósito: Marco blanco con sombra suave y bordes redondeados que unifica el contenido.

### 2. **Encabezado**
- Clase: `section-header`
- Contenido:
  - Título `<h2>` con icono.
  - Resumen de KPIs alineado a la derecha (Total Ventas, Transacciones) usando estilos de texto estándar.

### 3. **Filtros**
- Clase: `form-card`
- Estructura: `form-grid` para alinear los inputs de fecha y botones.
- Botones:
  - `btn-primary`: Para la acción principal "Filtrar".
  - `btn-secondary`: Para la acción secundaria "Limpiar" (estilo gris suave).

### 4. **Tabla de Datos**
- Contenedor: `table-container` (scroll horizontal automático).
- Tabla: `data-table`
  - **Cabecera**: Fondo gris claro, texto uppercase.
  - **Filas**: Hover effect estándar.
  - **Badges**: Uso de `badge badge-normal` para IDs y `badge badge-info` para contadores.
  - **Acciones**: Enlace de texto simple y limpio.

### 5. **Detalle Expandido**
- Diseño anidado dentro de la fila.
- Fondo gris muy claro (`#f8fafc`) para diferenciar del nivel principal.
- Sub-tabla con bordes definidos y fondo blanco.

## 🎨 Paleta de Colores (Global)

Se adhiere estrictamente a las variables CSS del proyecto (`variables.css`):
- **Texto Principal**: `#2d3748`
- **Texto Secundario**: `#718096`
- **Bordes**: `#e2e8f0`
- **Acentos**: Azul (`#3182ce`) e Indigo (`#667eea`).

## 🚀 Beneficios

1.  **Consistencia**: El usuario no siente que cambia de aplicación al navegar entre pestañas.
2.  **Mantenibilidad**: Al usar clases globales, cualquier cambio en `DashboardAdmin.css` se refleja automáticamente aquí.
3.  **Claridad**: Diseño probado y familiar para el usuario administrativo.

## 💻 Implementación

Archivo: `frontend/src/components/SalesTab.jsx`
Estilos: `frontend/src/styles/dashboardAdmin.css` (Clases globales)
