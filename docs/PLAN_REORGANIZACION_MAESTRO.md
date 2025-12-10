# 📂 PLAN DE REORGANIZACIÓN ESTRATÉGICA DE ARCHIVOS

**Fecha:** 2025-12-10  
**Estrategia:** Limpiar raíz + Documentación Organizada + URLs Estáticas Protegidas

---

## 🎯 OBJETIVO

Transformar el repositorio de una estructura caótica a una **estructura profesional tipo FAANG**, manteniendo integridad de URLs y accesos.

```
ANTES (Raíz caótica):
/PREXCOL_FINAL/
├── 40+ archivos .md sueltos
├── 15+ scripts .py de diagnóstico
├── 5+ archivos .bat de setup
├── Configuración mixta (.env, .env.example, render.yaml)
└── Carpetas principales (src/, docs/, etc)

DESPUÉS (Profesional):
/PREXCOL_FINAL/
├── /src/ (Código fuente - INTACTO)
├── /docs/ (Documentación - ORGANIZADA)
│   ├── /arquitectura/ (Presentación, Lineamientos)
│   ├── /deployment/ (Guías de despliegue)
│   ├── /changelog/ (Historiales)
│   ├── /diagnostico/ (Reportes técnicos)
│   └── /resumenes/ (Resúmenes ejecutivos)
├── /scripts/ (Scripts utilitarios)
├── /tools/ (Herramientas específicas)
├── Archivos ESTÁTICOS en raíz (README, Procfile, etc)
└── .github/ (CI/CD, workflows - futuro)
```

---

## 📋 CLASIFICACIÓN DE ARCHIVOS

### ✅ DEBEN QUEDARSE EN RAÍZ (Acceso directo necesario)

```
CONFIGURACIÓN CRÍTICA:
  ✓ Procfile              → Heroku/Render deployment
  ✓ render.yaml          → Render.com configuration
  ✓ requirements.txt     → Dependencias Python (acceso directo pip)
  ✓ requirements-prod.txt → Dependencias producción
  ✓ runtime.txt          → Python version (requerido por Render)
  ✓ .env.example         → Template variables (referencia de seguridad)
  ✓ .gitignore           → Git configuration
  ✓ netlify.toml         → Netlify (si lo usan)
  ✓ supervisord.conf     → Supervisor task queue
  ✓ pytest.ini           → Testing configuration
  ✓ vite.config.js       → Frontend build (en /src/frontend/)

DOCUMENTACIÓN DE INICIO:
  ✓ README.md            → Punto de entrada principal
  ✓ INICIO_RAPIDO.md     → Guía rápida (usar README.md en lugar)

ACCESO A BUILDS:
  ✓ swagger.json         → API spec (generado dinámicamente, NO mover)
```

### 📂 DEBE MOVERSE A /docs/arquitectura/

```
PRESENTACIONES Y DISEÑO:
  → PRESENTACION_EJECUTIVA_10MIN.md
  → LINEAMIENTOS_Y_TRAZABILIDAD.md
  → ARCHITECTURAL_REVIEW.md
  → arquitectura.rst
  → GUIDE_CONVENCIONES_BD.md
```

### 📂 DEBE MOVERSE A /docs/deployment/

```
DEPLOY Y INFRAESTRUCTURA:
  → RENDER_AUDIT_Y_CORRECCIONES.md (NUEVO)
  → DEPLOY_RENDER.md
  → GUIDE_DEPLOY_NETLIFY.md
  → GUIDE_DESPLIEGUE_NETLIFY.md
  → POSTGRESQL_SETUP.md
  → GUIA_INTEGRACION_SEO.md
  → deployment.rst
```

### 📂 DEBE MOVERSE A /docs/changelog/

```
HISTORIALES Y CAMBIOS:
  → ACTUALIZACIONES_2025_12_01.md
  → RESUMEN_FINAL_SESION_2025_12_01.md
  → RESUMEN_FINAL.md
  → RESUMEN_EJECUTIVO.md
  → RESUMEN_EJECUTIVO_FINAL.md
  → RESUMEN_ACTUALIZACION_NOMENCLATURA.md
  → RESUMEN_CAMBIOS_DEPENDENCIAS.md
  → RESUMEN_MAPA_PROCESOS.md
  → RESUMEN_MEJORAS_COMPLETO.md
  → RESUMEN_REFACTORIZACION.md
  → RESUMEN_SOLUCION_ERRORES.md
  → SESION_REFACTORIZACION_2025-12-04.md
  → SESSION_SUMMARY.md
  → RESOLUTION_REPORT.md
```

### 📂 DEBE MOVERSE A /docs/diagnostico/

```
REPORTES TÉCNICOS:
  → ESTADO_SISTEMA.md
  → DIAGNOSTICO_INTERACTIVO.md
  → code_review_summary.md
  → AUDIT_REPORT.md
  → TEST_REPORT.md
  → FINAL_STATUS.md
  → ACTUALIZACION_MERMAID.md (varios)
  → ESTADO_SISTEMA.md
  → Archivos de texto de diagnóstico:
     - diagnostic_output.txt
     - full_test_report.txt
     - full_test_results.txt
     - verification_output.txt
```

### 📂 DEBE MOVERSE A /docs/resumenes/

```
RESÚMENES GENERALES:
  → SISTEMA_COMPLETO_SOPORTE.md
  → SISTEMA_GESTION_CUENTAS.md
  → SISTEMA_GUIAS_COMPLETO_FINAL.md
  → SISTEMA_GUIAS_FINAL_CORREGIDO.md
  → SISTEMA_SOPORTE_DUAL_COMPLETO.md
  → SISTEMA_SOPORTE_UNIFICADO.md
  → MANUAL_TECNICO.md
  → MANUAL_USUARIO.md
  → GUIDE_METODOLOGICA.md
```

### 📂 ARCHIVOS DE SOPORTE (Mover a /tools/)

```
SCRIPTS UTILITARIOS:
  → add_all_pagination.py
  → add_pagination.py
  → brutal_cleanup.py
  → cleanup_mermaid_syntax.py
  → fix_all_mermaid_syntax.py
  → fix_dashboard.py
  → fix_dashboard_final.py
  → fix_mermaid_quotes.py
  → fix_mermaid_syntax.py
  → fix_subgraphs.py
  → normalize_mermaid_final.py
  → restore_dashboard.py
  → strict_quote_mermaid.py
  → update_gallery_links.py
  → verify_map.py
  → verify_observability.py
  → verify_refactor.py
  → verify_system.py

SCRIPTS DE SETUP (Mover a /scripts/):
  → setup_backend.bat
  → setup_project.bat
  → setup_project.sh
  → start_prexcol.bat
  → start_prexcol_fixed.bat
  → start_prexcol_verify.bat
  → start_prexcol.py
  → start_prexcol.sh
  → start_simple.bat
  → start_system.bat
  → stop_prexcol.sh
  → build_docs.bat
  → build_docs.ps1
  → organizar_docs.ps1
  → run_postgres_setup.bat
  → start_postgres.bat
  → migrate_to_postgres.bat
  → verify_dependencies.bat
  → verificar-red.bat
  → fix_pillow.bat
```

### 🗑️ PUEDE ELIMINARSE (Archivos temporales/backup)

```
BACKUPS DUPLICADOS:
  ✗ backup_sqlite_data.json     (usar dump.json)
  ✗ datadump.json              (viejo)
  ✗ css-actualizados-backup/   (carpeta)
  ✗ query                      (archivo?)

LOGS/REPORTES VIEJOS:
  ✗ login_status.txt
  ✗ organizador_log.txt
  ✗ sphinx_error.txt
  ✗ python_version.txt
  ✗ error.log
  ✗ test_*.txt (archivos antiguos de test)
  ✗ test_failure.txt
  ✗ verification_output_utf8.txt

DIRECTORIOS DE CACHE:
  ✗ __pycache__/
  ✗ .pytest_cache/
  ✗ _build/
  ✗ .coverage
```

---

## 🔗 PROTECCIÓN DE URLs ESTÁTICAS

**CRÍTICO:** Algunos documentos pueden estar vinculados desde:
- README.md (referencias)
- Documentación externa (links)
- Wikis o portales
- CI/CD scripts

```
ARCHIVOS QUE PODRÍAN ESTAR LINKEADOS:
  /INICIO_RAPIDO.md
  /CHECKLIST_DEPLOY.md
  /README_ESTADO_FINAL.md
  /ACCESO_DOCUMENTACION.md
  /INSTRUCCIONES_EJECUCION.txt
  /INSTRUCCIONES_FILTROS.txt

ESTRATEGIA:
  1. Mantener en raíz
  O
  2. Si se mueve, crear symlink/redirect en raíz:
     - .github/INICIO_RAPIDO.md → /docs/guias/INICIO_RAPIDO.md
```

---

## 📊 PLAN DE ACCIÓN DETALLADO

### FASE 1: Preparación (sin cambios)

```
✓ Auditar todos los archivos (HECHO)
✓ Identificar dependencias (HECHO)
✓ Crear estructura de carpetas (HECHO)
✓ Documentar plan (ESTE ARCHIVO)
```

### FASE 2: Creación de Directorios

```bash
# Crear estructura
mkdir -p /docs/arquitectura
mkdir -p /docs/deployment
mkdir -p /docs/changelog
mkdir -p /docs/diagnostico
mkdir -p /docs/resumenes
mkdir -p /scripts
mkdir -p /tools
```

### FASE 3: Movimiento de Archivos (mediante Git)

```bash
# Ejemplos de movimiento
git mv PRESENTACION_EJECUTIVA_10MIN.md docs/arquitectura/
git mv RENDER_AUDIT_Y_CORRECCIONES.md docs/deployment/
git mv ACTUALIZACIONES_2025_12_01.md docs/changelog/
...

# O mediante script PowerShell
Move-Item -Path "ARCH_*.md" -Destination "docs/arquitectura/"
```

### FASE 4: Actualizar Referencias

```
En archivos que queden en raíz:
  - README.md → Actualizar links internos a nuevas rutas
  - .github/workflows/ → Actualizar paths
  - Documentación → Actualizar referencias

Ejemplo:
  ❌ [Guía Deploy](./DEPLOY_RENDER.md)
  ✅ [Guía Deploy](./docs/deployment/DEPLOY_RENDER.md)
```

### FASE 5: Crear Index Master

```
/docs/README.md (NUEVO)
├── Índice de documentación
├── Links a todas las guías
├── Mapa de contenidos
└── Búsqueda rápida
```

### FASE 6: Validación Final

```
✓ Todos los links funcionan
✓ Raíz limpia pero funcional
✓ Nada roto en CI/CD
✓ Git log limpio (commits atómicos)
```

---

## 📖 NUEVO ARCHIVO INDEX MASTER

Crear `/docs/README.md`:

```markdown
# 📚 Documentación PREXCOL

Guía completa de la plataforma. Elige tu sección:

## 🏗️ Arquitectura
- [Presentación Ejecutiva (10 min)](./arquitectura/PRESENTACION_EJECUTIVA_10MIN.md)
- [Lineamientos y Trazabilidad](./arquitectura/LINEAMIENTOS_Y_TRAZABILIDAD.md)
- [Review Arquitectónico](./arquitectura/ARCHITECTURAL_REVIEW.md)

## 🚀 Despliegue
- [Guía Render (con fixes)](./deployment/RENDER_AUDIT_Y_CORRECCIONES.md)
- [Deploy Netlify](./deployment/GUIDE_DESPLIEGUE_NETLIFY.md)
- [PostgreSQL Setup](./deployment/POSTGRESQL_SETUP.md)

## 📝 Historiales
- [Cambios recientes](./changelog/ACTUALIZACIONES_2025_12_01.md)
- [Resumen ejecutivo](./changelog/RESUMEN_EJECUTIVO_FINAL.md)

## 🔍 Diagnóstico
- [Estado actual del sistema](./diagnostico/ESTADO_SISTEMA.md)
- [Reportes de auditoría](./diagnostico/AUDIT_REPORT.md)

...
```

---

## ✅ CHECKLIST FINAL

```
[ ] Crear estructura de carpetas
[ ] Mover archivos (sin romper links)
[ ] Crear /docs/README.md
[ ] Actualizar referencias en archivos principales
[ ] Validar todos los links
[ ] Commit único: "refactor: reorganize documentation"
[ ] Push a main
[ ] Verificar en GitHub que se ve correcto
[ ] Actualizar wiki/portales externos (si existen)
```

---

## 🎯 BENEFICIOS

```
ANTES:
  - Raíz con 50+ archivos
  - Difícil de navegar
  - Parecía proyecto desorganizado
  - Confuso para nuevos developers

DESPUÉS:
  - Raíz limpia: solo esencial
  - Documentación profesionalizada
  - Fácil de onboarding
  - Parece proyecto serio/mantenido
```

---

**Documento Generado:** 2025-12-10  
**Estado:** Plan Definitivo (Listo para ejecución)
