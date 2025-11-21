import os
import shutil

# ------------ CONFIGURACIÓN ------------
CARPETAS_A_CREAR = [
    "backend",
    "frontend",
    "docs",
    "scripts",
]

ARCHIVOS_INVALIDOS = [
    ".DS_Store",
    "Thumbs.db",
    "__pycache__",
    "node_modules",
]

EXTENSIONES_REPETITIVAS = [
    ".pyc",
    ".log",
    ".tmp",
]

# Movimiento automático de carpetas de Django
CARPETAS_DJANGO = [
    "usuarios",
    "productos",
    "ventas",
    "prexcol",
    "manage.py",
]

# Movimiento automático de carpetas de React
CARPETAS_FRONTEND = [
    "package.json",
    "vite.config.js",
    "src",
    "public",
]

# ---------------------------------------


def eliminar_basura(path="."):
    print("🧹 Eliminando archivos basura...")

    for root, dirs, files in os.walk(path):
        # Eliminar carpetas basura
        for d in dirs:
            if d in ARCHIVOS_INVALIDOS:
                ruta = os.path.join(root, d)
                print(f"🗑️ Eliminando carpeta inútil: {ruta}")
                shutil.rmtree(ruta, ignore_errors=True)

        # Eliminar archivos basura
        for f in files:
            if f in ARCHIVOS_INVALIDOS or f.endswith(tuple(EXTENSIONES_REPETITIVAS)):
                ruta = os.path.join(root, f)
                print(f"🗑️ Eliminando archivo inútil: {ruta}")
                try:
                    os.remove(ruta)
                except:
                    pass


def mover_backend():
    print("📦 Reorganizando Backend Django...")

    os.makedirs("backend", exist_ok=True)

    for item in CARPETAS_DJANGO:
        if os.path.exists(item):
            destino = os.path.join("backend", item)
            print(f"➡️ Moviendo {item} → backend/")
            shutil.move(item, destino)


def mover_frontend():
    print("📦 Reorganizando Frontend React + Vite...")

    os.makedirs("frontend", exist_ok=True)

    for item in CARPETAS_FRONTEND:
        if os.path.exists(item):
            destino = os.path.join("frontend", item)
            print(f"➡️ Moviendo {item} → frontend/")
            shutil.move(item, destino)


def crear_carpetas_base():
    print("📁 Creando estructura base...")

    for carpeta in CARPETAS_A_CREAR:
        if not os.path.exists(carpeta):
            print(f"📁 Creando: {carpeta}/")
            os.makedirs(carpeta)


def main():
    print("\n==============================")
    print("   🛠️ ORGANIZADOR PREXCOL")
    print("==============================\n")

    crear_carpetas_base()
    eliminar_basura()
    mover_backend()
    mover_frontend()

    print("\n✅ PROYECTO ORGANIZADO EXITOSAMENTE\n")


if __name__ == "__main__":
    main()
