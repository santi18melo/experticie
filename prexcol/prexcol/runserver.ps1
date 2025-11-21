#!/bin/bash
# Script PowerShell para iniciar servidor Django

Write-Host "Activando entorno virtual..." -ForegroundColor Green
& .\venv\Scripts\Activate.ps1

Write-Host ""
Write-Host "Iniciando servidor Django en http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "Presiona CTRL+C para detener" -ForegroundColor Yellow
Write-Host ""

python manage.py runserver
