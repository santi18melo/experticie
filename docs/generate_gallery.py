import os
import re
import json
import base64

DIAGRAMS_DIR = os.path.join(os.path.dirname(__file__), 'diagramas')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'diagramas', 'galeria.rst')

def generate_mermaid_link(code):
    state = {
        "code": code,
        "mermaid": {"theme": "default"},
        "autoSync": True,
        "updateDiagram": True
    }
    json_state = json.dumps(state)
    base64_state = base64.b64encode(json_state.encode('utf-8')).decode('utf-8')
    return f"https://mermaid.live/edit#base64:{base64_state}"

def parse_markdown_files():
    rst_content = []
    rst_content.append("Galería Visual de Diagramas")
    rst_content.append("===========================")
    rst_content.append("")
    rst_content.append("A continuación se presentan todos los diagramas del sistema renderizados dinámicamente.")
    rst_content.append("Use el enlace 'Editar en Mermaid Live' para abrir el diagrama en el editor online.")
    rst_content.append("")

    files = sorted([f for f in os.listdir(DIAGRAMS_DIR) if f.endswith('.md') and not f.startswith('INDEX') and not f.startswith('INDICE') and not f.startswith('RESUMEN')])

    for filename in files:
        filepath = os.path.join(DIAGRAMS_DIR, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all mermaid blocks
        mermaid_blocks = re.findall(r'```mermaid\n(.*?)\n```', content, re.DOTALL)
        
        if not mermaid_blocks:
            continue

        title = filename.replace('.md', '').replace('_', ' ').title()
        rst_content.append(title)
        rst_content.append("-" * len(title))
        rst_content.append("")

        for i, code in enumerate(mermaid_blocks):
            diagram_name = f"Diagrama {i+1} de {title}"
            link = generate_mermaid_link(code)
            
            rst_content.append(diagram_name)
            rst_content.append("^" * len(diagram_name))
            rst_content.append("")
            
            # Using raw directive for cleaner indentation handling if needed, but standard mermaid block is fine
            rst_content.append(".. mermaid::")
            rst_content.append("")
            for line in code.split('\n'):
                rst_content.append(f"   {line}")
            rst_content.append("")
            
            rst_content.append(f"`✏️ Editar este diagrama en Mermaid Live <{link}>`_")
            rst_content.append("")
            rst_content.append(".. raw:: html")
            rst_content.append("")
            rst_content.append("   <br><hr><br>")
            rst_content.append("")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(rst_content))
    
    print(f"Gallery generated at {OUTPUT_FILE}")

if __name__ == '__main__':
    parse_markdown_files()
