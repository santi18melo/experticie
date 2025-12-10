# 📱 Guía de Acceso desde Dispositivos Móviles

## 🌐 Configuración de Red Local

Tu aplicación PREXCOL ahora está configurada para ser accesible desde **cualquier dispositivo** conectado a tu red WiFi (celular, tablet, otra computadora).

---

## 📍 Direcciones de Acceso

### Desde tu computadora (localhost):
- **Frontend**: http://localhost:5175
- **Backend**: http://localhost:8000

### Desde otros dispositivos en la misma red WiFi:
- **Frontend**: http://192.168.1.80:5175
- **Backend**: http://192.168.1.80:8000

---

## 🔧 Pasos para Reiniciar los Servidores

**⚠️ IMPORTANTE**: Debes reiniciar AMBOS servidores después de los cambios.

### 1. Reiniciar Backend (Django)
```powershell
# En la terminal del backend, presiona Ctrl+C para detener
# Luego ejecuta:
cd backend
.\.venv\Scripts\Activate.ps1
python manage.py runserver 0.0.0.0:8000
```

### 2. Reiniciar Frontend (Vite)
```powershell
# En la terminal del frontend, presiona Ctrl+C para detener
# Luego ejecuta:
cd frontend
npm run dev
```

**Importante**: Después de reiniciar, verás en la terminal del frontend algo como:
```
➜  Local:   http://localhost:5175/
➜  Network: http://192.168.1.80:5175/
```

---

## ⚙️ Archivos de Configuración

### Backend: `backend/.env`
```env
ALLOWED_HOSTS=localhost,127.0.0.1,testserver,192.168.1.80,0.0.0.0
CORS_ALLOWED_ORIGINS=http://localhost:5175,http://127.0.0.1:5175,http://192.168.1.80:5175
CSRF_TRUSTED_ORIGINS=http://localhost:5175,http://127.0.0.1:5175,http://192.168.1.80:5175
FRONTEND_URL=http://192.168.1.80:5175
```

### Frontend: `frontend/.env`
```env
VITE_API_BASE_URL=http://192.168.1.80:8000/api
```

**⚠️ Nota**: Si tu IP cambia, debes actualizar AMBOS archivos .env

---

## 📧 Correos de Recuperación de Contraseña

Los correos ahora incluirán enlaces con la IP de red:
- **Enlace en el email**: `http://192.168.1.80:5175/reset-password/...`
- ✅ Funciona desde **celular**
- ✅ Funciona desde **tablet**
- ✅ Funciona desde **cualquier dispositivo en tu WiFi**

---

## 📱 Cómo Probar desde tu Celular

### Paso 1: Conectar tu celular al mismo WiFi
Asegúrate de que tu celular esté conectado a la **misma red WiFi** que tu computadora.

### Paso 2: Abrir el navegador en el celular
Abre Chrome, Safari o cualquier navegador en tu celular.

### Paso 3: Visitar la aplicación
Escribe en la barra de direcciones:
```
http://192.168.1.80:5175
```

### Paso 4: Probar el flujo de recuperación
1. Ve a "¿Olvidaste tu contraseña?"
2. Ingresa tu email: `melosanchezsantiago@gmail.com`
3. Abre el correo **desde tu celular**
4. Haz clic en "🔐 Restablecer mi contraseña"
5. El enlace te llevará a la página de reset (responsive para móvil)
6. Ingresa tu nueva contraseña
7. Inicia sesión

---

## 🔒 Seguridad del Firewall

Si no puedes acceder desde otros dispositivos, puede ser que el **Firewall de Windows** esté bloqueando las conexiones.

### Solución rápida:
1. Busca "Firewall de Windows Defender" en el menú inicio
2. Clic en "Permitir una aplicación a través de Firewall de Windows"
3. Busca "Python" y asegúrate de que esté marcado para "Privado"
4. Si no aparece, haz clic en "Cambiar configuración" → "Permitir otra aplicación"
5. Agrega Python y Node.js

---

## ⚠️ Notas Importantes

### Si tu IP cambia:
Tu IP local (192.168.1.80) puede cambiar si reinicias el router o tu computadora. Si eso pasa:

1. Ejecuta `ipconfig` en PowerShell
2. Busca tu nueva IP en "Adaptador de LAN inalámbrica"
3. Actualiza el archivo `backend/.env`:
   ```env
   ALLOWED_HOSTS=localhost,127.0.0.1,testserver,TU_NUEVA_IP,0.0.0.0
   CORS_ALLOWED_ORIGINS=http://localhost:5175,http://127.0.0.1:5175,http://TU_NUEVA_IP:5175
   CSRF_TRUSTED_ORIGINS=http://localhost:5175,http://127.0.0.1:5175,http://TU_NUEVA_IP:5175
   FRONTEND_URL=http://TU_NUEVA_IP:5175
   ```
4. Reinicia los servidores

### Solo funciona en tu red local:
- ✅ Dispositivos conectados a tu WiFi
- ❌ Dispositivos fuera de tu red (internet público)
- Para acceso desde internet, necesitarías configurar port forwarding o usar un servicio como ngrok

---

## ✅ Checklist de Verificación

- [ ] Backend corriendo en `0.0.0.0:8000`
- [ ] Frontend corriendo y mostrando IP de red
- [ ] Archivo `frontend/.env` creado con VITE_API_BASE_URL
- [ ] Celular conectado al mismo WiFi
- [ ] Puedes abrir `http://192.168.1.80:5175` desde el celular
- [ ] El email de reset incluye la IP correcta
- [ ] El enlace del email funciona desde el celular

---

## 🔧 Solución de Problemas

### ❌ Error: "Error al procesar la solicitud" en celular

**Causa**: El frontend está intentando conectarse a `127.0.0.1:8000` en lugar de la IP de red.

**Solución**:
1. Verifica que existe el archivo `frontend/.env`
2. Debe contener: `VITE_API_BASE_URL=http://192.168.1.80:8000/api`
3. **Reinicia el servidor frontend** (Ctrl+C y `npm run dev`)
4. Vite solo lee el .env al iniciar

### ❌ Error: "Algo salió mal" después del login

**Causa**: Error de React DOM con fragmentos vacíos.

**Solución**:
1. Ya está corregido en `Login.jsx` y `ForgotPassword.jsx`
2. Asegúrate de tener la última versión del código
3. Refresca la página con Ctrl+Shift+R (hard refresh)

### ❌ No puedo acceder desde el celular

**Posibles causas y soluciones**:

1. **Firewall bloqueando**:
   - Abre "Firewall de Windows Defender"
   - Permite Python y Node.js en redes privadas

2. **Celular en WiFi diferente**:
   - Verifica que estés en la misma red WiFi
   - Compara el nombre de la red en PC y celular

3. **Servidor no corriendo en 0.0.0.0**:
   - Backend debe ser: `python manage.py runserver 0.0.0.0:8000`
   - Frontend debe mostrar "Network: http://192.168.1.80:5175"

4. **IP incorrecta**:
   - Ejecuta `ipconfig` para verificar tu IP actual
   - Actualiza ambos archivos .env si cambió

### ❌ El enlace del email no funciona

**Solución**:
1. Verifica que `backend/.env` tenga: `FRONTEND_URL=http://192.168.1.80:5175`
2. Reinicia el backend
3. Solicita un nuevo email de recuperación
4. El nuevo email tendrá el enlace correcto

### ⚠️ Advertencia: "No es seguro" en el navegador

**Es normal**: Estás usando HTTP (no HTTPS) en una IP local.
- En producción usarías HTTPS con certificado SSL
- Para desarrollo local, puedes ignorar la advertencia
- Haz clic en "Avanzado" → "Continuar de todos modos"

---

## 🎯 Resultado Final

Ahora cuando solicites recuperar tu contraseña:
1. El correo llegará a tu email (Gmail)
2. Puedes abrir el correo desde **cualquier dispositivo** (PC, celular, tablet)
3. El enlace te llevará a `http://192.168.1.80:5175/reset-password/...`
4. La página se verá **perfecta en móvil** (responsive design)
5. Podrás restablecer tu contraseña desde cualquier dispositivo

¡Todo listo! 🚀
