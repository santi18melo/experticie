# Script para organizar todos los archivos .md en la carpeta docs
# Categoriza los archivos según su contenido y propósito

$rootPath = "c:\experticie-3"
$docsPath = "$rootPath\docs"

# Crear estructura de carpetas en docs
$categories = @{
    "guias" = @()
    "reportes" = @()
    "implementacion" = @()
    "soluciones" = @()
    "resumenes" = @()
    "informes" = @()
    "planes" = @()
    "manuales" = @()
}

# Obtener todos los archivos .md en la raíz
$mdFiles = Get-ChildItem -Path $rootPath -Filter "*.md" -File

Write-Host "Encontrados $($mdFiles.Count) archivos .md en la raíz" -ForegroundColor Cyan

# Categorizar archivos
foreach ($file in $mdFiles) {
    $name = $file.Name.ToUpper()
    
    if ($name -like "*GUIA*" -or $name -like "*MANUAL*" -or $name -like "*INICIO*") {
        $categories["guias"] += $file
    }
    elseif ($name -like "*REPORTE*" -or $name -like "*REPORT*") {
        $categories["reportes"] += $file
    }
    elseif ($name -like "*IMPLEMENTACION*" -or $name -like "*INTEGRACION*") {
        $categories["implementacion"] += $file
    }
    elseif ($name -like "*SOLUCION*" -or $name -like "*CORRECCION*" -or $name -like "*FIX*") {
        $categories["soluciones"] += $file
    }
    elseif ($name -like "*RESUMEN*" -or $name -like "*CIERRE*" -or $name -like "*ESTADO*") {
        $categories["resumenes"] += $file
    }
    elseif ($name -like "*INFORME*" -or $name -like "*AUDITORIA*") {
        $categories["informes"] += $file
    }
    elseif ($name -like "*PLAN*" -or $name -like "*VERIFICACION*") {
        $categories["planes"] += $file
    }
    else {
        $categories["manuales"] += $file
    }
}

# Crear carpetas y mover archivos
foreach ($category in $categories.Keys) {
    $categoryPath = "$docsPath\$category"
    
    if ($categories[$category].Count -gt 0) {
        # Crear carpeta si no existe
        if (-not (Test-Path $categoryPath)) {
            New-Item -ItemType Directory -Path $categoryPath -Force | Out-Null
            Write-Host "Creada carpeta: $category" -ForegroundColor Green
        }
        
        # Mover archivos
        foreach ($file in $categories[$category]) {
            $destination = "$categoryPath\$($file.Name)"
            Move-Item -Path $file.FullName -Destination $destination -Force
            Write-Host "  Movido: $($file.Name) -> $category\" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nOrganización completada!" -ForegroundColor Green
Write-Host "`nResumen por categoría:" -ForegroundColor Cyan
foreach ($category in $categories.Keys | Sort-Object) {
    $count = $categories[$category].Count
    if ($count -gt 0) {
        Write-Host "  $category : $count archivos" -ForegroundColor White
    }
}
