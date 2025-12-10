
import re

def strict_quote_mermaid(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Quote Node labels: ID[Text] -> ID["Text"]
    # We target [, (, {, ([ structures.
    # We must avoid matching if it already starts with ".
    # Regex: (\w+)\s*([\[\(\{]+)(?!")([^"\[\)\}\]]+)(?<!")([\]\)\}]+)
    # This is complex. Let's do distinct patterns.
    
    # Square brackets: id[text] -> id["text"]
    # Match id followed by [ then anything NOT " then ]
    # Group 1: ID
    # Group 2: Content (without quotes)
    pat_square = r'(\w+)\s*\[([^"\[\]\r\n]+)\]'
    content = re.sub(pat_square, r'\1["\2"]', content)

    # Round brackets: id(text) -> id("text")
    pat_round = r'(\w+)\s*\(([^\(" \)\r\n]+)\)' # Single word/simple text? 
                                                # Actually ( ) is often used for trapezoid or just rounded.
                                                # id(Text with spaces) is valid.
                                                # Avoid matching logical groups? No, id( ) defines a node.
    pat_round = r'(\w+)\s*\(([^"\(\)\r\n]+)\)'
    content = re.sub(pat_round, r'\1("\2")', content)

    # Curly brackets: id{text} -> id{"text"}
    pat_curly = r'(\w+)\s*\{([^"\{\}\r\n]+)\}'
    content = re.sub(pat_curly, r'\1{"\2"}', content)

    # Stadium: id([text]) -> id(["text"])
    # The previous regexes might might mistakenly match ([..]) as (..).
    # [ and ( are distinct. But ([ is a double char.
    # Let's handle special shapes explicitly FIRST.
    
    # Reset content to handle order correctly
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Stadium ([text])
    content = re.sub(r'(\w+)\s*\(\[([^"\]\)]+)\]\)', r'\1(["\2"])', content)
    
    # 2. Subroutine [[text]]
    content = re.sub(r'(\w+)\s*\[\[([^"\]]+)\]\]', r'\1[["\2"]]', content)

    # 3. Database [(text)]
    content = re.sub(r'(\w+)\s*\[\(([^\)\)]+)\)\]', r'\1[("\2")]', content)
    
    # 4. Asymmetric >text]
    content = re.sub(r'(\w+)\s*>([^"\]]+)\]', r'\1>"\2"]', content)

    # 5. Rhombus {text}
    content = re.sub(r'(\w+)\s*\{([^"\}]+)\}', r'\1{"\2"}', content)
    
    # 6. Rect [text]
    content = re.sub(r'(\w+)\s*\[([^"\[\]]+)\]', r'\1["\2"]', content)
    
    # 7. Rounded (text)
    # Be careful not to match function calls in other contexts if strict, but in mermaid blocks it's id(text)
    # Filter for mermaid syntax? The file is RST.
    # We should only apply this inside .. mermaid:: blocks logically, but
    # the patterns are specific enough to likely be safe in this file context.
    content = re.sub(r'(\w+)\s*\(([^\(\)"\r\n]+)\)', r'\1("\2")', content)

    # 8. Quote Arrow Labels: -->|text| -> -->|"text"|
    # Pattern: \-\->\|([^"\|]+)\|
    # Also -.->, ==>
    arrow_pattern = r'([=-]+)>\|([^"\|\r\n]+)\|'
    content = re.sub(arrow_pattern, r'\1>|"\2"|', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Strictly quoted Mermaid syntax in {file_path}")

strict_quote_mermaid('docs/diagramas/galeria.rst')
