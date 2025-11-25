#!/bin/bash
# ============================================
# PREXCOL Stop Script - Linux/Mac
# ============================================
# Stops backend and frontend servers

echo "Stopping PREXCOL services..."

# Read PIDs
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    kill $BACKEND_PID 2>/dev/null
    echo "  ✓ Backend stopped (PID: $BACKEND_PID)"
    rm logs/backend.pid
else
    echo "  ✗ Backend PID not found"
fi

if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    kill $FRONTEND_PID 2>/dev/null
    echo "  ✓ Frontend stopped (PID: $FRONTEND_PID)"
    rm logs/frontend.pid
else
    echo "  ✗ Frontend PID not found"
fi

# Kill any remaining processes
pkill -f "manage.py runserver" 2>/dev/null
pkill -f "vite" 2>/dev/null

echo ""
echo "PREXCOL services stopped."
