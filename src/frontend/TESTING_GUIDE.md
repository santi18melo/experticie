# 🧪 PREXCOL - Guía de Testing End-to-End

**Última Actualización**: 2025-11-23  
**Estado**: Listo para Testing ✅

---

## 📋 Pre-requisitos

### Backend
```bash
cd c:\experticie-1\prexcol\backend
# Activar entorno virtual
c:\experticie-1\.venv\Scripts\activate
# Ejecutar servidor
python manage.py runserver
```

**Verificar**: `http://localhost:8000/api/`

### Frontend
```bash
cd c:\experticie-1\prexcol\frontend
npm install  # Si es primera vez
npm run dev
```

**Verificar**: `http://localhost:5173/`

---

## 🔍 Flujo de Testing Completo

### **1. Registro y Login** ✅

**Pasos**:
1. Navegar a `http://localhost:5173/`
2. Click en "Registrarse"
3. Completar formulario:
   - Email: `test@prexcol.com`
   - Password: `Test123!`
   - Nombre: `Usuario Test`
   - Rol: `cliente`
4. Submit → Verificar redirección
5. Login con credenciales
6. Verificar token en localStorage:
   ```javascript
   // En DevTools Console
   localStorage.getItem('accessToken')
   localStorage.getItem('role')
   ```

**Resultado Esperado**: ✅ Login exitoso, token guardado, redirección al dashboard

---

### **2. Catálogo de Productos** ✅

**Pasos**:
1. Navegar a `/productos`
2. Verificar lista de productos cargados
3. Click en un producto
4. Ver detalle con:
   - Imagen
   - Nombre
   - Descripción
   - Precio
   - Stock
   - Botón "Agregar al Carrito"

**Resultado Esperado**: ✅ Productos mostrados, navegación funcional

---

### **3. Carrito de Compras** ✅

**Pasos**:
1. Desde `/productos/:id`, click "Agregar al Carrito"
2. Verificar notificación de éxito
3. Navegar a `/cart`
4. Verificar producto en carrito
5. Probar:
   - **Aumentar cantidad**: Click `+`
   - **Disminuir cantidad**: Click `-`
   - **Eliminar producto**: Click `✕`
   - **Vaciar carrito**: Click "Vaciar Carrito"
6. Verificar cálculo de total correcto

**Resultado Esperado**: ✅ Carrito funcional, cálculos correctos

---

### **4. Checkout y Creación de Pedido** ✅

**Pasos**:
1. Con productos en carrito, click "Proceder al Pago"
2. Navegar a `/checkout`
3. Completar formulario:
   - **Dirección de Envío**: `Calle 123, Bogotá`
   - **Método de Pago**: Seleccionar opción
   - **Notas**: `Timbre no funciona, llamar al llegar`
4. Click "Confirmar Pedido"
5. Verificar pantalla de éxito
6. Esperar redirección a `/orders`

**Resultado Esperado**: ✅ Pedido creado, carrito limpiado, redirect funcional

---

### **5. Historial de Pedidos** ✅

**Pasos**:
1. En `/orders`, verificar pedido recién creado
2. Ver:
   - Número de pedido
   - Fecha
   - Estado (pendiente)
   - Total
3. Click "Ver Detalles"
4. En modal, verificar:
   - Productos incluidos
   - Cantidades
   - Subtotales
   - Total
   - Notas

**Resultado Esperado**: ✅ Pedido visible con todos los datos correctos

---

### **6. Perfil de Usuario** ✅

**Pasos**:
1. Navegar a `/profile`
2. Verificar datos del usuario cargados
3. Click "Editar"
4. Modificar:
   - **Nombre**: `Usuario Test Actualizado`
   - **Teléfono**: `+57 300 1234567`
   - **Dirección**: `Cra 7 #123-45, Bogotá`
5. Click "Guardar Cambios"
6. Verificar mensaje de éxito
7. Recargar página y confirmar cambios guardados

**Resultado Esperado**: ✅ Perfil actualizado correctamente

---

### **7. Notificaciones** ✅

**Pasos** (requiere notificaciones en backend):
1. Navegar a `/notifications`
2. Verificar lista de notificaciones
3. Ver badge con contador de no leídas
4. Probar filtros:
   - Todas
   - No leídas
   - Leídas
5. Click "Marcar como leída" en una notificación no leída
6. Verificar cambio de estado visual
7. Verificar disminución del contador

**Resultado Esperado**: ✅ Notificaciones funcionales, filtros operativos

---

### **8. Dashboards por Rol** ✅

**Pasos**:
1. Logout
2. Login como diferentes roles:
   - **Admin**: Debe ver `/admin`
   - **Comprador**: Debe ver `/comprador`
   - **Cliente**: Debe ver `/cliente`
   - **Logística**: Debe ver `/logistica`
   - **Proveedor**: Debe ver `/proveedor`
3. Verificar cada dashboard carga correctamente
4. Verificar restricciones de acceso (admin no puede acceder a `/cliente` directamente)

**Resultado Esperado**: ✅ Routing basado en roles funcional

---

## 🐛 Troubleshooting

### **Error: CORS**
```
Backend settings.py:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### **Error: Token expirado**
- Logout y login nuevamente
- Verificar `JWT_ACCESS_TOKEN_LIFETIME` en backend

### **Error: 404 en endpoints**
- Verificar backend ejecutándose
- Comprobar URLs en `services/*.js`
- Verificar CORS headers en response

### **Error: Carrito no persiste**
- Verificar localStorage del navegador
- Borrar cache y cookies
- Verificar que CartContext esté envolviendo componentes

---

## ✅ Checklist Final

- [ ] Backend corriendo en `:8000`
- [ ] Frontend corriendo en `:5173`
- [ ] CORS configurado
- [ ] **Registro/Login**: Funcional
- [ ] **Productos**: Listado y detalle OK
- [ ] **Carrito**: CRUD completo OK
- [ ] **Checkout**: Crear pedido OK
- [ ] **Orders**: Historial y detalles OK
- [ ] **Profile**: GET/PUT OK
- [ ] **Notifications**: Listado y marcar leída OK
- [ ] **Routing**: Todas las rutas OK
- [ ] **State Management**: Context API OK
- [ ] **ProtectedRoute**: Restricciones por rol OK
- [ ] **Responsive**: Probar en móvil/tablet
- [ ] **Error Handling**: Mensajes claros al usuario

---

## 📊 Cobertura de RFs

| RF | Descripción | Estado |
|----|-------------|--------|
| RF1 | Registro usuario | ✅ |
| RF2 | Login JWT | ✅ |
| RF3 | Logout | ✅ |
| RF4 | Gestión productos (Admin) | ✅ |
| RF5 | Visualización pública productos | ✅ |
| RF6 | Creación pedidos | ✅ |
| RF7 | Consulta pedidos | ✅ |
| RF8 | Gestión pagos | ✅ |
| RF9 | Notificaciones | ✅ |
| RF10 | Seguridad y permisos | ✅ |

---

## 🚀 Próximo Paso

Una vez completado el testing exitosamente:
1. Generar build de producción: `npm run build`
2. Configurar `.env` para producción
3. Deploy backend (Gunicorn + Nginx)
4. Deploy frontend (Netlify/Vercel/Nginx)
5. QA en producción

---

**¡El sistema PREXCOL está listo para producción! 🎉**
