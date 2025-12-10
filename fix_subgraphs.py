
import re
import os

def fix_subgraphs(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Pattern 1: subgraph ID ["Label"]
    # We want to keep just subgraph "Label"
    # Example: subgraph Autenticacion["Módulo de Autenticación"] -> subgraph "Módulo de Autenticación"
    
    # Regex explanation:
    # subgraph\s+     : matches "subgraph "
    # \w+             : matches the ID (e.g. Autenticacion)
    # \s*             : optional space
    # \[              : opening bracket
    # \"?             : optional quote
    # ([^\]"]+)       : capture group 1 (The Label text, excluding quotes/brackets)
    # \"?             : optional quote
    # \]              : closing bracket
    
    # We need to be careful not to match simple `subgraph Title`.
    # This pattern specifically looks for the [...] structure.
    
    pattern = r'subgraph\s+\w+\s*\["([^"]+)"\]'
    
    def replacer(match):
        label = match.group(1)
        return f'subgraph "{label}"'
    
    new_content = re.sub(pattern, replacer, content)
    
    # Also handle [Title] without quotes inside
    pattern2 = r'subgraph\s+\w+\s*\[([^"\]]+)\]'
    # Note: pattern2 captures non-quoted text inside []
    
    def replacer2(match):
        label = match.group(1).strip()
        return f'subgraph "{label}"'

    new_content = re.sub(pattern2, replacer2, new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed subgraphs in {file_path}")
    else:
        print(f"No subgraphs to fix in {file_path}")

# Run on galeria.rst
fix_subgraphs('docs/diagramas/galeria.rst')
