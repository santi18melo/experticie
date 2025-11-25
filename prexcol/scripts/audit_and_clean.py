import os
import hashlib
import shutil
import re
from pathlib import Path
import subprocess
import requests
import time
import json

# ---------------- CONFIGURACIÓN ----------------
PROJECT_ROOT = Path("c:/experticie-1/prexcol")
ARCHIVE_DIR = PROJECT_ROOT / "_archived"
IGNORE_DIRS = {".venv", "node_modules", ".git", "__pycache__", "build", "dist", "_archived", "logs"}
IGNORE_EXTENSIONS = {".pyc", ".log", ".DS_Store"}
LOG_FILE = PROJECT_ROOT / "qa_audit_log.txt"

BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:5173"

# ---------------- FUNCIONES AUXILIARES ----------------
def get_file_hash(file_path):
    hasher = hashlib.md5()
    try:
        with open(file_path, "rb") as f:
            buf = f.read(65536)
            while buf:
                hasher.update(buf)
                buf = f.read(65536)
        return hasher.hexdigest()
    except Exception as e:
        return None

def scan_directory(root_dir):
    files_by_hash = {}
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if any(file.endswith(ext) for ext in IGNORE_EXTENSIONS):
                continue
            file_path = Path(root) / file
            file_hash = get_file_hash(file_path)
            if file_hash:
                files_by_hash.setdefault(file_hash, []).append(file_path)
    return files_by_hash

def move_duplicates(files_by_hash):
    os.makedirs(ARCHIVE_DIR, exist_ok=True)
    logs = []
    for file_hash, file_list in files_by_hash.items():
        if len(file_list) > 1:
            file_list.sort(key=lambda p: (len(str(p)), str(p)))
            keep_file = file_list[0]
            move_files = file_list[1:]
            logs.append(f"\nDuplicate Group ({file_hash})")
            logs.append(f"KEEP: {keep_file}")
            for move_file in move_files:
                rel_path = move_file.relative_to(PROJECT_ROOT)
                dest_path = ARCHIVE_DIR / rel_path
                os.makedirs(dest_path.parent, exist_ok=True)
                try:
                    shutil.move(str(move_file), str(dest_path))
                    logs.append(f"MOVED: {move_file} -> {dest_path}")
                except Exception as e:
                    logs.append(f"ERROR MOVING: {move_file} -> {e}")
    return logs

def update_imports():
    logs = []
    py_pattern = re.compile(r'from\s+([\w\.]+)\s+import')
    js_pattern = re.compile(r'import\s+.*from\s+[\'"](.+)[\'"]')
    for root, dirs, files in os.walk(PROJECT_ROOT):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if not file.endswith((".py", ".js", ".jsx")):
                continue
            file_path = Path(root) / file
            try:
                content = file_path.read_text(encoding="utf-8")
                updated = False
                for match in py_pattern.findall(content):
                    if "_archived" in match:
                        content = content.replace(match, match.replace("_archived", ""))
                        updated = True
                for match in js_pattern.findall(content):
                    if "_archived" in match:
                        content = content.replace(match, match.replace("_archived", ""))
                        updated = True
                if updated:
                    file_path.write_text(content, encoding="utf-8")
                    logs.append(f"Updated imports: {file_path}")
            except Exception as e:
                logs.append(f"Error updating imports {file_path}: {e}")
    return logs

def start_backend():
    backend_dir = PROJECT_ROOT / "backend"
    command = ["cmd", "/c", f"cd {backend_dir} && .venv\\Scripts\\activate && python manage.py runserver"]
    return subprocess.Popen(command, shell=True)

def start_frontend():
    frontend_dir = PROJECT_ROOT / "frontend"
    command = ["cmd", "/c", f"cd {frontend_dir} && npm run dev"]
    return subprocess.Popen(command, shell=True)

# ---------------- TEST AUTOMÁTICO ----------------
def test_backend_endpoints():
    logs = []
    endpoints = [
        "/api/users/me/",
        "/api/products/",
        "/api/orders/",
        "/api/orders/history/",
        "/api/cart/",
        "/api/dashboard/stats/"
    ]
    for ep in endpoints:
        try:
            r = requests.get(BACKEND_URL + ep)
            if r.status_code == 200:
                logs.append(f"[OK] {ep}")
            else:
                logs.append(f"[FAIL {r.status_code}] {ep}")
        except Exception as e:
            logs.append(f"[ERROR] {ep} -> {e}")
    return logs

def test_frontend_flow():
    logs = []
    # Solo comprobaciones básicas, no UI automation
    try:
        r = requests.get(FRONTEND_URL)
        if r.status_code == 200:
            logs.append("[OK] Frontend Home loaded")
        else:
            logs.append(f"[FAIL {r.status_code}] Frontend Home")
    except Exception as e:
        logs.append(f"[ERROR] Frontend Home -> {e}")
    return logs

# ---------------- MAIN ----------------
def main():
    all_logs = []
    all_logs.append("=== PREXCOL QA & Audit ===")

    # Paso 1: Duplicados
    files_by_hash = scan_directory(PROJECT_ROOT)
    all_logs.extend(move_duplicates(files_by_hash))

    # Paso 2: Imports
    all_logs.extend(update_imports())

    # Guardar log inicial
    LOG_FILE.write_text("\n".join(all_logs), encoding="utf-8")

    # Paso 3: Iniciar servidores
    print("Starting backend and frontend...")
    backend_proc = start_backend()
    frontend_proc = start_frontend()
    time.sleep(10)  # Espera que ambos arranquen

    # Paso 4: Tests automáticos
    all_logs.append("\n=== BACKEND ENDPOINT TESTS ===")
    all_logs.extend(test_backend_endpoints())
    all_logs.append("\n=== FRONTEND FLOW TESTS ===")
    all_logs.extend(test_frontend_flow())

    # Guardar log final
    LOG_FILE.write_text("\n".join(all_logs), encoding="utf-8")
    print(f"QA complete. Log saved to {LOG_FILE}")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("Stopping servers...")
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    main()
