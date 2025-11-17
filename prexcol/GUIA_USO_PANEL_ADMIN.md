# GUIA DE USO: PANEL ADMIN - CREAR Y GESTIONAR USUARIOS

## FLUJO DE TRABAJO

### 1. INICIAR SESION
- Ir a: http://localhost:5173
- Email: admin@example.com
- Contraseña: admin123
- Hacer click en "Ingresar"

### 2. CREAR NUEVO USUARIO
En el panel de admin, en la sección "Crear Nuevo Usuario":

1. **Nombre**: Ej: "Juan Perez"
2. **Email**: Ej: "juan@example.com" (UNICO - no puede repetirse)
3. **Contraseña**: Ej: "mipass123" (obligatorio para crear)
4. **Rol**: Seleccionar de dropdown (admin, cliente, comprador, proveedor, logistica)
5. **Teléfono** (opcional): Ej: "3001234567"
6. **Dirección** (opcional): Ej: "calle 123 #45-67"
7. Click en "Crear Usuario"

**Resultado esperado**:
- Mensaje verde: "Usuario creado exitosamente"
- El nuevo usuario aparece en la tabla "Listado de Usuarios"

### 3. EDITAR USUARIO
En la tabla, hacer click en el botón ✏️ (Edit) del usuario:

1. El formulario se llena con los datos del usuario
2. El título cambia a "Editar Usuario"
3. El campo Email está deshabilitado (no se puede cambiar)
4. Puedes cambiar: Nombre, Rol, Teléfono, Dirección, Contraseña (opcional)
5. Click en "Actualizar Usuario"

**Resultado esperado**:
- Mensaje verde: "Usuario actualizado exitosamente"
- La tabla se actualiza con los nuevos datos
- El botón "Cancelar" vuelve al formulario de crear

### 4. CAMBIAR ESTADO (Activar/Desactivar)
En la tabla, hacer click en el botón 🔒 (bloqueado) o 🔓 (desbloqueado):

- 🔒 significa: Usuario ACTIVO
- 🔓 significa: Usuario INACTIVO
- Al clickear cambia el estado y la fila se ve más gris si está inactiva

**Resultado esperado**:
- Mensaje verde: "Usuario activado" o "Usuario desactivado"
- El botón del estado cambia
- Si está inactivo, la fila se visualiza con menos opacidad

### 5. ELIMINAR USUARIO
En la tabla, hacer click en el botón 🗑️ (Delete):

1. Aparecerá un diálogo de confirmación: "¿Seguro que deseas eliminar este usuario?"
2. Click en "Ok" para confirmar
3. Click en "Cancel" para cancelar

**Resultado esperado**:
- Mensaje verde: "Usuario eliminado exitosamente"
- El usuario desaparece de la tabla

---

## ESTRUCTURA DE LA TABLA

| Columna | Descripción |
|---------|-------------|
| Nombre | Nombre completo del usuario |
| Email | Correo electrónico (único) |
| Rol | Badge de color: admin (azul), cliente (púrpura), etc. |
| Estado | Activo (verde ✓) o Inactivo (rojo ✗) |
| Teléfono | En color azul (#0066cc) |
| Dirección | En color gris, con text-wrap si es muy largo |
| Creación | Fecha en que se registró el usuario |
| Acciones | 3 botones: ✏️ Edit, 🔒🔓 Toggle, 🗑️ Delete |

---

## MENSAJES DE ERROR Y SOLUCIONES

### Error: "La contraseña es requerida para crear nuevo usuario"
- **Causa**: Olvidaste poner contraseña al crear
- **Solución**: Completa el campo "Contraseña"

### Error: "El nombre es requerido"
- **Causa**: El campo nombre está vacío
- **Solución**: Escribe el nombre del usuario

### Error: "El email es requerido"
- **Causa**: El campo email está vacío
- **Solución**: Escribe un email válido

### Error: "No tienes permisos para ver usuarios"
- **Causa**: No estás logueado como admin
- **Solución**: Verifica que hayas iniciado sesión con admin@example.com

### Error: "Tu sesión expiró"
- **Causa**: El token JWT expiró (máximo 1 hora)
- **Solución**: Recarga la página y vuelve a iniciar sesión

---

## DATOS DE PRUEBA EXISTENTES

1. **Admin** 
   - Email: admin@example.com
   - Contraseña: admin123
   - Rol: admin

2. **Test Users** (creados previamente)
   - admin1@test.com
   - test2@test.com
   - test3@test.com
   - test4@test.com
   - test5@test.com

---

## NOTAS TÉCNICAS

### Email es UNICO
- No puedes crear dos usuarios con el mismo email
- Al editar, el email no se puede cambiar

### Contraseña en Edición
- Puedes dejar el campo vacío para NO cambiar la contraseña
- Solo se cambia si escribes una nueva contraseña

### Validaciones
- Email debe ser válido (contener @)
- Nombre es requerido para crear
- Todos los demás campos son opcionales

### Permisos
- Solo ADMIN puede crear, editar, eliminar usuarios
- Los usuarios normales solo pueden VER la lista
- Para ser admin: tener rol='admin' O is_superuser=True

---

## TROUBLESHOOTING

### Los botones de acción no funcionan
1. Abre la consola del navegador (F12)
2. Verifica si hay mensajes de error rojo
3. Revisa que estés logueado como admin
4. Recarga la página (Ctrl+F5)

### La lista de usuarios no se actualiza
1. Espera 1-2 segundos después de la acción
2. Si no se actualiza, recarga la página (F5)
3. Verifica en el navegador que tengas conexión a http://localhost:8000

### El panel está en blanco
1. Asegúrate de que el servidor Django está corriendo: python manage.py runserver
2. Asegúrate de que el frontend está corriendo: npm run dev
3. Verifica que estés en http://localhost:5173

---

**Última actualización**: 16/11/2025
**Estado**: ✅ Funcional y testeado
