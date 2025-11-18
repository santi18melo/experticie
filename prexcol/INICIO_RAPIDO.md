GUÍA RÁPIDA DE INICIO
Paso 1: Verificar que Todo Esté Correcto
cd /ruta/a/tu/proyecto

# Activar entorno virtual
venv\Scripts\activate

# Ejecutar verificación
python verify_backend.py
Resultado esperado: 8/8 verificaciones pasadas
Paso 2: Iniciar Backend (Terminal 1)
# Si no está activado el venv
cd /ruta/a/tu/proyecto
venv\Scripts\activate

# Iniciar servidor Django
python manage.py runserver


Salida esperada:

Quit the server with CTRL-BREAK.
Starting development server at http://127.0.0.1:8000/

Paso 3: Iniciar Frontend (Terminal 2)
cd /ruta/a/tu/proyecto/frontend

# Instalar dependencias si aún no están instaladas
npm install

# Iniciar Vite
npm run dev


Salida esperada:

➜  Local:   http://localhost:5173/
➜  Press h to show help

Paso 4: Acceder a la Aplicación

Abrir navegador

URL: http://localhost:5173

Login con credenciales admin

Email: admin@example.com

Contraseña: admin123

Ver Dashboard

Estadísticas del sistema

Usuarios activos

Distribución de roles

 Pruebas de API (Terminal 3)
Opción A: Usar el script de prueba
cd /ruta/a/tu/proyecto
python test_api.py

Opción B: Usar curl

1. Registrar nuevo usuario:

curl -X POST http://127.0.0.1:8000/api/auth/register/ ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"nuevo@example.com\",\"nombre\":\"Nuevo Usuario\",\"password\":\"pass123\",\"rol\":\"cliente\"}"


2. Login:

curl -X POST http://127.0.0.1:8000/api/auth/login/ ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"


3. Acceder al dashboard (reemplazar TOKEN):

curl -H "Authorization: Bearer TOKEN" ^
  http://127.0.0.1:8000/api/dashboard/admin/

Opción C: Usar Postman

Importar colección o crear manualmente

Endpoints disponibles:

POST /api/auth/register/

POST /api/auth/login/

POST /api/auth/refresh/

GET /api/dashboard/admin/ (requiere token admin)

GET /api/cliente/tienda/ (requiere token)

 Admin Django

Acceder a: http://127.0.0.1:8000/admin

Credenciales:

Usuario: admin@example.com

Contraseña: admin123

Aquí puedes:

Gestionar usuarios

Ver logs

Cambiar roles

Activar/desactivar usuarios

 Debugging
Si algo no funciona...
1. Verificar que los servicios estén corriendo
# Backend debe estar en puerto 8000
netstat -ano | findstr :8000

# Frontend debe estar en puerto 5173
netstat -ano | findstr :5173

2. Ver logs de Django

Revisar la salida en la terminal del backend

3. Ver logs del navegador

Abrir DevTools (F12) → Console

4. Verificar BD
python manage.py shell
from usuarios.models import Usuario
print(Usuario.objects.all())

5. Verificar tokens
# En consola del navegador
localStorage.getItem('token')

 Archivos de Configuración Importantes
backend/settings.py          ← Configuración global Django
usuarios/models.py           ← Modelo Usuario
usuarios/serializers.py      ← Validación de datos
usuarios/views.py            ← Lógica de endpoints
usuarios/permissions.py      ← Permisos por rol
usuarios/urls.py             ← Rutas de API

frontend/src/App.jsx         ← App principal React
frontend/src/main.jsx        ← Entry point
frontend/vite.config.js      ← Config Vite

 Problemas Comunes y Soluciones
Error: "Module not found"
pip install -r requirements.txt

Error: "CORS error"

Verificar que frontend esté en http://localhost:5173

Revisar CORS_ALLOWED_ORIGINS en backend/settings.py

Error: "401 Unauthorized"

El token expiró (válido 1 hora)

Haz login nuevamente

Error: "Port already in use"

Backend: python manage.py runserver 8001

Frontend: npm run dev -- --port 5174

Error: "Database locked"

Cierra todas las conexiones a la BD

Intenta nuevamente

 Documentación Adicional

README.md - Guía completa

BACKEND_FIXES.md - Detalles técnicos

RESUMEN_EJECUTIVO.md - Resumen ejecutivo

CORRECTIONS_CHECKLIST.md - Checklist detallado

 Flujo de Uso
1. Abre http://localhost:5173
   ↓
2. Ves página de login
   ↓
3. Haz click en "Regístrate" O login con admin
   ↓
4. Si registras:
   - Completa formulario
   - El backend valida y hashea contraseña
   - Te redirige a login
   ↓
5. Login:
   - Envías email + contraseña
   - Backend verifica contraseña
   - Retorna JWT tokens
   - Se guardan en localStorage
   ↓
6. Accedes a Dashboard:
   - Frontend envía token en header
   - Backend valida token
   - Retorna estadísticas
   - Se muestran en pantalla
   ↓
7. Token expira después 1 hora
   - Frontend detecta 401
   - Usa refresh token automáticamente
   - Obtiene nuevo access token
   - Reintentas la request

 Próximos Pasos

Después de verificar que todo funciona:

Crear más usuarios con diferentes roles

Probar las rutas según el rol

Explorar la BD en el admin

Hacer cambios en el frontend/backend

Integrar otras apps (pedidos, productos, ventas)

 Tips

Mantén ambos servidores corriendo mientras desarrollas

Usa DevTools para ver las requests/responses

Usa Django admin para gestionar datos

Revisa los logs regularmente

Haz commit después de cambios importantes

¡Todo está listo! Comienza a desarrollar. 
