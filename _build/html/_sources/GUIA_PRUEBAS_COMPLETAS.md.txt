# PREXCOL - Guía de Pruebas Manuales Completas
# ============================================

## CONFIGURACIÓN INICIAL

### 1. Servidores en ejecución
- Backend: http://localhost:8001 (Django)
- Frontend: http://localhost:5175 (Vite/React)
- Swagger UI: http://localhost:8001/swagger/

### 2. Credenciales de prueba

#### Usuario Administrador
- Email: admin@example.com
- Password: admin123
- Rol: admin

#### Usuario Proveedor (ejemplo)
- Email: proveedor@example.com  
- Password: proveedor123
- Rol: proveedor

#### Usuario Cliente
- Email: cliente@example.com
- Password: cliente123
- Rol: cliente

---

## PRUEBAS PASO A PASO

### FASE 1: Autenticación y Autorización

#### Test 1.1 - Login Exitoso
1. Navegar a http://localhost:5175/login
2. Ingresar email: admin@example.com
3. Ingresar password: admin123
4. Click en el botón "Entrar"
5. ✅ ESPERADO: Redirección a /admin dashboard
6. ✅ ESPERADO: Token guardado en localStorage
7. ✅ ESPERADO: Información de usuario en localStorage

#### Test 1.2 - Login con Credenciales Incorrectas
1. Navegar a http://localhost:5175/login
2. Ingresar email: wrong@example.com
3. Ingresar password: wrongpass
4. Click en "Entrar"
5. ✅ ESPERADO: Mensaje de error visible
6. ✅ ESPERADO: NO redirección

#### Test 1.3 - Registro de Nuevo Usuario
1. Navegar a http://localhost:5175/register
2. Completar formulario:
   - Nombre: Usuario Test
   - Email: test@example.com
   - Password: test123456
   - Confirmar Password: test123456
   - Rol: cliente
3. Click en "Registrarse"
4. ✅ ESPERADO: Mensaje de éxito
5. ✅ ESPERADO: Redirección a login

#### Test 1.4 - Recuperación de Contraseña
1. Navegar a http://localhost:5175/forgot-password
2. Ingresar email: admin@example.com
3. Click en "Enviar"
4. ✅ ESPERADO: Mensaje de confirmación
5. ✅ ESPERADO: Verificar console del backend para link de reset

#### Test 1.5 - Logout
1. Estando autenticado, buscar botón/link de logout
2. Click en logout
3. ✅ ESPERADO: Redirección a /login
4. ✅ ESPERADO: localStorage limpio
5. ✅ ESPERADO: Intentar acceder a /admin → redirige a /login

---

### FASE 2: Dashboard de Administrador

#### Test 2.1 - Acceso al Dashboard Admin
1. Login como admin@example.com
2. ✅ ESPERADO: Ver dashboard de administrador
3. ✅ ESPERADO: Ver estadísticas generales
4. ✅ ESPERADO: Ver lista de productos
5. ✅ ESPERADO: Ver panel de control de usuarios

#### Test 2.2 - Gestión de Productos (Admin)
1. En dashboard admin, navegar a sección "Productos"
2. Click en "Agregar Producto"
3. Completar formulario:
   - Nombre: Producto de Prueba
   - Descripción: Descripción de prueba
   - Precio: 1000
   - Stock: 50
   - Categoría: general
   - Es básico: Sí
4. ✅ ESPERADO: Producto creado exitosamente
5. ✅ ESPERADO: Producto visible en lista

#### Test 2.3 - Editar Producto
1. En lista de productos, click en "Editar" de un producto
2. Modificar el precio a 1500
3. Click en "Guardar"
4. ✅ ESPERADO: Cambios reflejados inmediatamente
5. ✅ ESPERADO: Mensaje de éxito

#### Test 2.4 - Eliminar Producto
1. En lista de productos, click en "Eliminar" de un producto
2. Confirmar eliminación
3. ✅ ESPERADO: Producto removido de la lista
4. ✅ ESPERADO: Mensaje de confirmación

#### Test 2.5 - Asignar Productos a Proveedores
1. Navegar a /admin/asignar-productos
2. Seleccionar un proveedor del dropdown
3. Seleccionar múltiples productos
4. Click en "Asignar"
5. ✅ ESPERADO: Confirmación de asignación
6. ✅ ESPERADO: Productos ahora muestran el proveedor asignado

#### Test 2.6 - Gestión de Usuarios
1. En admin dashboard, navegar a "Usuarios"
2. Ver lista de todos los usuarios
3. ✅ ESPERADO: Ver columnas: nombre, email, rol, estado
4. Click en un usuario para editar
5. Cambiar el rol del usuario
6. ✅ ESPERADO: Cambios guardados correctamente

---

### FASE 3: Catálogo y Productos (Cliente)

#### Test 3.1 - Ver Catálogo Público
1. Logout si está autenticado
2. Navegar a http://localhost:5175/productos
3. ✅ ESPERADO: Ver listado de productos
4. ✅ ESPERADO: Ver filtros por categoría
5. ✅ ESPERADO: Ver barra de búsqueda

#### Test 3.2 - Buscar Productos
1. En catálogo, escribir "galleta" en búsqueda
2. ✅ ESPERADO: Filtrar productos que contengan "galleta"
3. Limpiar búsqueda
4. ✅ ESPERADO: Mostrar todos los productos nuevamente

#### Test 3.3 - Filtrar por Categoría
1. Seleccionar categoría "dulces"
2. ✅ ESPERADO: Mostrar solo productos de dulces
3. Seleccionar "Todas las categorías"
4. ✅ ESPERADO: Mostrar todos los productos

#### Test 3.4 - Ver Detalle de Producto
1. Click en un producto del catálogo
2. ✅ ESPERADO: Ver página de detalle con:
   - Nombre del producto
   - Descripción completa
   - Precio
   - Stock disponible
   - Imágenes (si existen)
   - Botón "Agregar al Carrito"

---

### FASE 4: Carrito de Compras

#### Test 4.1 - Agregar Producto al Carrito
1. Login como cliente@example.com
2. Navegar a catálogo
3. Click en "Agregar al Carrito" en un producto
4. ✅ ESPERADO: Mensaje de confirmación
5. ✅ ESPERADO: Contador de carrito actualizado

#### Test 4.2 - Ver Carrito
1. Click en ícono de carrito o navegar a /cart
2. ✅ ESPERADO: Ver productos agregados
3. ✅ ESPERADO: Ver cantidad de cada producto
4. ✅ ESPERADO: Ver subtotal por producto
5. ✅ ESPERADO: Ver total general

#### Test 4.3 - Modificar Cantidad en Carrito
1. En carrito, incrementar cantidad de un producto
2. ✅ ESPERADO: Subtotal actualizado
3. ✅ ESPERADO: Total general actualizado
4. Decrementar cantidad
5. ✅ ESPERADO: Subtotales actualizados

#### Test 4.4 - Eliminar Producto del Carrito
1. Click en botón eliminar de un producto
2. ✅ ESPERADO: Producto removido
3. ✅ ESPERADO: Total actualizado

#### Test 4.5 - Vaciar Carrito
1. Click en "Vaciar Carrito"
2. Confirmar
3. ✅ ESPERADO: Carrito vacío
4. ✅ ESPERADO: Mensaje indicando carrito vacío

---

### FASE 5: Proceso de Checkout

#### Test 5.1 - Ir a Checkout
1. Agregar productos al carrito
2. Click en "Proceder al Pago" o navegar a /checkout
3. ✅ ESPERADO: Ver resumen de pedido
4. ✅ ESPERADO: Ver campos para dirección de envío
5. ✅ ESPERADO: Ver métodos de pago disponibles

#### Test 5.2 - Completar Checkout
1. Completar dirección de envío
2. Seleccionar método de pago
3. Click en "Confirmar Pedido"
4. ✅ ESPERADO: Pedido creado exitosamente
5. ✅ ESPERADO: Redirección a página de confirmación
6. ✅ ESPERADO: Carrito vaciado
7. ✅ ESPERADO: Notificación enviada

---

### FASE 6: Historial de Pedidos

#### Test 6.1 - Ver Historial (Cliente)
1. Login como cliente
2. Navegar a /orders
3. ✅ ESPERADO: Ver lista de pedidos realizados
4. ✅ ESPERADO: Ver estado de cada pedido
5. ✅ ESPERADO: Ver fecha de cada pedido
6. ✅ ESPERADO: Ver total de cada pedido

#### Test 6.2 - Ver Detalle de Pedido
1. Click en un pedido específico
2. ✅ ESPERADO: Ver productos del pedido
3. ✅ ESPERADO: Ver dirección de envío
4. ✅ ESPERADO: Ver método de pago
5. ✅ ESPERADO: Ver estado actual

---

### FASE 7: Panel de Proveedor

#### Test 7.1 - Acceso al Panel Proveedor
1. Login como proveedor
2. ✅ ESPERADO: Ver dashboard de proveedor
3. ✅ ESPERADO: Ver productos asignados
4. ✅ ESPERADO: Ver estadísticas de ventas

#### Test 7.2 - Gestión de Stock (Proveedor)
1. En panel proveedor, ver lista de productos
2. Click en "Ajustar Stock" de un producto
3. Modificar cantidad
4. ✅ ESPERADO: Stock actualizado
5. ✅ ESPERADO: Reflejo inmediato en catálogo

#### Test 7.3 - Ver Ventas de Productos Propios
1. Navegar a sección "Mis Ventas"
2. ✅ ESPERADO: Ver solo ventas de productos asignados a este proveedor
3. ✅ ESPERADO: Ver detalles de cada venta
4. ✅ ESPERADO: Ver totales y estadísticas

---

### FASE 8: Panel de Logística

#### Test 8.1 - Ver Pedidos en Preparación
1. Login como usuario logística
2. Navegar a panel de logística
3. ✅ ESPERADO: Ver pedidos pendientes/en preparación
4. ✅ ESPERADO: Ver detalles de envío

#### Test 8.2 - Cambiar Estado de Pedido
1. Seleccionar un pedido pendiente
2. Cambiar estado a "En tránsito"
3. ✅ ESPERADO: Estado actualizado
4. ✅ ESPERADO: Notificación enviada al cliente
5. ✅ ESPERADO: Pedido movido a sección correspondiente

---

### FASE 9: Notificaciones

#### Test 9.1 - Ver Notificaciones
1. Login con cualquier usuario
2. Navegar a /notifications
3. ✅ ESPERADO: Ver lista de notificaciones
4. ✅ ESPERADO: Distinguir entre leídas y no leídas
5. ✅ ESPERADO: Ver contador de no leídas

#### Test 9.2 - Marcar como Leída
1. Click en una notificación no leída
2. ✅ ESPERADO: Marcada como leída
3. ✅ ESPERADO: Contador actualizado
4. ✅ ESPERADO: Estilo visual cambiado

---

### FASE 10: Perfil y Configuración

#### Test 10.1 - Ver Perfil
1. Navegar a /profile
2. ✅ ESPERADO: Ver datos del usuario actual
3. ✅ ESPERADO: Nombre, email, rol, etc.

#### Test 10.2 - Editar Perfil
1. Click en "Editar Perfil"
2. Modificar nombre o dirección
3. Click en "Guardar"
4. ✅ ESPERADO: Cambios guardados
5. ✅ ESPERADO: Datos actualizados en perfil

#### Test 10.3 - Cambiar Contraseña
1. En configuración, buscar "Cambiar Contraseña"
2. Ingresar contraseña actual
3. Ingresar nueva contraseña
4. Confirmar nueva contraseña
5. Click en "Actualizar"
6. ✅ ESPERADO: Contraseña actualizada
7. ✅ ESPERADO: Poder hacer login con nueva contraseña

---

### FASE 11: Pagos

#### Test 11.1 - Ver Historial de Pagos
1. Navegar a /payments
2. ✅ ESPERADO: Ver lista de pagos realizados
3. ✅ ESPERADO: Ver estado de cada pago
4. ✅ ESPERADO: Ver método de pago usado

#### Test 11.2 - Ver Detalle de Pago
1. Click en un pago específico
2. ✅ ESPERADO: Ver monto total
3. ✅ ESPERADO: Ver pedido asociado
4. ✅ ESPERADO: Ver fecha y hora
5. ✅ ESPERADO: Ver estado de transacción

---

### FASE 12: Swagger API (Documentación)

#### Test 12.1 - Acceder a Swagger
1. Navegar a http://localhost:8001/swagger/
2. ✅ ESPERADO: Ver interfaz de Swagger UI
3. ✅ ESPERADO: Ver todos los endpoints documentados
4. ✅ ESPERADO: Ver modelos/esquemas

#### Test 12.2 - Autenticar en Swagger
1. Login en frontend para obtener token
2. Copiar access token del localStorage o de respuesta de login
3. En Swagger, click en "Authorize"
4. Ingresar: Bearer [TOKEN]
5. Click en "Authorize"
6. ✅ ESPERADO: Autenticación exitosa
7. ✅ ESPERADO: Candado cerrado en endpoints protegidos

#### Test 12.3 - Probar Endpoints en Swagger
1. Expandir endpoint GET /api/productos/productos/
2. Click en "Try it out"
3. Click en "Execute"
4. ✅ ESPERADO: Ver respuesta con lista de productos
5. ✅ ESPERADO: Código 200
6. ✅ ESPERADO: JSON bien formateado

#### Test 12.4 - Crear Producto via Swagger
1. Autenticarse con token de admin
2. Expandir POST /api/productos/productos/
3. Click en "Try it out"
4. Llenar JSON de ejemplo con datos válidos
5. Click en "Execute"
6. ✅ ESPERADO: Código 201 Created
7. ✅ ESPERADO: Producto creado visible en frontend

---

### FASE 13: Responsividad y UX

#### Test 13.1 - Diseño Responsive
1. Abrir DevTools (F12)
2. Activar modo responsive
3. Probar diferentes tamaños:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
4. ✅ ESPERADO: Layout se adapta correctamente
5. ✅ ESPERADO: Navegación funcional en mobile
6. ✅ ESPERADO: Botones accesibles en touch

#### Test 13.2 - Animaciones y Transitions
1. Navegar entre páginas
2. ✅ ESPERADO: Transiciones suaves
3. Hacer hover en botones
4. ✅ ESPERADO: Efectos visuales apropiados
5. ✅ ESPERADO: Loading states visibles

---

### FASE 14: Manejo de Errores

#### Test 14.1 - Error de Red
1. Detener el backend
2. Intentar login en frontend
3. ✅ ESPERADO: Mensaje de error claro
4. ✅ ESPERADO: NO crash de la aplicación
5. ✅ ESPERADO: Posibilidad de reintentar

#### Test 14.2 - Token Expirado
1. Login exitoso
2. Manualmente modificar token en localStorage para que sea inválido
3. Intentar acceder a un endpoint protegido
4. ✅ ESPERADO: Redirección a login
5. ✅ ESPERADO: Mensaje explicativo

#### Test 14.3 - 404 Not Found
1. Navegar a ruta inexistente: /ruta-que-no-existe
2. ✅ ESPERADO: Redirección a home o página 404
3. ✅ ESPERADO: NO pantalla en blanco

---

## CHECKLIST FINAL

### Backend (Django/DRF)
- [ ] Servidor corriendo en puerto 8001
- [ ] Base de datos con datos de prueba
- [ ] Todos los endpoints respondiendo correctamente
- [ ] JWT tokens generándose correctamente
- [ ] CORS configurado para puerto 5175
- [ ] Swagger UI accesible y funcional

### Frontend (React/Vite)
- [ ] Servidor corriendo en puerto 5175
- [ ] .env apuntando a http://127.0.0.1:8001/api
- [ ] Login funcional
- [ ] Registro funcional
- [ ] Routing funcionando correctamente
- [ ] Protected routes verificando autenticación
- [ ] Todos los dashboards accesibles según rol
- [ ] Catálogo mostrando productos
- [ ] Carrito funcionando
- [ ] Checkout completándose exitosamente

### Integración
- [ ] Frontend se comunica con backend sin errores
- [ ] Tokens JWT almacenándose y enviándose correctamente
- [ ] Refresh token funcionando
- [ ] Logout limpiando sesión completamente
- [ ] Notificaciones siendo creadas y mostradas
- [ ] Imágenes de productos cargando (si existen)

---

## COMANDOS ÚTILES

### Ver logs del backend
```bash
# En terminal donde corre Django
# Los logs aparecen automáticamente
```

### Ver logs del frontend
```bash
# Abrir DevTools (F12) → Console
# Ver errores en tiempo real
```

### Ver tokens almacenados
```javascript
// En DevTools Console
localStorage.getItem('token')
localStorage.getItem('refresh')
localStorage.getItem('user')
```

### Limpiar localStorage
```javascript
// En DevTools Console
localStorage.clear()
```

---

## REPORTE DE BUGS

Si encuentras un bug, documéntalo así:

**Título del Bug:**
**Pasos para Reproducir:**
1. 
2. 
3. 

**Resultado Esperado:**

**Resultado Actual:**

**Capturas de Pantalla:**

**Logs de Consola:**

---

## NOTAS IMPORTANTES

1. Siempre verificar que ambos servidores (backend y frontend) estén corriendo
2. Si hay problemas de autenticación, limpiar localStorage y volver a intentar
3. Para probar con diferentes roles, necesitas usuarios con esos roles en la BD
4. Los productos de prueba se crean al ejecutar create_test_products.py
5. El admin@example.com tiene acceso completo a todo el sistema

---

**Fecha de creación:** 2025-12-01
**Versión:** 1.0
**Estado:** ✅ Listo para Pruebas
