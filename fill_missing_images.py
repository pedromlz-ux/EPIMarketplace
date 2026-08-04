import re

with open('build_catalog.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
last_seen_image = None

for line in lines:
    # Check if line has an image
    img_match = re.search(r'"img":\s*"([^"]+)"', line)
    if img_match:
        # Update last seen image
        last_seen_image = img_match.group(1)
    else:
        # Check if line is a product without an image
        product_match = re.search(r'\{"cat":', line)
        if product_match and last_seen_image:
            # We have a product but no image, inject the last seen image
            line = re.sub(r'(\}\s*,?\s*\n)$', f', "img": "{last_seen_image}"\\1', line)

    new_lines.append(line)

with open('build_catalog.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Missing images filled with the last seen image.")
