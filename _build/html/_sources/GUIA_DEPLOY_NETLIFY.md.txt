# Guía de Despliegue en Netlify - PREXCOL

## Configuración Inicial

### 1. Instalar Netlify CLI
```bash
npm install netlify-cli -g
```

### 2. Vincular Proyecto
Desde la raíz del proyecto:
```bash
netlify login
netlify init
```

## Estructura de Archivos

```
experticie-3/
├── netlify.toml              # Configuración de Netlify
├── netlify/
│   └── functions/            # Funciones serverless
│       └── api-proxy.js      # Proxy example
├── frontend/                 # React app
│   ├── dist/                 # Build output
│   └── package.json
└── backend/                  # Django (alojar en otro lugar)
```

## Configuración de Variables de Entorno

En el dashboard de Netlify, configure:
- `BACKEND_URL`: URL del backend Django desplegado
- `VITE_API_URL`: URL base para peticiones desde el frontend

## Despliegue

### Automático (Git)
1. Conecte el repositorio de GitHub a Netlify
2. Netlify detectará `netlify.toml` y desplegará automáticamente
3. Cada push a `main` activará un nuevo despliegue

### Manual (CLI)
```bash
cd frontend
npm run build
netlify deploy --prod
```

## Funciones Serverless

### Crear Nueva Función
```bash
netlify functions:create
```

### Acceder a Función
```
https://tu-sitio.netlify.app/.netlify/functions/NOMBRE-FUNCION
```

## Recomendaciones

1. **Backend Separado**: Despliegue Django en Railway, Render o PythonAnywhere
2. **Base de Datos**: Use PostgreSQL en lugar de SQLite para producción
3. **Media Files**: Configure AWS S3 o Cloudinary para archivos estáticos

## Troubleshooting

### Build Falla
- Verifique que `npm run build` funcione localmente
- Revise logs en Netlify Dashboard

### API No Responde
- Confirme `BACKEND_URL` en variables de entorno
- Verifique CORS en settings de Django
