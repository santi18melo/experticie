GUÍA RÁPIDA DE INICIO Paso 1: Verificar que Todo Esté Correcto cd /ruta/a/tu/proyecto

Instalar venv
python -m venv .venv
Activar entorno virtual
.\.venv\Scripts\Activate.ps1

Ejecutar verificación
python verificar_backend.py Resultado esperado: 8/8 verificaciones pasadas Paso 2: Iniciar Backend (Terminal 1)

En caso de que no lo verifique:
Get-ChildItem -Path C:\experticie -Recurse -Filter "verificar_backend.py"

Si no está activado el venv
cd C:\experticie .venv\Scripts\Activate.ps1

Instalar dependencias:
pip install -r requirements.txt

Iniciar servidor Django
cd C:\experticie\prexcol
python manage.py runserver

Salida esperada:

Salga del servidor con CTRL+BREAK. Iniciando servidor de desarrollo en http://127.0.0.1:8000/

Paso 3: Iniciar Frontend (Terminal 2) cd C:\experticie\prexcol

Instalar dependencias si aún no están instaladas
C:\experticie\prexcol\frontend> 
npm install

Iniciar Vite
npm run dev

Para iniciar Vite en celular: 
npm run dev -- --host

Salida esperada:

➜ Local: http://localhost:5173/ ➜ Pulsa h para ver la ayuda

Paso 4: Acceder a la Aplicación

Visitantemente, la misma ciudadana de la ciudad fue una vez más común en la misma zona de distribución de alimentos.

URL: http://localhost:5173

Iniciar sesión con credenciales de administrador

Correo electrónico: admin@example.com

Contraseña: admin123

Ver panel de control

del sistema

investigadores activos

distribución de roles

Pruebas de API (Terminal 3) Opción A: Usar el script de prueba cd /ruta/a/tu/proyecto python test_api.py

Opción B: Usar curl

Registrar nuevo usuario:
curl -X POST http://127.0.0.1:8000/api/auth/register/ ^ -H "Content-Type: application/json" ^ -d "{"email":" nuevo@example.com ","nombre":"Nuevo Usuario","password":"pass123","rol":"cliente"}"

Acceso:
curl -X POST http://127.0.0.1:8000/api/auth/login/ ^ -H "Content-Type: application/json" ^ -d "{"email: admin@example.com ","password: admin123"}"

Acceder al panel (reemplazar TOKEN):
curl -H "Autorización: Token de portador" ^ http://127.0.0.1:8000/api/dashboard/admin/

Opción C: Usar Postman

Importar colección o crear manualmente

Puntos de conexión disponibles:

POST /api/auth/register/

POST /api/auth/login/

POST /api/auth/refresh/

GET /api/dashboard/admin/ (requiere administrador de token)

GET /api/cliente/tienda/ (requiere token)

Administrador de Django

Acceda a: http://127.0.0.1:8000/admin

Credenciales:

Usuario: admin@example.com

Contraseña: admin123

Aquí puedes:

Gestionar usuarios

Ver registros

Cambiar roles

Activar/desactivar usuarios

Depuración Si algo no funciona...

Verificar que los servicios estén corriendo
El backend debe estar en puerto 8000
netstat -ano | findstr :8000

El frontend debe estar en puerto 5173
netstat -ano | findstr :5173

Ver registros de Django
Revisar la salida en la terminal del backend

Ver registros del navegador
Abrir DevTools (F12) → Consola

Verificar BD python manage.py shell from usuarios.models import Usuario print(Usuario.objects.all())

Verificar tokens

En la consola del navegador
localStorage.getItem('token')

Archivos de Configuración Importantes backend/settings.py ← Configuración global Django usuarios/models.py ← Modelo Usuario usuarios/serializers.py ← Validación de datos usuarios/views.py ← Lógica de endpoints usuarios/permissions.py ← Permisos por rol usuarios/urls.py ← Rutas de API

frontend/src/App.jsx ← Aplicación principal React frontend/src/main.jsx ← Punto de entrada frontend/vite.config.js ← Configuración de Vite

Problemas Comunes y Soluciones Error: "Módulo no encontrado" pip install -r requisitos.txt

Error: "Error CORS"

Verifique que el frontend esté en http://localhost:5173

Revisar CORS_ALLOWED_ORIGINS en backend/settings.py

Error: "401 No autorizado"

El token expiró (válido 1 hora)

Haz iniciar sesión nuevamente

Error: "Puerto ya en uso"

Backend: Python Manage.py RunServer 8001

Frontend: npm run dev -- --port 5174

Error: "Base de datos bloqueada"

Cierra todas las conexiones a la BD

Intenta nuevamente

Documentación Adicional

README.md - Guía completa

BACKEND_FIXES.md - Detalles técnicos

RESUMEN_EJECUTIVO.md - Resumen ejecutivo

CORRECTIONS_CHECKLIST.md - Lista de verificación detallada

Flujo de Uso

Abre http://localhost:5173 ↓
Ves página de login ↓
Haz clic en "Regístrate" o inicia sesión con admin ↓
Si registras:
Formulario completo
El backend valida y hashea contraseña
Te redirige a login ↓
Acceso:
Envía correo electrónico + contraseña
Verificación de backend
tokens JWT de Retorna
Se guardan en localStorage ↓
Acceda a un panel de control:
Frontend envía token en encabezado
token de validación de backend
Retorna
Se muestran en pantalla ↓
El token caduca después de 1 hora
El frontend detecta un error 401.
Usa el token de actualización automáticamente
Obtén un nuevo token de acceso
Reintentas la request
Próximos Pasos

Después de verificar que todo funciona:

Crear más usuarios con diferentes roles

Probar las rutas según el rol

Explorar la BD en el admin

Hacer cambios en el frontend/backend

Integrar otras apps (pedidos, productos, ventas)

Consejos

Mantén ambos servidores corriendo mientras desarrollas

Usa DevTools para ver las solicitudes/respuestas

Usa Django admin para gestionar datos

Revisa los registros regularmente

Haz commit después de cambios importantes

¡Todo está listo! Comienza a desarrollarse.