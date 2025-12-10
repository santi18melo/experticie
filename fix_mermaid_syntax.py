"""
Script para corregir sintaxis de Mermaid en galeria.rst
Compatible con Mermaid 10.2.0+
"""
import re

# Leer el archivo
with open('docs/diagramas/galeria.rst', 'r', encoding='utf-8') as f:
    content = f.read()

# Patrones a corregir para Mermaid 10.2.0
replacements = [
    # Cambiar "-- No -->" a "-->|No|"
    (r'-- No -->', '-->|No|'),
    # Cambiar "-- Sí -->" a "-->|Sí|"  
    (r'-- Sí -->', '-->|Sí|'),
    # Cambiar "-- Si -->" a "-->|Sí|"
    (r'-- Si -->', '-->|Sí|'),
]

# Aplicar reemplazos
for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Guardar el archivo corregido
with open('docs/diagramas/galeria.rst', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Archivo corregido exitosamente")
print(f"Total de caracteres: {len(content)}")
