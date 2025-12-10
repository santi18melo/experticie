"""
Script completo para corregir TODOS los problemas de sintaxis Mermaid 10.2.0+
"""
import re

# Leer el archivo
with open('docs/diagramas/galeria.rst', 'r', encoding='utf-8') as f:
    content = f.read()

print("🔧 Iniciando correcciones de sintaxis Mermaid...")

# Contador de cambios
changes = {
    'flechas': 0,
    'nodos_decision': 0,
    'nodos_rectangulares': 0,
    'subgrafos': 0,
    'graph_lr_to_flowchart': 0,
    'graph_tb_to_flowchart': 0
}

# 1. Cambiar sintaxis de flechas con etiquetas
patterns_flechas = [
    (r'-- No -->', '-->|No|'),
    (r'-- Sí -->', '-->|Sí|'),
    (r'-- Si -->', '-->|Sí|'),
]

for pattern, replacement in patterns_flechas:
    count = len(re.findall(pattern, content))
    content = re.sub(pattern, replacement, content)
    changes['flechas'] += count

# 2. Agregar comillas a nodos de decisión con <br/>
pattern_decision = r'\{([^{}]*?)<br/>([^{}]*?)\}'
matches = re.findall(pattern_decision, content)
content = re.sub(pattern_decision, r'{"\1<br/>\2"}', content)
changes['nodos_decision'] = len(matches)

# 3. Agregar comillas a nodos rectangulares con <br/>
pattern_rect = r'\[([^\[\]]*?)<br/>([^\[\]]*?)\]'
matches = re.findall(pattern_rect, content)
content = re.sub(pattern_rect, r'["\1<br/>\2"]', content)
changes['nodos_rectangulares'] = len(matches)

# 4. Cambiar "graph LR" a "flowchart LR"
count_lr = len(re.findall(r'\bgraph LR\b', content))
content = re.sub(r'\bgraph LR\b', 'flowchart LR', content)
changes['graph_lr_to_flowchart'] = count_lr

# 5. Cambiar "graph TB" a "flowchart TB"
count_tb = len(re.findall(r'\bgraph TB\b', content))
content = re.sub(r'\bgraph TB\b', 'flowchart TB', content)
changes['graph_tb_to_flowchart'] = count_tb

# 6. Corregir sintaxis de subgrafos (agregar comillas si tienen espacios)
# Patrón: subgraph "texto con espacios"
pattern_subgraph = r'subgraph ([^"\n]+\s[^"\n]+)'
def fix_subgraph(match):
    text = match.group(1).strip()
    if not text.startswith('"') and not text.startswith("'"):
        return f'subgraph "{text}"'
    return match.group(0)

matches_subgraph = re.findall(pattern_subgraph, content)
content = re.sub(pattern_subgraph, fix_subgraph, content)
changes['subgrafos'] = len(matches_subgraph)

# Guardar el archivo corregido
with open('docs/diagramas/galeria.rst', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Archivo corregido exitosamente")
print(f"📊 Total de caracteres: {len(content):,}")
print("\n📈 Correcciones aplicadas:")
print(f"  - Flechas con etiquetas: {changes['flechas']}")
print(f"  - Nodos de decisión con <br/>: {changes['nodos_decision']}")
print(f"  - Nodos rectangulares con <br/>: {changes['nodos_rectangulares']}")
print(f"  - graph LR → flowchart LR: {changes['graph_lr_to_flowchart']}")
print(f"  - graph TB → flowchart TB: {changes['graph_tb_to_flowchart']}")
print(f"  - Subgrafos corregidos: {changes['subgrafos']}")
print(f"\n🎯 Total de cambios: {sum(changes.values())}")
