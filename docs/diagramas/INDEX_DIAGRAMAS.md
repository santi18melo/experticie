# 📐 ÍNDICE DE DIAGRAMAS UML - PREXCOL

**Proyecto**: PREXCOL  
**Fecha**: 2025-12-04  
**Versión**: 1.0

---

## 🎯 PROPÓSITO

Este documento es el índice maestro de todos los diagramas UML del proyecto PREXCOL. Los diagramas están organizados en dos categorías principales: **Estructurales** y **De Comportamiento**.

---

## 📚 DIAGRAMAS DISPONIBLES

### 🏗️ DIAGRAMAS ESTRUCTURALES

Describen la estructura estática del sistema.

| # | Diagrama | Archivo | Descripción |
|---|----------|---------|-------------|
| 1 | **Diagrama de Clases** | [DIAGRAMA_CLASES.md](DIAGRAMA_CLASES.md) | Modelo de dominio completo con relaciones, cardinalidades y patrones de diseño |
| 2 | **Diagrama de Componentes** | [DIAGRAMA_COMPONENTES_PAQUETES.md](DIAGRAMA_COMPONENTES_PAQUETES.md#diagrama-de-componentes) | Arquitectura de componentes frontend/backend |
| 3 | **Diagrama de Paquetes** | [DIAGRAMA_COMPONENTES_PAQUETES.md](DIAGRAMA_COMPONENTES_PAQUETES.md#diagrama-de-paquetes) | Organización de paquetes y dependencias |
| 4 | **Diagrama de Estructura Compuesta** | [DIAGRAMA_COMPONENTES_PAQUETES.md](DIAGRAMA_COMPONENTES_PAQUETES.md#diagrama-de-estructura-compuesta) | Estructura interna de componentes complejos |
| 5 | **Diagrama de Despliegue** | [DIAGRAMA_DESPLIEGUE.md](DIAGRAMA_DESPLIEGUE.md) | Infraestructura cloud, nodos y entornos |
| 6 | **Diagrama de Objetos** | [DIAGRAMA_OBJETOS.md](DIAGRAMA_OBJETOS.md) | Instancias concretas en escenarios específicos |

### 🔄 DIAGRAMAS DE COMPORTAMIENTO

Describen el comportamiento dinámico del sistema.

#### Diagramas de Interacción

| # | Diagrama | Archivo | Descripción |
|---|----------|---------|-------------|
| 7 | **Diagramas de Secuencia** | [DIAGRAMA_SECUENCIA.md](DIAGRAMA_SECUENCIA.md) | Interacciones temporales entre objetos |
| | - Autenticación | [DIAGRAMA_SECUENCIA.md#autenticación](DIAGRAMA_SECUENCIA.md#autenticación) | Login, registro, refresh token, reset password |
| | - Gestión de Pedidos | [DIAGRAMA_SECUENCIA.md#gestión-de-pedidos](DIAGRAMA_SECUENCIA.md#gestión-de-pedidos) | Crear pedido, cambiar estado |
| | - Procesar Pago | [DIAGRAMA_SECUENCIA.md#procesar-pago](DIAGRAMA_SECUENCIA.md#procesar-pago) | Pago con tarjeta, validaciones |
| | - Recarga de Stock | [DIAGRAMA_SECUENCIA.md#recarga-de-stock](DIAGRAMA_SECUENCIA.md#recarga-de-stock) | Recarga automática y manual |
| | - Notificaciones | [DIAGRAMA_SECUENCIA.md#notificaciones](DIAGRAMA_SECUENCIA.md#notificaciones) | Envío de notificaciones multi-canal |
| 8 | **Diagramas de Colaboración** | [DIAGRAMA_COLABORACION.md](DIAGRAMA_COLABORACION.md) | Interacciones con enfoque estructural |
| | - Crear Pedido | [DIAGRAMA_COLABORACION.md#crear-pedido](DIAGRAMA_COLABORACION.md#crear-pedido) | Navegación de mensajes numerados |
| | - Procesar Pago | [DIAGRAMA_COLABORACION.md#procesar-pago](DIAGRAMA_COLABORACION.md#procesar-pago) | Flujos alternativos |
| | - Recarga Automática | [DIAGRAMA_COLABORACION.md#recarga-automática-de-stock](DIAGRAMA_COLABORACION.md#recarga-automática-de-stock) | Control transaccional |
| | - Cambiar Estado | [DIAGRAMA_COLABORACION.md#cambiar-estado-de-pedido](DIAGRAMA_COLABORACION.md#cambiar-estado-de-pedido) | Matriz de transiciones |
| | - Autenticación | [DIAGRAMA_COLABORACION.md#autenticación-jwt](DIAGRAMA_COLABORACION.md#autenticación-jwt) | Tokens JWT |
| 9 | **Diagrama de Resumen de Interacción** | [DIAGRAMA_RESUMEN_TIEMPO.md](DIAGRAMA_RESUMEN_TIEMPO.md) | Vista combinada actividad + secuencia |
| | - Flujo Compra | [DIAGRAMA_RESUMEN_TIEMPO.md#flujo-completo-de-compra](DIAGRAMA_RESUMEN_TIEMPO.md#flujo-completo-de-compra) | Overview con referencias a sd: |
| | - Stock Automático | [DIAGRAMA_RESUMEN_TIEMPO.md#sistema-de-stock-automático](DIAGRAMA_RESUMEN_TIEMPO.md#sistema-de-stock-automático) | Decisiones y transacciones |
| | - Gestión Usuario | [DIAGRAMA_RESUMEN_TIEMPO.md#gestión-de-usuario](DIAGRAMA_RESUMEN_TIEMPO.md#gestión-de-usuario) | Flujos de perfil |
| 10 | **Diagramas de Tiempo** | [DIAGRAMA_RESUMEN_TIEMPO.md](DIAGRAMA_RESUMEN_TIEMPO.md) | Restricciones temporales y SLAs |
| | - Procesamiento Pedido | [DIAGRAMA_RESUMEN_TIEMPO.md#timeline-procesamiento-de-pedido](DIAGRAMA_RESUMEN_TIEMPO.md#timeline-procesamiento-de-pedido) | Timeline 0-365 minutos |
| | - Ciclo de Vida Pago | [DIAGRAMA_RESUMEN_TIEMPO.md#timeline-ciclo-de-vida-de-pago](DIAGRAMA_RESUMEN_TIEMPO.md#timeline-ciclo-de-vida-de-pago) | Timeline 0-40 segundos |
| | - Recarga Automática | [DIAGRAMA_RESUMEN_TIEMPO.md#timeline-recarga-automática](DIAGRAMA_RESUMEN_TIEMPO.md#timeline-recarga-automática) | Timeline 0-8 horas |

#### Otros Diagramas de Comportamiento

| # | Diagrama | Archivo | Descripción |
|---|----------|---------|-------------|
| 8 | **Diagramas de Actividad** | [DIAGRAMA_ACTIVIDAD.md](DIAGRAMA_ACTIVIDAD.md) | Flujos de proceso y algoritmos |
| | - Registro de Usuario | [DIAGRAMA_ACTIVIDAD.md#registro-de-usuario](DIAGRAMA_ACTIVIDAD.md#registro-de-usuario) | Proceso completo de registro |
| | - Proceso de Compra | [DIAGRAMA_ACTIVIDAD.md#proceso-de-compra-completo](DIAGRAMA_ACTIVIDAD.md#proceso-de-compra-completo) | Flujo de compra end-to-end |
| | - Gestión de Pedido | [DIAGRAMA_ACTIVIDAD.md#gestión-de-pedido-logística](DIAGRAMA_ACTIVIDAD.md#gestión-de-pedido-logística) | Logística de pedidos |
| | - Recarga Automática | [DIAGRAMA_ACTIVIDAD.md#recarga-automática-de-stock](DIAGRAMA_ACTIVIDAD.md#recarga-automática-de-stock) | Proceso automático de stock |
| | - Asignación Productos | [DIAGRAMA_ACTIVIDAD.md#asignación-de-productos-a-proveedor](DIAGRAMA_ACTIVIDAD.md#asignación-de-productos-a-proveedor) | Admin asigna productos |
| | - Generación Reportes | [DIAGRAMA_ACTIVIDAD.md#generación-de-reportes](DIAGRAMA_ACTIVIDAD.md#generación-de-reportes) | Crear reportes por rol |
| | - Gestión de Cuenta | [DIAGRAMA_ACTIVIDAD.md#gestión-de-cuenta-de-usuario](DIAGRAMA_ACTIVIDAD.md#gestión-de-cuenta-de-usuario) | Editar perfil, cambiar password |
| 9 | **Diagramas de Casos de Uso** | [DIAGRAMA_CASOS_USO.md](DIAGRAMA_CASOS_USO.md) | Requisitos funcionales por actor |
| | - Vista General | [DIAGRAMA_CASOS_USO.md#vista-general-del-sistema](DIAGRAMA_CASOS_USO.md#vista-general-del-sistema) | Todos los casos de uso |
| | - Por Actor | [DIAGRAMA_CASOS_USO.md#casos-de-uso-por-actor](DIAGRAMA_CASOS_USO.md#casos-de-uso-por-actor) | Admin, Proveedor, Logística, Cliente |
| | - Especificaciones | [DIAGRAMA_CASOS_USO.md#especificaciones-detalladas](DIAGRAMA_CASOS_USO.md#especificaciones-detalladas) | Detalle de casos de uso principales |
| 10 | **Diagramas de Máquinas de Estado** | [DIAGRAMA_ESTADOS.md](DIAGRAMA_ESTADOS.md) | Ciclos de vida y transiciones |
| | - Estado del Pedido | [DIAGRAMA_ESTADOS.md#estado-del-pedido](DIAGRAMA_ESTADOS.md#estado-del-pedido) | 6 estados, transiciones validadas |
| | - Estado de Usuario | [DIAGRAMA_ESTADOS.md#estado-de-la-cuenta-de-usuario](DIAGRAMA_ESTADOS.md#estado-de-la-cuenta-de-usuario) | 5 estados, permisos por estado |
| | - Estado del Pago | [DIAGRAMA_ESTADOS.md#estado-del-pago](DIAGRAMA_ESTADOS.md#estado-del-pago) | 8 estados, integración gateway |
| | - Estado Notificación | [DIAGRAMA_ESTADOS.md#estado-de-la-notificación](DIAGRAMA_ESTADOS.md#estado-de-la-notificación) | Ciclo de envío con reintentos |
| | - Estado del Stock | [DIAGRAMA_ESTADOS.md#estado-del-stock](DIAGRAMA_ESTADOS.md#estado-del-stock) | 5 niveles de alerta |

---

## 🗺️ NAVEGACIÓN RÁPIDA

### Por Módulo del Sistema

#### Módulo: Autenticación
- **Clases**: [Usuario, PasswordHistory](DIAGRAMA_CLASES.md#módulo-usuarios)
- **Secuencia**: [Login, Registro, Reset Password](DIAGRAMA_SECUENCIA.md#autenticación)
- **Actividad**: [Registro de Usuario](DIAGRAMA_ACTIVIDAD.md#registro-de-usuario)
- **Estados**: [Estados de Usuario](DIAGRAMA_ESTADOS.md#estado-de-la-cuenta-de-usuario)
- **Casos de Uso**: [UC-001 Registrarse, UC-002 Login](DIAGRAMA_CASOS_USO.md)

#### Módulo: Productos
- **Clases**: [Producto, Tienda, Seccion](DIAGRAMA_CLASES.md#módulo-productos)
- **Componentes**: [Product Service](DIAGRAMA_COMPONENTES_PAQUETES.md)
- **Actividad**: [Asignación de Productos](DIAGRAMA_ACTIVIDAD.md#asignación-de-productos-a-proveedor)
- **Casos de Uso**: [UC-007 Gestionar Productos, UC-008 Asignar](DIAGRAMA_CASOS_USO.md)

#### Módulo: Stock
- **Clases**: [StockConfig, HistorialRecarga](DIAGRAMA_CLASES.md#módulo-productos)
- **Secuencia**: [Recarga Automática, Recarga Manual](DIAGRAMA_SECUENCIA.md#recarga-de-stock)
- **Actividad**: [Recarga Automática](DIAGRAMA_ACTIVIDAD.md#recarga-automática-de-stock)
- **Estados**: [Estados del Stock](DIAGRAMA_ESTADOS.md#estado-del-stock)
- **Casos de Uso**: [UC-011 Configurar Recarga Auto](DIAGRAMA_CASOS_USO.md)

#### Módulo: Pedidos
- **Clases**: [Pedido, DetallePedido](DIAGRAMA_CLASES.md#módulo-ventas)
- **Secuencia**: [Crear Pedido, Cambiar Estado](DIAGRAMA_SECUENCIA.md#gestión-de-pedidos)
- **Actividad**: [Proceso de Compra, Gestión Pedido](DIAGRAMA_ACTIVIDAD.md)
- **Estados**: [Estados del Pedido](DIAGRAMA_ESTADOS.md#estado-del-pedido)
- **Casos de Uso**: [UC-015 Crear, UC-018 Cambiar Estado](DIAGRAMA_CASOS_USO.md)

#### Módulo: Pagos
- **Clases**: [Pago, Transaccion, MetodoPago](DIAGRAMA_CLASES.md#módulo-pagos)
- **Secuencia**: [Procesar Pago](DIAGRAMA_SECUENCIA.md#procesar-pago)
- **Estados**: [Estados del Pago](DIAGRAMA_ESTADOS.md#estado-del-pago)
- **Casos de Uso**: [UC-016 Procesar Pago](DIAGRAMA_CASOS_USO.md)

#### Módulo: Notificaciones
- **Clases**: [Notificacion, TipoNotificacion](DIAGRAMA_CLASES.md#módulo-notificaciones)
- **Secuencia**: [Envío de Notificación](DIAGRAMA_SECUENCIA.md#notificaciones)
- **Estados**: [Estados de Notificación](DIAGRAMA_ESTADOS.md#estado-de-la-notificación)
- **Casos de Uso**: [UC-023 Enviar, UC-024 Ver](DIAGRAMA_CASOS_USO.md)

---

## 📊 ESTADÍSTICAS

### Diagramas Creados

| Tipo | Cantidad | Archivos |
|------|----------|----------|
| **Estructurales** | 6 | 3 documentos |
| **De Comportamiento** | 7 | 6 documentos |
| **Total** | **13 tipos UML** | **9 documentos** |

### Cobertura

| Aspecto | Cubierto | Notas |
|---------|----------|-------|
| Modelo de Dominio | ✅ 100% | Todas las entidades documentadas |
| Instancias Runtime | ✅ 100% | Escenarios concretos documentados |
| Arquitectura Sistema | ✅ 100% | Componentes, paquetes, despliegue |
| Procesos de Negocio | ✅ 100% | Secuencias, actividades, colaboración |
| Interacciones Complejas | ✅ 100% | Overview y diagramas de tiempo |
| Requisitos Funcionales | ✅ 100% | 29 casos de uso identificados |
| Estados del Sistema | ✅ 100% | 5 máquinas de estado principales |
| Restricciones Temporales | ✅ 100% | SLAs y timelines documentados |

---

## 🎨 CONVENCIONES Y ESTÁNDARES

### Formato de Diagramas

Todos los diagramas utilizan **Mermaid syntax** para facilitar:
- ✅ Versionado en Git (texto plano)
- ✅ Renderizado en GitHub/Markdown
- ✅ Fácil mantenimiento
- ✅ Generación automática

### Nomenclatura

- **Archivos**: `DIAGRAMA_<TIPO>.md`
- **Secciones**: Títulos con emojis descriptivos
- **Enlaces**: Referencias cruzadas entre diagramas

### Colores en Diagramas de Actividad

- 🟢 **Verde**: Estados iniciales, finales exitosos
- 🔴 **Rojo**: Errores, estados finales fallidos
- 🟠 **Naranja**: Advertencias, estados intermedios
- ⚪ **Gris**: Estados neutros, skipped

---

## 🔧 HERRAMIENTAS RECOMENDADAS

### Visualización

| Herramienta | Propósito | URL |
|-------------|-----------|-----|
| **Mermaid Live Editor** | Editar diagramas online | https://mermaid.live |
| **VS Code + Mermaid Extension** | Previsualización local | Marketplace VS Code |
| **GitHub** | Renderizado automático | En repositorio |

### Generación

| Herramienta | Propósito |
|-------------|-----------|
| **PlantUML** | Alternativa a Mermaid |
| **Draw.io** | Diagramas más complejos |
| **Lucidchart** | Colaboración en equipo |

---

## 📖 CÓMO USAR ESTE ÍNDICE

### Para Nuevos Desarrolladores

1. **Empieza con**: [Diagrama de Clases](DIAGRAMA_CLASES.md)
   - Entender el modelo de dominio
2. **Luego**: [Casos de Uso por Actor](DIAGRAMA_CASOS_USO.md)
   - Conocer funcionalidades por rol
3. **Después**: [Diagramas de Secuencia](DIAGRAMA_SECUENCIA.md)
   - Ver interacciones detalladas

### Para Arquitectos

1. **Revisar**: [Componentes y Paquetes](DIAGRAMA_COMPONENTES_PAQUETES.md)
   - Arquitectura general
2. **Estudiar**: [Diagrama de Despliegue](DIAGRAMA_DESPLIEGUE.md)
   - Infraestructura cloud
3. **Analizar**: [Máquinas de Estado](DIAGRAMA_ESTADOS.md)
   - Reglas de negocio

### Para QA/Testers

1. **Consultar**: [Casos de Uso](DIAGRAMA_CASOS_USO.md)
   - Definir casos de prueba
2. **Revisar**: [Diagramas de Actividad](DIAGRAMA_ACTIVIDAD.md)
   - Flujos de proceso
3. **Validar**: [Máquinas de Estado](DIAGRAMA_ESTADOS.md)
   - Transiciones válidas

### Para Product Managers

1. **Ver**: [Vista General de Casos de Uso](DIAGRAMA_CASOS_USO.md#vista-general-del-sistema)
   - Todas las funcionalidades
2. **Entender**: [Proceso de Compra](DIAGRAMA_ACTIVIDAD.md#proceso-de-compra-completo)
   - Flujo principal del negocio
3. **Revisar**: [Estados de Pedido](DIAGRAMA_ESTADOS.md#estado-del-pedido)
   - Ciclo de vida del pedido

---

## 🔄 MANTENIMIENTO

### Actualización de Diagramas

**Cuándo actualizar**:
- Cambios en el modelo de datos
- Nuevas funcionalidades
- Cambios en flujos de proceso
- Modificaciones de arquitectura

**Cómo actualizar**:
1. Editar archivo `.md` correspondiente
2. Actualizar diagramas Mermaid
3. Verificar renderizado
4. Actualizar este índice si es necesario
5. Commit con mensaje descriptivo

### Versionado

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **1.0** | 2025-12-04 | Creación inicial de todos los diagramas UML (13 tipos) |

---

## 📋 CHECKLIST DE COMPLETITUD

- [x] Diagrama de Clases
- [x] Diagrama de Componentes
- [x] Diagrama de Paquetes
- [x] Diagrama de Estructura Compuesta
- [x] Diagrama de Despliegue
- [x] Diagrama de Objetos
- [x] Diagramas de Secuencia (5 principales)
- [x] Diagramas de Colaboración (5 escenarios)
- [x] Diagrama de Resumen de Interacción (3 flujos)
- [x] Diagramas de Tiempo (3 timelines)
- [x] Diagramas de Actividad (7 flujos)
- [x] Diagramas de Casos de Uso (29 casos)
- [x] Diagramas de Máquinas de Estado (5 entidades)

### Estado: ✅ **COMPLETADO - 13/13 tipos UML 2.0**

---

## 🎨 CONVENCIONES Y ESTÁNDARES

### Formato de Diagramas

Todos los diagramas utilizan **Mermaid syntax** para facilitar:
- ✅ Versionado en Git (texto plano)
- ✅ Renderizado en GitHub/Markdown
- ✅ Fácil mantenimiento
- ✅ Generación automática

### Nomenclatura

- **Archivos**: `DIAGRAMA_<TIPO>.md`
- **Secciones**: Títulos con emojis descriptivos
- **Enlaces**: Referencias cruzadas entre diagramas

### Colores en Diagramas de Actividad

- 🟢 **Verde**: Estados iniciales, finales exitosos
- 🔴 **Rojo**: Errores, estados finales fallidos
- 🟠 **Naranja**: Advertencias, estados intermedios
- ⚪ **Gris**: Estados neutros, skipped

---

## 🔧 HERRAMIENTAS RECOMENDADAS

### Visualización

| Herramienta | Propósito | URL |
|-------------|-----------|-----|
| **Mermaid Live Editor** | Editar diagramas online | https://mermaid.live |
| **VS Code + Mermaid Extension** | Previsualización local | Marketplace VS Code |
| **GitHub** | Renderizado automático | En repositorio |

### Generación

| Herramienta | Propósito |
|-------------|-----------|
| **PlantUML** | Alternativa a Mermaid |
| **Draw.io** | Diagramas más complejos |
| **Lucidchart** | Colaboración en equipo |

---

## 📖 CÓMO USAR ESTE ÍNDICE

### Para Nuevos Desarrolladores

1. **Empieza con**: [Diagrama de Clases](DIAGRAMA_CLASES.md)
   - Entender el modelo de dominio
2. **Luego**: [Casos de Uso por Actor](DIAGRAMA_CASOS_USO.md)
   - Conocer funcionalidades por rol
3. **Después**: [Diagramas de Secuencia](DIAGRAMA_SECUENCIA.md)
   - Ver interacciones detalladas

### Para Arquitectos

1. **Revisar**: [Componentes y Paquetes](DIAGRAMA_COMPONENTES_PAQUETES.md)
   - Arquitectura general
2. **Estudiar**: [Diagrama de Despliegue](DIAGRAMA_DESPLIEGUE.md)
   - Infraestructura cloud
3. **Analizar**: [Máquinas de Estado](DIAGRAMA_ESTADOS.md)
   - Reglas de negocio

### Para QA/Testers

1. **Consultar**: [Casos de Uso](DIAGRAMA_CASOS_USO.md)
   - Definir casos de prueba
2. **Revisar**: [Diagramas de Actividad](DIAGRAMA_ACTIVIDAD.md)
   - Flujos de proceso
3. **Validar**: [Máquinas de Estado](DIAGRAMA_ESTADOS.md)
   - Transiciones válidas

### Para Product Managers

1. **Ver**: [Vista General de Casos de Uso](DIAGRAMA_CASOS_USO.md#vista-general-del-sistema)
   - Todas las funcionalidades
2. **Entender**: [Proceso de Compra](DIAGRAMA_ACTIVIDAD.md#proceso-de-compra-completo)
   - Flujo principal del negocio
3. **Revisar**: [Estados de Pedido](DIAGRAMA_ESTADOS.md#estado-del-pedido)
   - Ciclo de vida del pedido

---

## 🔄 MANTENIMIENTO

### Actualización de Diagramas

**Cuándo actualizar**:
- Cambios en el modelo de datos
- Nuevas funcionalidades
- Cambios en flujos de proceso
- Modificaciones de arquitectura

**Cómo actualizar**:
1. Editar archivo `.md` correspondiente
2. Actualizar diagramas Mermaid
3. Verificar renderizado
4. Actualizar este índice si es necesario
5. Commit con mensaje descriptivo

### Versionado

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **1.0** | 2025-12-04 | Creación inicial de todos los diagramas |

---

## 📋 CHECKLIST DE COMPLETITUD

- [x] Diagrama de Clases
- [x] Diagrama de Componentes
- [x] Diagrama de Paquetes
- [x] Diagrama de Estructura Compuesta
- [x] Diagrama de Despliegue
- [ ] Diagrama de Objetos (no requerido - usar instancias)
- [x] Diagramas de Secuencia (5 principales)
- [x] Diagramas de Actividad (7 flujos)
- [x] Diagramas de Casos de Uso (29 casos)
- [x] Diagramas de Máquinas de Estado (5 entidades)
- [ ] Diagrama de Colaboración (cubierto por secuencia)
- [ ] Diagrama de Resumen de Interacción (cubierto por actividad)
- [ ] Diagrama de Tiempo (no requerido - eventos simples)

### Estado: ✅ COMPLETADO (10/13 tipos UML, 3 no requeridos)

---

## 🔗 ENLACES RELACIONADOS

- **[Mapa de Procesos](../MAPA_DE_PROCESOS.md)** - Vista de procesos de negocio
- **[Documentación de API](../API_DOCUMENTATION.md)** - Endpoints REST
- **[Manual Técnico](../manuales/MANUAL_TECNICO.md)** - Guía técnica completa
- **[Índice General](../INDEX.md)** - Documentación principal

---

**Documento generado**: 2025-12-04  
**Versión**: 1.0  
**Mantenedor**: Equipo de Arquitectura  
**Estado**: ✅ COMPLETADO
