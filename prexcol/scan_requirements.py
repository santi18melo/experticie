import os
import ast
import sys
import pkgutil
from stdlib_list import stdlib_list

# ---------------------------------------
# CONFIG: carpeta donde está tu proyecto
# ---------------------------------------
PROJECT_DIR = "."  # "." = carpeta actual

# Detectar librerías estándar según versión de Python
py_version = f"{sys.version_info.major}.{sys.version_info.minor}"
STDLIB = set(stdlib_list(py_version))

imports_found = set()

def scan_project(base_path):
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith(".py"):
                full_path = os.path.join(root, file)
                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        tree = ast.parse(f.read(), full_path)
                except Exception:
                    continue

                for node in ast.walk(tree):
                    # import xxx
                    if isinstance(node, ast.Import):
                        for n in node.names:
                            imports_found.add(n.name.split(".")[0])

                    # from xxx import yyy
                    elif isinstance(node, ast.ImportFrom):
                        if node.module:
                            imports_found.add(node.module.split(".")[0])

scan_project(PROJECT_DIR)

# -------------------------
# Filtrar importaciones
# -------------------------

external_libs = []

for lib in sorted(imports_found):
    # ignorar módulos estándar
    if lib in STDLIB:
        continue

    # ignorar módulos internos del proyecto
    if os.path.isdir(os.path.join(PROJECT_DIR, lib)):
        continue

    external_libs.append(lib)

print("\n=== Librerías externas detectadas ===")
for lib in external_libs:
    print(lib)

# Guardar archivo
with open("requirements_detected.txt", "w") as f:
    for lib in external_libs:
        f.write(f"{lib}\n")

print("\nArchivo generado: requirements_detected.txt")
