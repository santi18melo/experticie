#!/bin/bash

echo "=========================================="
echo "PREXCOL - Setup Project (Unix/Linux/Mac)"
echo "=========================================="

echo "[1/3] Installing Backend Dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies."
    exit 1
fi

echo "[2/3] Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies."
    cd ..
    exit 1
fi
cd ..

echo "[3/3] Setup Complete!"
echo "You can now run the project using ./start_prexcol.sh"
