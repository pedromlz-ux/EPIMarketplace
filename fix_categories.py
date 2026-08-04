import re

with open('build_catalog.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []

for line in lines:
    if '{"cat":' in line:
        # Extract title
        title_match = re.search(r'"title":\s*"([^"]+)"', line)
        if title_match:
            title = title_match.group(1).lower()
            
            # Category replacements based on title
            new_cat = None
            
            # Carretilhas / Roldanas
            if 'carretilha' in title or 'roldana' in title:
                new_cat = 'carretilhas'
            # Grampos / Cabeçotes
            elif ('grampo' in title or 'cabeçote' in title) and 'conj.' not in title and 'conjunto' not in title:
                new_cat = 'grampos'
            # Esticadores / Esporas
            elif 'esticador' in title or 'espora' in title or 'correia e almofada p/ espora' in title:
                new_cat = 'esticadores'
            # Pega Poste
            elif 'pega poste' in title or 'pega-poste' in title:
                new_cat = 'pega-poste'
            # Guincho / Talha
            elif 'guincho' in title or 'talha' in title or 'tifor' in title:
                new_cat = 'guincho'
            # Selas / Cintas / Colar
            elif 'sela' in title or 'cinta p/' in title or 'colar de' in title:
                if 'abdominal' not in title:
                    new_cat = 'selas'
            
            # Apply new category if matched
            if new_cat:
                line = re.sub(r'"cat":\s*"[^"]+"', f'"cat": "{new_cat}"', line)
            else:
                # If it's still 'ferramentas', rename it to 'epi' so it falls under 'EPIs / Ferramentas'
                line = re.sub(r'"cat":\s*"ferramentas"', '"cat": "epi"', line)

    new_lines.append(line)

with open('build_catalog.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Categories updated successfully.")
