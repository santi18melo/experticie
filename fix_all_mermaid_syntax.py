#!/usr/bin/env python3
"""
Script to fix Mermaid syntax issues across the project.
It converts 'graph LR' and 'graph TB' to 'flowchart LR'/'flowchart TB',
adds quotes to decision and rectangular nodes containing <br/>,
and fixes subgraph definitions without quotes.
It processes all .md and .rst files under the 'docs/diagramas' directory.
"""
import re
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "docs", "diagramas"))

# Patterns
PATTERNS_FLECHAS = [
    (r"-- No --\>", "-->|No|"),
    (r"-- Sí --\>", "-->|Sí|"),
    (r"-- Si --\>", "-->|Sí|"),
]
PATTERN_DECISION = r"\{([^{}]*?)<br/>([^{}]*?)\}"
PATTERN_RECT = r"\[([^\[\]]*?)<br/>([^\[\]]*?)\]"
PATTERN_SUBGRAPH = r"subgraph ([^\"\n]+\s[^\"\n]+)"

summary = {
    "files_processed": 0,
    "total_changes": 0,
    "flechas": 0,
    "nodos_decision": 0,
    "nodos_rectangulares": 0,
    "graph_lr": 0,
    "graph_tb": 0,
    "subgrafos": 0,
}

for root, _, files in os.walk(BASE_DIR):
    for fname in files:
        if not (fname.lower().endswith('.md') or fname.lower().endswith('.rst')):
            continue
        path = os.path.join(root, fname)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        changes = 0
        # Flechas
        for pat, repl in PATTERNS_FLECHAS:
            cnt = len(re.findall(pat, content))
            if cnt:
                content = re.sub(pat, repl, content)
                summary["flechas"] += cnt
                changes += cnt
        # Decision nodes
        matches = re.findall(PATTERN_DECISION, content)
        if matches:
            content = re.sub(PATTERN_DECISION, r'{"\1<br/>\2"}', content)
            cnt = len(matches)
            summary["nodos_decision"] += cnt
            changes += cnt
        # Rectangular nodes
        matches = re.findall(PATTERN_RECT, content)
        if matches:
            content = re.sub(PATTERN_RECT, r'["\1<br/>\2"]', content)
            cnt = len(matches)
            summary["nodos_rectangulares"] += cnt
            changes += cnt
        # graph LR/TB
        cnt_lr = len(re.findall(r"\\bgraph LR\\b", content))
        if cnt_lr:
            content = re.sub(r"\\bgraph LR\\b", "flowchart LR", content)
            summary["graph_lr"] += cnt_lr
            changes += cnt_lr
        cnt_tb = len(re.findall(r"\\bgraph TB\\b", content))
        if cnt_tb:
            content = re.sub(r"\\bgraph TB\\b", "flowchart TB", content)
            summary["graph_tb"] += cnt_tb
            changes += cnt_tb
        # Subgraph quotes
        matches_sub = re.findall(PATTERN_SUBGRAPH, content)
        if matches_sub:
            def fix_sub(m):
                txt = m.group(1).strip()
                if not (txt.startswith('"') or txt.startswith('\'')):
                    return f"subgraph \"{txt}\""
                return m.group(0)
            content = re.sub(PATTERN_SUBGRAPH, fix_sub, content)
            cnt = len(matches_sub)
            summary["subgrafos"] += cnt
            changes += cnt
        if changes:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            summary["files_processed"] += 1
            summary["total_changes"] += changes
            print(f"Processed {path}: {changes} changes")

print("\n=== Summary ===")
for k, v in summary.items():
    print(f"{k}: {v}")
