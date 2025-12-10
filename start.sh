#!/bin/bash

# Script de inicio para Render
set -e

echo "==> Starting Gunicorn server..."
gunicorn --chdir src/backend wsgi:application \
  --workers 2 \
  --worker-class sync \
  --bind 0.0.0.0:${PORT:-8000} \
  --log-file - \
  --access-logfile - \
  --error-logfile -
