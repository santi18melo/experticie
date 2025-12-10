
import re

def normalize_mermaid(file_path):
    print(f"Reading {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    in_mermaid = False
    
    # Regexes
    # 1. Match Arrow Label with quotes: -->|"Text"| or -.->|"Text"| or ==>|"Text"|
    # Matches >| then " then text then " then |
    # We capture the text and replace with >|text|
    regex_arrow_quote = re.compile(r'>\|"([^"\|]+)"\|')
    
    # 2. Match <br> tags
    regex_br = re.compile(r'<br\s*/?>', re.IGNORECASE)

    for line in lines:
        original = line
        stripped = line.strip()
        
        if stripped.startswith('.. mermaid::'):
            in_mermaid = True
            new_lines.append(line)
            continue
            
        if in_mermaid:
            # Check for end of block (less indented or specific directives)
            # RST blocks end when indentation changes back, usually. 
            # But here we rely on the next directive start or empty lines if strict?
            # The previous script looked for directives.
            if stripped.startswith('.. '):
                in_mermaid = False
                new_lines.append(line)
                continue
            
            # If line is empty, it's fine, keep in block or out, doesn't matter much for regex
            if not stripped:
                new_lines.append(line)
                continue

            # Apply replacements
            
            # 1. Arrow Labels
            # Replace >|"Content"| with >|Content|
            # We iterate to handle multiple arrows in one line if any
            while regex_arrow_quote.search(line):
                line = regex_arrow_quote.sub(r'>|\1|', line)
                
            # 2. BR tags to \n
            # Only if inside quotes? Flowchart usually has quotes for text with breaks.
            # ID["Line<br>Break"] -> ID["Line\nBreak"]
            if regex_br.search(line):
                line = regex_br.sub(r'\\n', line)
                
            if line != original:
                print(f"Modified: {original.strip()} -> {line.strip()}")
                
            new_lines.append(line)
        else:
            new_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write("".join(new_lines))
    print("Updates saved.")

normalize_mermaid('docs/diagramas/galeria.rst')
