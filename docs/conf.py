# Configuration file for the Sphinx documentation builder.
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os
import sys

# Add the backend directory to the Python path
sys.path.insert(0, os.path.abspath('../src'))

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# -- Project information -----------------------------------------------------
project = 'PREXCOL'
copyright = '2025, PREXCOL Team'
author = 'PREXCOL Team'
release = '1.0.0'

# -- General configuration ---------------------------------------------------
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',
    'autodoc2',
    'myst_parser',
    'sphinxcontrib.mermaid',
    'sphinx_design',
]

# Mermaid configuration
mermaid_version = "9.4.0"

# Autodoc2 configuration
autodoc2_packages = [
    {
        "path": "../src/backend",
        "auto_mode": True,
    },
]

# Output directory for autodoc2
autodoc2_output_dir = "apidocs"

# Render plugin (use 'myst' for Markdown or 'rst' for reStructuredText)
autodoc2_render_plugin = "rst"

# Document only public API (via __all__)
autodoc2_module_all_regexes = [
    # r".*",
]

# Skip certain patterns
autodoc2_skip_module_regexes = [
    r".*\.migrations\..*",
    r".*\.tests\..*",
    r".*\.test_.*",
    r".*\.middleware\..*",
    r".*settings.*",
    r".*wsgi.*",
    r".*asgi.*",
    r".*__pycache__.*",
]

# Hidden imports to skip
autodoc2_hidden_objects = ["private", "inherited"]

# Docstring parser (use 'myst' for Markdown docstrings)
autodoc2_docstring_parser_regexes = [
    (r".*", "rst"),  # Default to RST, change to "myst" if using Markdown
]

# Napoleon settings (for Google/NumPy style docstrings)
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = True
napoleon_include_private_with_doc = False
napoleon_include_special_with_doc = True
napoleon_use_admonition_for_examples = True
napoleon_use_admonition_for_notes = True
napoleon_use_admonition_for_references = True
napoleon_use_ivar = False
napoleon_use_param = True
napoleon_use_rtype = True
napoleon_preprocess_types = False
napoleon_type_aliases = None
napoleon_attr_annotations = True

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
    'django': ('https://docs.djangoproject.com/en/5.0/', 'https://docs.djangoproject.com/en/5.0/_objects/'),
    'drf': ('https://www.django-rest-framework.org/', None),
}

# MyST Parser configuration
myst_enable_extensions = [
    "fieldlist",
    "colon_fence",
    "deflist",
]

# Templates path
templates_path = ['_templates']

# Exclude patterns
exclude_patterns = [
    '_build', 
    'Thumbs.db', 
    '.DS_Store',
    '**/migrations/**',
    '**/tests/**',
]

# -- Options for HTML output -------------------------------------------------
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

def setup(app):
    app.add_css_file('custom.css')

# Theme options
html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False,
}

# Suppress warnings
suppress_warnings = [
    # 'autodoc2.*',  # Uncomment to suppress all autodoc2 warnings
]

# Nitpick mode (strict reference checking)
nitpicky = False  # Set to True for strict checking

# Ignore specific warnings
nitpick_ignore = [
    # Add specific warnings to ignore here
    # ("py:class", "package.module.MyClass"),
]

nitpick_ignore_regex = [
    # Ignore all warnings from certain packages
    # (r"py:.*", r"package\..*"),
]

# Replace annotations for better intersphinx compatibility
autodoc2_replace_annotations = [
    # ("package.MyClass", "package.module.MyClass"),
]

autodoc2_replace_bases = [
    # ("package.MyClass", "package.module.MyClass"),
]

# -- Options for LaTeX output ------------------------------------------------
latex_elements = {
    'papersize': 'letterpaper',
    'pointsize': '10pt',
}

# Grouping the document tree into LaTeX files
latex_documents = [
    ('index', 'PREXCOL.tex', 'PREXCOL Documentation',
     'PREXCOL Team', 'manual'),
]

# -- Options for manual page output ------------------------------------------
man_pages = [
    ('index', 'prexcol', 'PREXCOL Documentation',
     [author], 1)
]

# -- Options for Texinfo output ----------------------------------------------
texinfo_documents = [
    ('index', 'PREXCOL', 'PREXCOL Documentation',
     author, 'PREXCOL', 'Sistema de gestión de productos y pedidos.',
     'Miscellaneous'),
]
