
import re

def brutal_cleanup(file_path):
    print(f"Processing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_len = len(content)
    
    # 1. Replace all HTML breaks with \n
    # We want literary backslash+n. So in replacement string it is r'\n' which means backslash+n?
    # No, in python regex sub:
    # If we want output text to contain literal "\n", replacement must be r'\\n'.
    # Because backslash escapes the next char.
    content = re.sub(r'<br\s*/?>', r'\\n', content, flags=re.IGNORECASE)
    
    # 2. Remove quotes from arrow labels
    # Covers -->, -.->, ==>
    # Pattern: (arrow)>|"text"|
    # Only if text doesn't contain pipes or complex chars that require quotes? 
    # Usually simple text like "Sí", "No".
    # Regex: ([=\-\.]+)>\|"([^"\|\r\n]+)"\|
    content = re.sub(r'([=\-\.]+)>\|"([^"\|\r\n]+)"\|', r'\1>|\2|', content)
    
    # 3. Handle the spaced quotes case if present: -->| " Text " |
    content = re.sub(r'([=\-\.]+)>\|\s*"([^"\|\r\n]+)"\s*\|', r'\1>|\2|', content)

    # 4. Remove empty double quotes "" inside labels if any remains from bad replaces
    # e.g. ID["some""text"] -> ID["some text"]
    # This is risky globally. Let's skip global replace of "" unless we are sure.
    # Instead, fixing specific quad quotes """" -> "
    content = content.replace('""""', '"')
    
    # 5. Fix escaped quotes that might be \"
    # Mermaid 10.9.1 doesn't like \" sometimes inside "..." if not needed?
    # Actually \" is standard escape.
    
    # 6. Ensure %% comments loop hack is fixed
    # %% Error Loops("...") invalid. %% Error Loops ("...") valid text.
    # But %% starts a comment line.
    # We don't need to fix comments syntax rigidly, but let's ensure no weird parenthesis glue.
    content = content.replace('Loops("', 'Loops ("')

    if len(content) != original_len or content != open(file_path, 'r', encoding='utf-8').read():
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Brutal cleanup applied changes.")
    else:
        print("No changes needed by brutal cleanup.")

brutal_cleanup('docs/diagramas/galeria.rst')
