# 📄 Reporte de Ventas - Diseño Minimalista Profesional

## 🎯 Filosofía de Diseño
"Menos es más". El objetivo es presentar la información financiera con la máxima claridad posible, eliminando distracciones visuales, gradientes innecesarios y elementos decorativos. La tipografía, el espaciado y el contraste son los protagonistas.

## 🏗️ Estructura

### 1. **Encabezado Limpio**
- **Título**: "Reporte de Ventas" en negrita, gris oscuro.
- **Subtítulo**: Descripción breve en gris claro.
- **Resumen KPI (Texto)**: En lugar de tarjetas grandes, usamos un bloque de texto alineado a la derecha con las métricas clave (Total, Transacciones, Promedio). Esto ahorra espacio vertical y mantiene el foco en los datos.

### 2. **Filtros Funcionales**
- Barra de herramientas gris claro (`bg-gray-50`).
- Inputs de fecha estándar con bordes sutiles.
- Botones de acción claros ("Filtrar" en oscuro, "Limpiar" en claro).

### 3. **Tabla de Datos (Core)**
Diseñada para escaneo rápido y legibilidad.

- **Cabecera**:
  - Fondo gris muy claro.
  - Texto en mayúsculas, pequeño (`text-xs`), gris medio, tracking amplio.
  - Alineación precisa (montos a la derecha, contadores al centro).

- **Filas**:
  - Fondo blanco.
  - Separadores muy sutiles (`divide-gray-100`).
  - **ID**: Texto simple, negrita.
  - **Fecha**: Fecha principal + Hora en gris claro pequeño.
  - **Cliente**: Nombre + Email debajo.
  - **Total**: Negrita para destacar el valor financiero.
  - **Acción**: Enlace de texto azul simple ("Ver detalle").

- **Detalle Expandido**:
  - Se despliega dentro de la misma fila.
  - Contenedor blanco con borde sutil.
  - Tabla anidada compacta para los productos.
  - Footer de totales claro.

## 🎨 Paleta de Colores (Monocromática + Acento)

- **Base**: Blancos y Grises (`gray-50` a `gray-900`).
- **Acento**: Azul estándar (`blue-600`) solo para elementos interactivos (enlaces, focus rings).
- **Texto**:
  - Principal: `#111827` (Casi negro)
  - Secundario: `#4b5563` (Gris medio)
  - Terciario: `#9ca3af` (Gris claro para etiquetas)

## 🚀 Ventajas

1.  **Legibilidad**: El ojo no se cansa con colores brillantes.
2.  **Profesionalismo**: Se asemeja a software financiero/contable de alta gama (Stripe, Xero).
3.  **Rendimiento**: Menos elementos DOM complejos, renderizado más rápido.
4.  **Impresión**: Este diseño es "printer-friendly" por naturaleza.

## 💻 Implementación

Componente React único (`SalesTab.jsx`) usando Tailwind CSS para utilidades de estilo. Sin dependencias de iconos externos (todo texto o SVG si fuera necesario, pero aquí solo texto).
