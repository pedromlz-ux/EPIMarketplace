import re
import os
import glob

with open('build_catalog.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

image_files = os.listdir('img/serveq')
image_files = [img for img in image_files if img.endswith('.png') and img.startswith('p')]

images_by_page = {}
for img in image_files:
    match = re.match(r'p(\d+)-img(\d+)\.png', img)
    if match:
        page = int(match.group(1))
        num = int(match.group(2))
        if page not in images_by_page:
            images_by_page[page] = []
        images_by_page[page].append((num, img))

for page in images_by_page:
    images_by_page[page].sort()

current_page = None
new_lines = []
for line in lines:
    page_match = re.search(r'# Page (\d+)', line)
    if page_match:
        current_page = int(page_match.group(1))
    
    product_match = re.search(r'\{"cat":', line)
    if product_match and current_page is not None:
        if '"img":' not in line:
            if current_page in images_by_page and len(images_by_page[current_page]) > 0:
                num, img_filename = images_by_page[current_page].pop(0)
                line = re.sub(r'(\}\s*,?\s*\n)$', f', "img": "img/serveq/{img_filename}"\\1', line)

    new_lines.append(line)

with open('build_catalog.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Mapping completed!")
