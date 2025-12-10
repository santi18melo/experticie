
import re

def cleanup_mermaid(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace <br/> and <br> with \n inside quoted strings?
    # Actually, global replace inside likely mermaid blocks is safer.
    # But let's be careful.
    # The file has RST context too. But <br/> in RST is usually for newlines? 
    # RST uses |br| or similar. <br/> is HTML. 
    # It likely only exists inside the Mermaid definitions we previously touched.
    
    # We will iterate lines to be safe and only touch mermaid blocks.
    lines = content.splitlines()
    new_lines = []
    in_mermaid = False
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('.. mermaid::'):
            in_mermaid = True
            new_lines.append(line)
            continue
            
        if in_mermaid:
            # Heuristic to detect end of mermaid block
            # Empty lines are allowed in mermaid block, but indentation matters in RST.
            # If line is NOT empty and indentation is same or less than block start?
            # Actually, Sphinx block ends when indentation returns to previous level.
            # But the controls div starts with `.. div::`.
            if '.. div::' in stripped or '.. card::' in stripped or '.. dropdown::' in stripped:
                in_mermaid = False
                new_lines.append(line)
                continue
            
            # Use regex to find strings "..." and replace <br/> inside them
            # Also handle Arrow labels |"..."|
            
            # Function to replace <br/> with \n inside a match
            def replace_br(match):
                text = match.group(0)
                # Replace <br/>, <br>, <br /> with \n
                return re.sub(r'<br\s*/?>', r'\\n', text)
            
            # Apply to quoted strings "..."
            # Pattern: "([^"]*)"
            line = re.sub(r'"([^"]*)"', replace_br, line)
            
            # Also remove quotes from arrow labels if they were added strict
            # Pattern: >\|"([^"]+)"\|
            # We want to turn >|"Text"| into >|Text| if Text is safe?
            # Or just cleaner: "Text" inside label shows quotes.
            # We should remove them.
            # >|"Yes"| -> >|Yes|
            # But only if it was added by us.
            line = re.sub(r'>\|"([^"\|]+)"\|', r'>|\1|', line)
            
            # Fix that specific comment issue: %% Error Loops("...") -> %% Error Loops (...)
            if '%%' in line:
               line = line.replace('("', ' (').replace('")', ')')

            new_lines.append(line)
        else:
            new_lines.append(line)
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(new_lines))
    print(f"Cleaned up Mermaid syntax in {file_path}")

cleanup_mermaid('docs/diagramas/galeria.rst')
