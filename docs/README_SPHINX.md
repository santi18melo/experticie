# Documentación PREXCOL con Sphinx-Autodoc2

Esta carpeta contiene la documentación técnica completa del proyecto PREXCOL, generada automáticamente usando **Sphinx** y **sphinx-autodoc2**.

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado - Windows)

```bash
# Desde la raíz del proyecto
.\build_docs.bat
```

Este script:
1. Activa el entorno virtual
2. Instala las dependencias de Sphinx
3. Genera la documentación HTML
4. Ofrece abrir la documentación automáticamente

### Opción 2: Manual

```bash
# 1. Activar entorno virtual
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac

# 2. Instalar dependencias
pip install sphinx sphinx-autodoc2 myst-parser sphinx-rtd-theme

# 3. Generar documentación
cd docs
make html  # Linux/Mac
make.bat html  # Windows

# 4. Abrir documentación
start _build\html\index.html  # Windows
open _build/html/index.html  # Mac
xdg-open _build/html/index.html  # Linux
```

## 📚 Estructura de la Documentación

```
docs/
├── conf.py                 # Configuración de Sphinx
├── index.rst              # Página principal
├── introduccion.rst       # Introducción al sistema
├── guia_inicio.rst        # Guía de inicio rápido
├── arquitectura.rst       # Arquitectura técnica
├── guias_usuario.rst      # Guías por rol de usuario
├── deployment.rst         # Guía de despliegue
├── apidocs/              # Documentación API (auto-generada)
├── _build/               # Documentación compilada
├── _static/              # Archivos estáticos
└── _templates/           # Plantillas personalizadas
```

## 🔧 Configuración de Autodoc2

La configuración en `conf.py` incluye:

```python
# Paquetes a documentar
autodoc2_packages = [
    {
        "path": "../src/backend",
        "auto_mode": True,
    },
]

# Directorio de salida
autodoc2_output_dir = "apidocs"

# Formato de salida (rst o myst)
autodoc2_render_plugin = "rst"

# Módulos a ignorar
autodoc2_skip_module_regexes = [
    r".*\.migrations\..*",
    r".*\.tests\..*",
]
```

## 📖 Características

### Documentación Automática de API

- **Autodoc2** genera automáticamente la documentación de todos los módulos Python
- Incluye docstrings, parámetros, tipos de retorno
- Soporte para Google/NumPy style docstrings
- Enlaces cruzados entre módulos

### Temas y Estilos

- **Tema**: Read the Docs (sphinx_rtd_theme)
- Navegación colapsable
- Búsqueda integrada
- Responsive design

### Formatos de Salida

```bash
# HTML (recomendado)
make html

# PDF (requiere LaTeX)
make latexpdf

# ePub
make epub

# Texto plano
make text

# Manual pages
make man
```

## 🎯 Uso Avanzado

### Documentar Solo API Pública

Para documentar solo lo expuesto en `__all__`:

```python
# conf.py
autodoc2_module_all_regexes = [
    r"my_package\..*",
]
```

### Usar Markdown en Docstrings

```python
# conf.py
autodoc2_docstring_parser_regexes = [
    (r".*", "myst"),  # Todos los módulos usan Markdown
]

myst_enable_extensions = ["fieldlist"]
```

### Generar Documentación en Markdown

```python
# conf.py
autodoc2_render_plugin = "myst"  # Genera archivos .md en lugar de .rst
```

### Modo Manual (Sin Auto-generación)

```python
# conf.py
autodoc2_packages = [
    {
        "path": "../src/backend",
        "auto_mode": False,  # Desactiva generación automática
    },
]
```

Luego usa la directiva `autodoc2-object` en tus archivos .rst:

```rst
.. autodoc2-object:: my_module.MyClass
   :members:
```

### Ignorar Advertencias

```python
# conf.py
suppress_warnings = [
    "autodoc2.*",  # Suprimir todas
    "autodoc2.config_error",  # Suprimir específicas
]

# Para referencias no encontradas
nitpick_ignore_regex = [
    (r"py:.*", r"package\..*"),
]
```

## 🔍 Intersphinx

La documentación incluye enlaces a:

- Python: https://docs.python.org/3
- Django: https://docs.djangoproject.com/en/5.0/
- Django REST Framework: https://www.django-rest-framework.org/

Para verificar referencias disponibles:

```bash
pip install myst-inv
python -m sphinx.ext.intersphinx https://docs.djangoproject.com/en/5.0/_objects/
```

## 📝 Actualizar Documentación

### Después de Cambios en el Código

```bash
cd docs
make clean  # Limpiar builds anteriores
make html   # Regenerar documentación
```

### Agregar Nueva Sección

1. Crear archivo `.rst` en `docs/`
2. Agregar a `index.rst` en el `toctree`:

```rst
.. toctree::
   :maxdepth: 2

   introduccion
   nueva_seccion  # <-- Agregar aquí
   arquitectura
```

3. Regenerar: `make html`

## 🌐 Desplegar Documentación

### Read the Docs

1. Crear cuenta en https://readthedocs.org
2. Importar proyecto desde GitHub
3. RTD detectará automáticamente `docs/conf.py`
4. La documentación se actualizará en cada push

### GitHub Pages

```bash
# Instalar extensión
pip install sphinx-ghpages

# Publicar
sphinx-ghpages -p _build/html
```

### Netlify/Vercel

1. Configurar build command: `cd docs && make html`
2. Publish directory: `docs/_build/html`

## 🐛 Solución de Problemas

### Error: "autodoc2_packages must not be empty"

Verifica que la ruta en `conf.py` sea correcta:

```python
autodoc2_packages = [
    {
        "path": "../src/backend",  # Ruta relativa desde docs/
    },
]
```

### Error: "No module named 'django'"

Asegúrate de que Django esté instalado y el entorno virtual activado:

```bash
pip install -r requirements.txt
```

### Advertencias de Referencias No Encontradas

Agrega a `conf.py`:

```python
nitpick_ignore = [
    ("py:class", "nombre.de.la.clase"),
]
```

### Autodoc2 No Genera Archivos

Verifica que `auto_mode` esté en `True`:

```python
autodoc2_packages = [
    {
        "path": "../src/backend",
        "auto_mode": True,  # <-- Debe ser True
    },
]
```

## 📚 Recursos

- [Sphinx Documentation](https://www.sphinx-doc.org/)
- [sphinx-autodoc2 GitHub](https://github.com/sphinx-extensions2/sphinx-autodoc2)
- [MyST Parser](https://myst-parser.readthedocs.io/)
- [Read the Docs Theme](https://sphinx-rtd-theme.readthedocs.io/)

## 📄 Licencia

La documentación está bajo la misma licencia que el proyecto PREXCOL (MIT).
