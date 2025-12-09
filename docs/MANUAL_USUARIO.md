# Manual de Usuario - PREXCOL

## 1. Experiencia de Usuario (UX/UI)

La interfaz de PREXCOL ha sido estandarizada para ofrecer una experiencia moderna, consistente y accesible.

### Sistema de Diseño
Hemos implementado un sistema de diseño "Atómico" que asegura coherencia visual en toda la plataforma:
- **Botones**: Acciones claras con variantes (Primario, Secundario, Peligro) y retroalimentación visual al pasar el mouse.
- **Tarjetas**: Contenedores limpios con sombras suaves para agrupar información relevante.
- **Formularios**: Campos de entrada estandarizados con validación visual inmediata.
- **Tipografía**: Jerarquía clara de títulos y textos para facilitar la lectura.

### Navegación
La barra de navegación superior (`Navbar`) es su centro de control. Se adapta automáticamente a su dispositivo (móvil o escritorio) y muestra solo las opciones relevantes para su rol (Administrador, Logística, Cliente, etc.).

## 2. Funcionalidades Clave

### Panel de Logística y Mapas
El nuevo **Panel de Logística** permite gestionar los pedidos en preparación de manera visual y eficiente.

#### Uso del Mapa Interactivo
- **Visualización**: Al ingresar al panel, verá un mapa interactivo en la parte superior.
- **Marcadores**: Cada marcador en el mapa representa un pedido en preparación.
    - **Ubicación**: Muestra la ubicación aproximada del cliente o destino.
    - **Detalles**: Al hacer clic en un marcador, se despliega una ventana con el número de pedido y su estado.
- **Manejo de Errores**: Si el mapa no puede cargar (por ejemplo, por problemas de conexión), verá una tarjeta informativa con un botón para "Reintentar", asegurando que su trabajo no se detenga.

#### Gestión de Pedidos
Debajo del mapa, encontrará la lista de pedidos. Puede:
1. **Filtrar**: Use los botones para ver "Todos", "Con Básicos" o "Sin Básicos".
2. **Seleccionar**: Haga clic en una tarjeta de pedido para ver sus detalles completos a la derecha (o abajo en móviles).
3. **Accionar**: Cambie el estado del pedido a "En Tránsito" o "Entregado" con un solo clic.

### Verificación de Diseño
Puede visitar la página `/design-system` para ver una galería de todos los componentes visuales disponibles y verificar la consistencia de la marca.
