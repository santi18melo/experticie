#!/bin/bash
# Script para cargar datos de prueba en Windows/Linux

echo "╔════════════════════════════════════════════════════════╗"
echo "║      CARGANDO DATOS DE PRUEBA - APP PRODUCTOS        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Método 1: Usando stdin directo
echo "Intentando método 1 (stdin directo)..."
python manage.py shell < test_productos.py

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Datos cargados exitosamente"
else
    echo ""
    echo "⚠️  Método 1 falló, intentando método 2..."
    
    # Método 2: Ejecutar archivo dentro del shell
    python manage.py shell << EOF
exec(open('test_productos_v2.py').read())
EOF
fi

echo ""
echo "✅ ¡Listo! Los datos de prueba han sido cargados."
echo ""
echo "Próximos pasos:"
echo "1. Inicia el servidor: python manage.py runserver"
echo "2. Accede al admin: http://localhost:8000/admin/"
echo "3. Prueba los endpoints: http://localhost:8000/api/"
