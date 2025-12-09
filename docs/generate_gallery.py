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
    rst_content.append("A continuación se presentan todos los diagramas del sistema organizados visualmente.")
    rst_content.append("Use las pestañas para alternar entre la visualización y el código fuente.")
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
        
        rst_content.append(f".. dropdown:: {title}")
        rst_content.append(f"    :open:")
        rst_content.append(f"    :icon: graph")
        rst_content.append("")
        
        for i, code in enumerate(mermaid_blocks):
            diagram_name = f"Diagrama {i+1}"
            link = generate_mermaid_link(code)
            
            rst_content.append(f"    .. card:: {diagram_name}")
            rst_content.append(f"        :class-card: sd-mb-3")
            rst_content.append("")
            
            rst_content.append(f"        .. tab-set::")
            rst_content.append("")
            
            # Tab 1: Visualización
            rst_content.append(f"            .. tab-item:: 👁️ Visualización")
            rst_content.append(f"                :sync: view")
            rst_content.append("")
            rst_content.append(f"                .. mermaid::")
            rst_content.append("")
            for line in code.split('\n'):
                rst_content.append(f"                    {line}")
            rst_content.append("")
            rst_content.append(f"                .. button-link:: {link}")
            rst_content.append(f"                    :color: primary")
            rst_content.append(f"                    :icon: octicon:pencil")
            rst_content.append(f"                    :expand:")
            rst_content.append("")
            rst_content.append(f"                    Editar en Mermaid Live")
            rst_content.append("")

            # Tab 2: Código Fuente
            rst_content.append(f"            .. tab-item:: 📝 Código Fuente")
            rst_content.append(f"                :sync: code")
            rst_content.append("")
            rst_content.append(f"                .. code-block:: mermaid")
            rst_content.append("")
            for line in code.split('\n'):
                rst_content.append(f"                    {line}")
            rst_content.append("")
        
        rst_content.append("")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(rst_content))
    
    print(f"Gallery generated at {OUTPUT_FILE}")

if __name__ == '__main__':
    parse_markdown_files()
