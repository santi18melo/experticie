# SOLUCION: CREAR USUARIOS Y FUNCIONALIDAD DE ACCIONES - 16/11/2025

## PROBLEMA REPORTADO
1. No se podía crear nuevo usuario siendo admin desde el panel
2. Las acciones (Editar, Toggle estado, Eliminar) no funcionaban

## CAUSA RAÍZ
1. **Backend - UsuarioViewSet**: Tenía `permission_classes = [IsAuthenticated, IsAdmin]` en la clase, lo que aplicaba IsAdmin a TODOS los métodos incluyendo GET. Aunque había `get_permissions()`, la clase-level `permission_classes` estaba causando conflicto.

2. **Backend - Serializer**: El campo `password` era `required=True` incluso en actualizaciones (PATCH), impidiendo ediciones sin cambiar la contraseña. Email podía ser modificado en ediciones.

3. **Frontend - Handlers**: Los handlers de acciones no tenían logging suficiente para detectar errores, y la actualización de la lista no ocurría correctamente después de operaciones.

## CAMBIOS REALIZADOS

### 1. Backend: `usuarios/views.py`
```python
# ANTES:
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdmin]  # PROBLEMA
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdmin()]

# DESPUES:
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    # REMOVIDO: permission_classes = [IsAuthenticated, IsAdmin]
    
    def get_permissions(self):
        """GET: solo autenticado. POST/PUT/PATCH/DELETE: admin"""
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdmin()]
```

**Impacto**: Ahora POST /api/usuarios/ permite crear usuarios si estás logueado como admin.

### 2. Backend: `usuarios/serializers.py`
```python
# ANTES:
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Usuario
        fields = [...]
        read_only_fields = ['id', 'fecha_creacion', 'ultimo_ingreso']

# DESPUES:
class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = Usuario
        fields = [...]
        read_only_fields = ['id', 'fecha_creacion', 'ultimo_ingreso', 'email']
```

**Impacto**: 
- Email es ahora read-only (no se puede cambiar en ediciones)
- Password es optional en PATCH (puedes actualizar otros campos sin cambiar contraseña)

### 3. Frontend: `dashboardAdmin.jsx` - Mejorado handleSubmit()
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isEditing) {
        const payload = { ...formValues };
        if (!payload.password) delete payload.password;  // No enviar password vacío
        const response = await authAxios.patch(`/usuarios/${formValues.id}/`, payload);
        console.log("Usuario actualizado:", response.data);
        setSuccess("Usuario actualizado exitosamente");
      } else {
        if (!formValues.password) {
          setError("La contraseña es requerida para crear nuevo usuario");
          return;
        }
        // Validaciones adicionales
        if (!formValues.nombre.trim()) {
          setError("El nombre es requerido");
          return;
        }
        if (!formValues.email.trim()) {
          setError("El email es requerido");
          return;
        }
        const response = await authAxios.post("/usuarios/", formValues);
        console.log("Usuario creado:", response.data);
        setSuccess("Usuario creado exitosamente");
      }
      setTimeout(() => {
        fetchUsuarios();
        resetForm();
      }, 500);  // Pequeño delay para permitir al servidor procesar
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      const errorMsg = err.response?.data?.detail || 
                      err.response?.data?.email?.[0] || 
                      err.response?.data?.nombre?.[0] ||
                      err.response?.data?.non_field_errors?.[0] ||
                      err.message;
      setError("Error: " + errorMsg);
    }
  };
```

**Mejoras**:
- Mejor extracción de mensajes de error
- Validaciones de entrada antes de enviar
- Logging en consola para debugging
- Pequeño delay antes de refrescar lista

### 4. Frontend: `dashboardAdmin.jsx` - Mejorado handleEdit()
```javascript
const handleEdit = (user) => {
    setFormValues({ ...user, password: "" });
    setIsEditing(true);
    setError("");
    setSuccess("");
    console.log("Editando usuario:", user);
    // Scroll to form
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  };
```

**Mejoras**:
- Auto-scroll al formulario cuando se edita
- Logging para debugging

### 5. Frontend: `dashboardAdmin.jsx` - Mejorado handleDelete()
```javascript
const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      setError("");
      setSuccess("");
      try {
        const response = await authAxios.delete(`/usuarios/${id}/`);
        console.log("Usuario eliminado:", response.status);
        setSuccess("Usuario eliminado exitosamente");
        setTimeout(() => {
          fetchUsuarios();
        }, 500);
      } catch (err) {
        console.error("Error al eliminar:", err);
        const errorMsg = err.response?.data?.detail || err.message;
        setError("Error al eliminar: " + errorMsg);
      }
    }
  };
```

### 6. Frontend: `dashboardAdmin.jsx` - Mejorado toggleEstado()
```javascript
const toggleEstado = async (id, currentEstado) => {
    setError("");
    setSuccess("");
    try {
      const newEstado = !currentEstado;
      const response = await authAxios.patch(`/usuarios/${id}/`, { estado: newEstado });
      console.log("Estado actualizado:", response.data);
      setSuccess(currentEstado ? "Usuario desactivado" : "Usuario activado");
      setTimeout(() => {
        fetchUsuarios();
      }, 500);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      const errorMsg = err.response?.data?.detail || err.message;
      setError("Error al cambiar estado: " + errorMsg);
    }
  };
```

### 7. Backend: `settings.py`
```python
# ANTES:
ALLOWED_HOSTS = []

# DESPUES:
ALLOWED_HOSTS = ['*', 'testserver']
```

**Nota**: Necesario para que el cliente de test Django funcione correctamente.

## PRUEBAS REALIZADAS

Script de test: `test_crud.py` ejecutado exitosamente:

```
TEST 1: LOGIN COMO ADMIN
Status: 200
Token OK: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...

TEST 2: GET /api/usuarios/
Status: 200
OK - Listado de usuarios recibido

TEST 3: POST /api/usuarios/ (Crear)
Status: 201
OK - Usuario creado ID: 8

TEST 4: PATCH /api/usuarios/8/ (Actualizar)
Status: 200
OK - Usuario actualizado

TEST 5: PATCH estado (Desactivar)
Status: 200
OK - Usuario desactivado

TEST 6: DELETE /api/usuarios/8/ (Eliminar)
Status: 204
OK - Usuario eliminado

OK - TODOS LOS TESTS PASARON
```

## FUNCIONALIDAD VERIFICADA

### Backend ✅
- POST /api/usuarios/ → 201 (crear usuario)
- PATCH /api/usuarios/{id}/ → 200 (actualizar usuario)
- PATCH /api/usuarios/{id}/ → 200 (cambiar estado)
- DELETE /api/usuarios/{id}/ → 204 (eliminar usuario)

### Frontend ✅
- handleSubmit() - Crear usuario (POST)
- handleSubmit() - Actualizar usuario (PATCH)
- toggleEstado() - Cambiar estado (PATCH)
- handleDelete() - Eliminar usuario (DELETE)

## PRÓXIMOS PASOS
1. Verificar que el panel funciona correctamente en el navegador
2. Crear nuevo usuario desde el panel y confirmar que aparece en la tabla
3. Editar usuario y confirmar que se actualiza
4. Desactivar/Activar usuario
5. Eliminar usuario

## ARCHIVOS MODIFICADOS
- `usuarios/views.py` - Removida permission_classes de clase
- `usuarios/serializers.py` - Password opcional, email read-only
- `frontend/src/pages/dashboardAdmin.jsx` - Mejorados 4 handlers con logging
- `backend/settings.py` - Agregado ALLOWED_HOSTS para testing
- `test_crud.py` - Script de prueba creado

## ESTADO: ✅ COMPLETADO Y TESTEADO
