# 🚀 GUÍA DE DESPLIEGUE EN NETLIFY - PREXCOL

1.  **Conectar Repo**: En Netlify, "Import existing project" > GitHub > `experticie-3`.
2.  **Configuración**:
    *   Base directory: `frontend`
    *   Build command: `npm install && npm run build`
    *   Publish directory: `dist`
3.  **Variables**: Agrega `VITE_API_URL` con la URL de tu backend.
4.  **Deploy**: Clic en "Deploy site".

**Nota**: Si falla el build, usa `NPM_FLAGS` = `--legacy-peer-deps`.
