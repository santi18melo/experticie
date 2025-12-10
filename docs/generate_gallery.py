import os
import re
import json
import base64

DIAGRAMS_DIR = os.path.join(os.path.dirname(__file__), 'diagramas')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'diagramas', 'galeria.rst')

def generate_mermaid_link(code, mode="edit"):
    state = {
        "code": code,
        "mermaid": {"theme": "default"},
        "autoSync": True,
        "updateDiagram": True
    }
    json_state = json.dumps(state)
    base64_state = base64.b64encode(json_state.encode('utf-8')).decode('utf-8')
    if mode == "view":
        return f"https://mermaid.live/view#base64:{base64_state}"
    return f"https://mermaid.live/edit#base64:{base64_state}"

def parse_markdown_files():
    rst_content = []
    
    # Header with Hero Section
    rst_content.append("Galería Visual de Diagramas")
    rst_content.append("===========================")
    rst_content.append("")
    rst_content.append("Explora la arquitectura y flujos de PREXCOL a través de nuestra galería interactiva.")
    rst_content.append("")
    
    # Botones de acceso rápido usando grid estándar y clases nativas
    rst_content.append(".. container:: sd-p-4 sd-bg-light sd-rounded sd-shadow-sm sd-mb-4 sd-text-center")
    rst_content.append("")
    rst_content.append("    **Accesos Rápidos**")
    rst_content.append("")
    rst_content.append("    .. grid:: 2")
    rst_content.append("        :gutter: 3")
    rst_content.append("")
    rst_content.append("        .. grid-item::")
    rst_content.append("            .. button-link:: http://localhost:5175")
    rst_content.append("                :color: success")
    rst_content.append("                :shadow:")
    rst_content.append("                :expand:")
    rst_content.append("                :icon: octicon:browser")
    rst_content.append("")
    rst_content.append("                IR A LA APLICACIÓN")
    rst_content.append("")
    rst_content.append("        .. grid-item::")
    rst_content.append("            .. button-link:: http://localhost:8000/admin")
    rst_content.append("                :color: primary")
    rst_content.append("                :shadow:")
    rst_content.append("                :expand:")
    rst_content.append("                :icon: octicon:server")
    rst_content.append("")
    rst_content.append("                IR AL BACKEND")
    rst_content.append("")
    rst_content.append("---")
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
        
        # Removed broken badge syntax from title
        rst_content.append(f".. dropdown:: 📊 {title} ({len(mermaid_blocks)} diagramas)")
        rst_content.append(f"    :open:")
        rst_content.append(f"    :class-container: sd-mb-4")
        rst_content.append("")
        
        for i, code in enumerate(mermaid_blocks):
            diagram_name = f"Diagrama {i+1}"
            edit_link = generate_mermaid_link(code, mode="edit")
            view_link = generate_mermaid_link(code, mode="view")
            
            rst_content.append(f"    .. card::")
            rst_content.append(f"        :class-card: sd-mb-4 sd-shadow-sm")
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
            
            # Botones de acción (Pie de la tarjeta)
            rst_content.append("                .. div:: diagram-controls")
            rst_content.append("")
            rst_content.append(f"                    .. button-link:: {view_link}")
            rst_content.append(f"                        :color: info")
            rst_content.append(f"                        :icon: octicon:search")
            rst_content.append(f"                        :outline:")
            rst_content.append("")
            rst_content.append(f"                        🔍 Zoom / Pantalla Completa")
            rst_content.append("")
            rst_content.append(f"                    .. button-link:: {edit_link}")
            rst_content.append(f"                        :color: secondary")
            rst_content.append(f"                        :icon: octicon:pencil")
            rst_content.append(f"                        :outline:")
            rst_content.append("")
            rst_content.append(f"                        ✏️ Editar en Vivo")
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
