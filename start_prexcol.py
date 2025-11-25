"""
PREXCOL Quick Start Script - Cross-Platform
Starts both Django backend and React frontend with logging
Compatible with Windows, Linux, and macOS
"""

import os
import sys
import subprocess
import time
import platform
from pathlib import Path
from datetime import datetime

class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    RED = '\033[0;31m'
    NC = '\033[0m'  # No Color

def print_colored(message, color=Colors.NC):
    """Print colored message"""
    if platform.system() == 'Windows':
        print(message)  # Windows doesn't support ANSI colors in old cmd
    else:
        print(f"{color}{message}{Colors.NC}")

def print_header(title):
    """Print section header"""
    print("\n" + "=" * 50)
    print_colored(title, Colors.BLUE)
    print("=" * 50)

def create_log_dirs():
    """Create log directories if they don't exist"""
    print_colored("\n[1/5] Creating log directories...", Colors.BLUE)
    
    log_dirs = [
        Path("logs/backend"),
        Path("logs/frontend")
    ]
    
    for log_dir in log_dirs:
        log_dir.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ {log_dir}/ created")

def start_backend():
    """Start Django backend server"""
    print_colored("\n[2/5] Starting Django Backend...", Colors.BLUE)
    
    # Prepare log file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = Path(f"logs/backend/backend_{timestamp}.log")
    
    # Prepare command
    backend_dir = Path("backend")
    
    # Find virtual environment
    venv_paths = [
        Path("venv/Scripts/activate"),  # Windows local
        Path("venv/bin/activate"),      # Linux local
        Path("../venv/Scripts/activate"),  # Windows parent
        Path("../venv/bin/activate"),      # Linux parent
        Path("c:/experticie-1/.venv/Scripts/activate"),  # Absolute Windows
    ]
    
    activate_script = None
    for venv_path in venv_paths:
        if venv_path.exists():
            activate_script = venv_path
            break
    
    # Start backend
    if platform.system() == 'Windows':
        # Windows command
        if activate_script:
            cmd = f'cd backend && {activate_script} && python manage.py runserver'
        else:
            cmd = 'cd backend && python manage.py runserver'
        
        with open(log_file, 'w') as f:
            process = subprocess.Popen(
                cmd,
                shell=True,
                stdout=f,
                stderr=subprocess.STDOUT,
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
    else:
        # Linux/Mac command
        if activate_script:
            cmd = f'source {activate_script} && cd backend && python manage.py runserver'
        else:
            cmd = 'cd backend && python manage.py runserver'
        
        with open(log_file, 'w') as f:
            process = subprocess.Popen(
                cmd,
                shell=True,
                stdout=f,
                stderr=subprocess.STDOUT,
                executable='/bin/bash'
            )
    
    # Save PID
    with open('logs/backend.pid', 'w') as f:
        f.write(str(process.pid))
    
    print(f"  ✓ Backend PID: {process.pid}")
    print(f"  ✓ Backend started on http://localhost:8000")
    print(f"  ✓ Logs: {log_file}")
    
    time.sleep(2)
    return process

def start_frontend():
    """Start React frontend server"""
    print_colored("\n[3/5] Starting React Frontend...", Colors.BLUE)
    
    frontend_dir = Path("frontend")
    
    # Check if node_modules exists
    if not (frontend_dir / "node_modules").exists():
        print("  → Installing dependencies...")
        subprocess.run(["npm.cmd", "install"], cwd=frontend_dir, check=True)
    
    # Prepare log file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = Path(f"logs/frontend/frontend_{timestamp}.log")
    
    # Start frontend
    if platform.system() == 'Windows':
        with open(log_file, 'w') as f:
            process = subprocess.Popen(
                ["npm.cmd", "run", "dev"],
                cwd=frontend_dir,
                stdout=f,
                stderr=subprocess.STDOUT,
                creationflags=subprocess.CREATE_NEW_CONSOLE
            )
    else:
        with open(log_file, 'w') as f:
            process = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=frontend_dir,
                stdout=f,
                stderr=subprocess.STDOUT
            )
    
    # Save PID
    with open('logs/frontend.pid', 'w') as f:
        f.write(str(process.pid))
    
    print(f"  ✓ Frontend PID: {process.pid}")
    print(f"  ✓ Frontend starting on http://localhost:5173")
    print(f"  ✓ Logs: {log_file}")
    
    time.sleep(3)
    return process

def check_services(backend_process, frontend_process):
    """Check if services are running"""
    print_colored("\n[4/5] Checking service status...", Colors.BLUE)
    
    backend_running = backend_process.poll() is None
    frontend_running = frontend_process.poll() is None
    
    if backend_running:
        print_colored("  ✓ Backend running", Colors.GREEN)
    else:
        print_colored("  ✗ Backend failed to start - check logs", Colors.RED)
    
    if frontend_running:
        print_colored("  ✓ Frontend running", Colors.GREEN)
    else:
        print_colored("  ✗ Frontend failed to start - check logs", Colors.RED)
    
    return backend_running and frontend_running

def show_testing_reminder():
    """Show testing instructions"""
    print_colored("\n[5/5] TESTING REMINDER", Colors.GREEN)
    print("=" * 50)
    print()
    print_colored("BACKEND:  http://localhost:8000/api/", Colors.YELLOW)
    print_colored("FRONTEND: http://localhost:5173/", Colors.YELLOW)
    print()
    print("NEXT STEPS:")
    print("1. Open browser to http://localhost:5173/")
    print("2. Follow TESTING_GUIDE.md for complete flow:")
    print("   - Login / Register")
    print("   - Products → Cart → Checkout")
    print("   - Orders → Profile → Notifications")
    print("3. Check logs in /logs/ directory")
    print()
    print("=" * 50)
    print()
    print_colored("✓ PREXCOL is running!", Colors.GREEN)
    print()
    print("To stop servers:")
    print("  - Windows: Close console windows or Ctrl+C")
    print("  - Linux/Mac: ./stop_prexcol.sh or Ctrl+C")
    print()

def main():
    """Main execution"""
    print_header("PREXCOL Quick Start Script")
    print(f"Platform: {platform.system()}")
    print(f"Python: {sys.version.split()[0]}")
    
    try:
        # Create log directories
        create_log_dirs()
        
        # Start backend
        backend_process = start_backend()
        
        # Start frontend
        frontend_process = start_frontend()
        
        # Check services
        all_running = check_services(backend_process, frontend_process)
        
        if all_running:
            # Show testing reminder
            show_testing_reminder()
            
            # Keep script running
            print("Press Ctrl+C to stop all services...")
            try:
                while True:
                    time.sleep(1)
            except KeyboardInterrupt:
                print("\n\nStopping services...")
                backend_process.terminate()
                frontend_process.terminate()
                print("Services stopped.")
        else:
            print_colored("\n✗ Some services failed to start. Check logs for details.", Colors.RED)
            sys.exit(1)
            
    except Exception as e:
        print_colored(f"\n✗ Error: {e}", Colors.RED)
        sys.exit(1)

if __name__ == "__main__":
    main()
