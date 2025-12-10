
import re
import base64
import json

def update_gallery_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find mermaid blocks
    # Looking for .. mermaid:: \n\n (indented content)
    # This is tricky with regex alone because of indentation.
    # However, the structure seems to be:
    # .. mermaid::
    #
    #     code
    #     code...
    #
    # .. div:: diagram-controls
    #
    #     .. button-link:: url
    
    # We will iterate through the file line by line to extract blocks.
    lines = content.splitlines()
    new_lines = []
    
    current_mermaid_code = []
    in_mermaid_block = False
    mermaid_indent = 0
    
    # Iterate
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Start of mermaid block
        if stripped == '.. mermaid::':
            in_mermaid_block = True
            new_lines.append(line)
            i += 1
            # Skip empty lines potentially
            while i < len(lines) and not lines[i].strip():
                new_lines.append(lines[i])
                i += 1
            
            # Now we are at the first line of code
            if i < len(lines):
                # Calculate indent
                mermaid_indent = len(lines[i]) - len(lines[i].lstrip())
                current_mermaid_code = [lines[i]]
                new_lines.append(lines[i])
                i += 1
            
            continue
            
        if in_mermaid_block:
            # Check if still in block
            if not stripped: # Empty line is part of block usually or separator
                if i + 1 < len(lines) and '.. div:: diagram-controls' in lines[i+1]:
                    # End of mermaid block
                    in_mermaid_block = False
                    # Process the accumulated code for the next buttons
                    full_code = "\n".join([l[mermaid_indent:] for l in current_mermaid_code])
                    
                    # Prepare base64
                    # Mermaid live expects format:
                    # {
                    #   "code": "graph TD ...",
                    #   "mermaid": {"theme": "default"},
                    #   "autoSync": true,
                    #   "updateDiagram": true
                    # }
                    state = {
                        "code": full_code,
                        "mermaid": {"theme": "default"},
                        "autoSync": True,
                        "updateDiagram": True
                    }
                    json_str = json.dumps(state)
                    base64_str = base64.b64encode(json_str.encode('utf-8')).decode('utf-8')
                    
                    link_view = f"https://mermaid.live/view#base64:{base64_str}"
                    link_edit = f"https://mermaid.live/edit#base64:{base64_str}"
                    
                    new_lines.append(line) # Add the empty line
                    i += 1
                    
                    # Expecting .. div:: diagram-controls
                    if i < len(lines) and '.. div:: diagram-controls' in lines[i]:
                        new_lines.append(lines[i])
                        i += 1
                        
                        # Process inside div
                        while i < len(lines):
                            l = lines[i]
                            if '.. button-link::' in l:
                                # Replace the URL
                                indent = l[:l.find('..')]
                                if 'Zoom' in lines[i+4] or 'Zoom' in lines[i+5] or (i+5 < len(lines) and 'Zoom' in lines[i+5]): 
                                    # This is the view/zoom button (usually comes first)
                                    new_lines.append(f"{indent}.. button-link:: {link_view}")
                                    # Skip the old link line
                                    i += 1
                                    # Copy attributes until text
                                    while i < len(lines) and not lines[i].strip():
                                        new_lines.append(lines[i])
                                        i += 1
                                    while i < len(lines) and lines[i].strip().startswith(':'):
                                        new_lines.append(lines[i])
                                        i += 1
                                    continue
                                    
                                elif 'Editar' in lines[i+4] or 'Editar' in lines[i+5] or (i+5 < len(lines) and 'Editar' in lines[i+5]):
                                    # This is the edit button
                                    new_lines.append(f"{indent}.. button-link:: {link_edit}")
                                    i += 1
                                    while i < len(lines) and not lines[i].strip():
                                        new_lines.append(lines[i])
                                        i += 1
                                    while i < len(lines) and lines[i].strip().startswith(':'):
                                        new_lines.append(lines[i])
                                        i += 1
                                    continue
                                else:
                                    # Fallback if text logic fails, just replace sequentially? 
                                    # Better not risk it if pattern doesn't match perfectly.
                                    # But we observed the pattern.
                                    # Let's assume the first button is view, second is edit.
                                    # Actually, let's just use the current line replacement for now.
                                    # We need to detect which button it is.
                                    pass
                                    
                            if not l.strip() and i+1 < len(lines) and '.. tab-item::' in lines[i+1]:
                                # End of div controls
                                new_lines.append(l)
                                i += 1
                                break
                                
                            new_lines.append(l)
                            i += 1
                    continue

                else:
                    # Still in mermaid block code
                    current_mermaid_code.append(line)
                    new_lines.append(line)
                    i += 1
            else:
                 # Still in mermaid block code
                current_mermaid_code.append(line)
                new_lines.append(line)
                i += 1
        else:
            new_lines.append(line)
            i += 1

    return "\n".join(new_lines)

# Run
path = 'docs/diagramas/galeria.rst'
new_content = update_gallery_links(path)
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated gallery links successfully.")
