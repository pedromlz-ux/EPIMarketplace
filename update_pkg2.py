import json

with open('package.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['scripts'] = {
    "start": "serve .",
    "dev": "serve ."
}

if 'dependencies' in data:
    del data['dependencies']
if 'devDependencies' in data:
    data['devDependencies'] = {"serve": "^14.2.6"}
if 'main' in data:
    del data['main']

with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
