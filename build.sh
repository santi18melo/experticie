#!/bin/bash

# Script de build para Render
set -e

echo "==> Installing dependencies..."
pip install -r requirements.txt

echo "==> Running migrations..."
python src/backend/manage.py migrate --noinput

echo "==> Collecting static files..."
python src/backend/manage.py collectstatic --noinput

echo "==> Build completed successfully!"
