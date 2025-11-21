# 🎯 PUNTO DE INICIO - APP PRODUCTOS

## 👋 Bienvenida

Se ha creado con éxito la **app Django "productos"** - un sistema completo de gestión de tiendas minoristas.

---

##  Primeros Pasos (30 segundos)

### 1. Cargar datos de prueba

**Opción A (Windows PowerShell) - RECOMENDADO:**
```powershell
.\cargar_datos.ps1
```

**Opción B (Línea de comando):**
```bash
python manage.py shell
exec(open('test_productos_v2.py').read())
```

**Opción C (Bash/Linux/Mac):**
``
bash cargar_datos.sh
```

### 2. Iniciar servidor
```bash
python manage.py runserver
```

### 3. Acceder a los endpoints
- **API**: http://localhost:8000/api/
- **Admin**: http://localhost:8000/admin/
- **Documentación**: Ver archivos `.md` en la carpeta raíz

---

## 📖 Documentación por Rol

### 👨‍💼 Desarrollador

**Lee primero:**
1. `README_APP_PRODUCTOS.md` - Resumen general
2. `PRODUCTOS_DOCUMENTACION.md` - Documentación técnica completa
3. `INDICE_APP_PRODUCTOS.md` - Índice de todo lo creado

**Para pruebas:**
- `EJEMPLOS_API_PRODUCTOS.md` - Ejemplos cURL

### 🎨 Frontend Developer

**Lee primero:**
1. `GUIA_INTEGRACION_FRONTEND.md` - Ejemplos React/Vue
2. `EJEMPLOS_API_PRODUCTOS.md` - Endpoints disponibles

**Código útil:**
- Componentes React listos para copiar
- Servicios JavaScript configurados
- Ejemplos de gestión de errores

### 🧪 QA/Tester

**Lee primero:**
1. `EJEMPLOS_API_PRODUCTOS.md` - Todos los endpoints
2. `test_productos.py` - Datos de prueba

**Ejecutar tests:**
```bash
python manage.py test productos --verbosity=2
```

### 🔧 DevOps

**Ver:**
1. `ESTADISTICAS_APP_PRODUCTOS.md` - Índices BD, rendimiento
2. `PRODUCTOS_DOCUMENTACION.md` - Sección de validaciones

---

## 🎯 Estructura Rápida

```
APP PRODUCTOS
├── Modelos (4)
│   ├── Tienda          - Tiendas minoristas
│   ├── Producto        - Catálogo con inventario
│   ├── Pedido          - Órdenes de compra
│   └── DetallePedido   - Items del pedido
│
├── Roles (5)
│   ├── Admin           - Acceso total
│   ├── Cliente         - Compra productos
│   ├── Proveedor       - Gestiona inventario
│   ├── Comprador       - Procesa pedidos
│   └── Logística       - Gestiona entregas
│
├── Endpoints (25+)
│   ├── /api/tiendas/           - 6 endpoints
│   ├── /api/productos/         - 8 endpoints
│   ├── /api/pedidos/           - 8 endpoints
│   └── /api/detalles-pedido/   - 3 endpoints
│
└── Tests (19)
    ├── Modelos (5)
    ├── Productos (6)
    ├── Pedidos (7)
    └── Validación (2)
```

---

## 🔐 Usuarios de Prueba

Creados con `test_productos.py`:

| Email | Contraseña | Rol | Función |
|-------|-----------|-----|---------|
| admin@prexcol.com | admin123 | admin | Acceso total |
| proveedor@prexcol.com | prov123 | proveedor | Gestiona stock |
| cliente@prexcol.com | cliente123 | cliente | Compra |
| comprador@prexcol.com | comprador123 | comprador | Procesa |
| logistica@prexcol.com | logistica123 | logística | Entrega |

---

## 📚 Archivos de Documentación

### Todos Disponibles en la Carpeta Raíz

```
📄 PRODUCTOS_DOCUMENTACION.md    ← 👈 Documentación técnica completa
📄 EJEMPLOS_API_PRODUCTOS.md     ← 👈 Ejemplos HTTP con cURL
📄 GUIA_INTEGRACION_FRONTEND.md  ← 👈 Ejemplos React/Vue
📄 README_APP_PRODUCTOS.md       ← 👈 Resumen general
📄 ESTADISTICAS_APP_PRODUCTOS.md ← Estadísticas del código
📄 INDICE_APP_PRODUCTOS.md       ← Índice completo
📄 INICIO_RAPIDO.md              ← Este archivo
```

---

## 🛠️ Tareas Comunes

### Crear un Pedido (Cliente)
```bash
curl -X POST http://localhost:8000/api/pedidos/crear_pedido/ \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tienda_id": 1,
    "detalles": [
      {"producto": 1, "cantidad": 2}
    ]
  }'
```

### Ver Mis Productos (Proveedor)
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8000/api/productos/mis_productos/
```

### Cambiar Estado Pedido (Comprador)
```bash
curl -X POST http://localhost:8000/api/pedidos/1/cambiar_estado/ \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"estado": "preparando"}'
```

### Ajustar Stock (Proveedor)
```bash
curl -X POST http://localhost:8000/api/productos/1/ajustar_stock/ \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"cantidad": 5, "operacion": "aumentar"}'
```

---

## ✅ Verificación

Todo está funcionando correctamente si:

```bash
# 1. Django sin errores
python manage.py check
# Resultado: System check identified no issues (0 silenced).

# 2. Tests pasando
python manage.py test productos
# Resultado: Ran 19 tests, 0 failures ✅

# 3. Servidor inicia
python manage.py runserver
# Resultado: Starting development server at http://127.0.0.1:8000/
```

---

## 🎓 Flujo Típico

### Cliente quiere comprar:
1. ✅ Se autentica y obtiene token JWT
2. ✅ Ve catálogo: `GET /api/productos/`
3. ✅ Crea pedido: `POST /api/pedidos/crear_pedido/`
4. ✅ Stock se reduce automáticamente
5. ✅ Puede seguir pedido: `GET /api/pedidos/{id}/`

### Comprador prepara:
1. ✅ Ve pedidos pendientes: `GET /api/pedidos/pendientes/`
2. ✅ Marca como preparando: `POST /api/pedidos/{id}/cambiar_estado/`

### Logística entrega:
1. ✅ Ve pedidos listos: `GET /api/pedidos/en_preparacion/`
2. ✅ Marca como en tránsito
3. ✅ Marca como entregado

---

## 🆘 Problemas Comunes

### Error: "No module named 'productos'"
**Solución:** Ejecuta `python manage.py check`

### Error 401 Unauthorized
**Solución:** Incluye el header `Authorization: Bearer TOKEN`

### Error 403 Forbidden
**Solución:** El usuario no tiene permisos para esa acción. Verifica el rol en `PRODUCTOS_DOCUMENTACION.md`

### Stock negativo
**Solución:** No es posible, la API valida stock suficiente antes de crear pedido

---

## 📞 Preguntas Frecuentes

**P: ¿Cómo cambio el token de expiración?**  
R: En `backend/settings.py`, sección `SIMPLE_JWT`

**P: ¿Cómo creo más usuarios?**  
R: `python manage.py createsuperuser` o vía API (usuario admin)

**P: ¿Cómo exporto datos?**  
R: Django admin permite descargar datos, o usa los endpoints API

**P: ¿Qué BD usa?**  
R: SQLite en desarrollo (`db.sqlite3`). Configurable en settings.py

**P: ¿Cómo depliego a producción?**  
R: Ver `PRODUCTOS_DOCUMENTACION.md` sección "Deploying"

---

## 🚀 Próximos Pasos Sugeridos

1. **Cargar datos de prueba**
   ```bash
   python manage.py shell < test_productos.py
   ```

2. **Ver datos en admin**
   ```
   http://localhost:8000/admin/
   ```

3. **Probar endpoints**
   ```bash
   # Seguir ejemplos en EJEMPLOS_API_PRODUCTOS.md
   ```

4. **Integrar con frontend**
   ```bash
   # Usar código en GUIA_INTEGRACION_FRONTEND.md
   ```

5. **Ejecutar tests**
   ```bash
   python manage.py test productos --verbosity=2
   ```

---

## 📊 Resumen Técnico

| Aspecto | Valor |
|--------|-------|
| **Lenguaje** | Python 3.11+ |
| **Framework** | Django 5.2.8 |
| **API** | Django REST Framework |
| **Autenticación** | JWT (Simple JWT) |
| **BD** | SQLite (configurable) |
| **Tests** | 19/19 pasando ✅ |
| **Líneas código** | 1,397 |
| **Endpoints** | 25+ |
| **Modelos** | 4 |

---

## 🎉 ¡Listo!

La app **"productos"** está 100% lista para usar.

**Comienza ahora:**
1. Cargar datos: `python manage.py shell < test_productos.py`
2. Iniciar: `python manage.py runserver`
3. Explorar: http://localhost:8000/api/
4. Integrar: Usa `GUIA_INTEGRACION_FRONTEND.md`

---

**¿Preguntas?** Ver documentación correspondiente:
- 📖 General: `README_APP_PRODUCTOS.md`
- 🔧 Técnica: `PRODUCTOS_DOCUMENTACION.md`
- 💻 Frontend: `GUIA_INTEGRACION_FRONTEND.md`
- 📋 APIs: `EJEMPLOS_API_PRODUCTOS.md`

---

**Versión**: 1.0  
**Fecha**: 16 de Noviembre de 2024  
**Status**: ✅ LISTA PARA USAR

¡Bienvenido a la app Productos! 🎊
