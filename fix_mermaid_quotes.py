
import re
import os

def fix_double_quotes(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace """" with "
    new_content = content.replace('""""', '"')
    
    # Also handle the case where it might be triple quotes or just double
    # The pattern seen was """"Text"""" 
    # Replacing """" with " should fix """"Text"""" -> "Text"
    
    # Just in case, let's also look for ""Text"" if they exist (double quotes)
    # But be careful not to break empty strings "" (though unlikely in current context)
    # The regex approach is safer for patterns.
    
    # Pattern: {"""..."""} or ["""..."""]
    # Actually, simpler: replace """" with " is safe because 4 quotes is definitely wrong in Mermaid.
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed quadruple quotes in {file_path}")
        return True
        
    # Check for double quotes ""Text"" which should be "Text"
    # Regex: replace ""([^"]+)"" with "\1"
    # But literal "" is used for escaping in some languages, not Mermaid.
    # Mermaid uses "Text".
    
    # Let's try to replace "" with " generally? No, that might break empty strings.
    # But in Mermaid labels: `Id["Label"]` is correct. `Id[""Label""]` is wrong.
    # So `""` (two quotes) generally shouldn't exist unless it's an empty string.
    
    # Let's use regex to find ""Text"" and replace with "Text"
    # Pattern: (?<=[\[\{\(])\"\"(.*?)\"\"(?=[\]\}\)])
    # Matches ""..."" inside [], {}, ()
    
    pattern_double = r'(?<=[\[\{\(])""(.*?)""(?=[\]\}\)])'
    new_content_2 = re.sub(pattern_double, r'"\1"', new_content)
    
    if new_content_2 != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content_2)
        print(f"Fixed double quotes in {file_path}")
        return True

    print(f"No quadruple/double quotes found in {file_path}")
    return False

# Run on galeria.rst
fix_double_quotes('docs/diagramas/galeria.rst')
