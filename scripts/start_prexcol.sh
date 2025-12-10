#!/bin/bash
# ============================================
# PREXCOL Quick Start Script - Linux/Mac
# ============================================
# Starts both backend and frontend in parallel

echo "========================================"
echo "PREXCOL - Quick Start Script"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create logs directories
echo -e "${BLUE}[1/4] Creating log directories...${NC}"
mkdir -p logs/backend
mkdir -p logs/frontend
echo "  ✓ logs/backend/ created"
echo "  ✓ logs/frontend/ created"
echo ""

# Get timestamp for logs
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Start Backend
echo -e "${BLUE}[2/4] Starting Django Backend...${NC}"
cd backend

# Activate virtual environment
if [ -f "../venv/bin/activate" ]; then
    source ../venv/bin/activate
elif [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
fi

# Start Django in background
nohup python manage.py runserver > ../logs/backend/backend_${TIMESTAMP}.log 2>&1 &
BACKEND_PID=$!
echo "  ✓ Backend PID: $BACKEND_PID"
echo "  ✓ Backend started on http://localhost:8000"
echo "  ✓ Logs: logs/backend/backend_${TIMESTAMP}.log"
cd ..
sleep 2
echo ""

# Start Frontend
echo -e "${BLUE}[3/4] Starting React Frontend...${NC}"
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "  → Installing dependencies..."
    npm install
fi

# Start frontend in background
nohup npm run dev > ../logs/frontend/frontend_${TIMESTAMP}.log 2>&1 &
FRONTEND_PID=$!
echo "  ✓ Frontend PID: $FRONTEND_PID"
echo "  ✓ Frontend starting on http://localhost:5173"
echo "  ✓ Logs: logs/frontend/frontend_${TIMESTAMP}.log"
cd ..
sleep 3
echo ""

# Save PIDs for easy stopping
echo $BACKEND_PID > logs/backend.pid
echo $FRONTEND_PID > logs/frontend.pid

# Show testing reminder
echo -e "${GREEN}[4/4] TESTING REMINDER${NC}"
echo "========================================"
echo ""
echo -e "${YELLOW}BACKEND:${NC}  http://localhost:8000/api/"
echo -e "${YELLOW}FRONTEND:${NC} http://localhost:5173/"
echo ""
echo "NEXT STEPS:"
echo "1. Open browser to http://localhost:5173/"
echo "2. Follow TESTING_GUIDE.md for complete flow:"
echo "   - Login / Register"
echo "   - Products → Cart → Checkout"
echo "   - Orders → Profile → Notifications"
echo "3. Check logs in /logs/ directory"
echo ""
echo "========================================"
echo ""
echo -e "${GREEN}✓ PREXCOL is running!${NC}"
echo ""
echo "To stop servers:"
echo "  ./stop_prexcol.sh"
echo "  or: kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Wait a bit then show status
sleep 2
echo "Checking service status..."
if ps -p $BACKEND_PID > /dev/null; then
    echo "  ✓ Backend running"
else
    echo "  ✗ Backend failed to start - check logs"
fi

if ps -p $FRONTEND_PID > /dev/null; then
    echo "  ✓ Frontend running"
else
    echo "  ✗ Frontend failed to start - check logs"
fi
echo ""
