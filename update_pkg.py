import json

with open('package.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['scripts']['start'] = 'serve .'
data['scripts']['dev:static'] = 'serve .'

with open('package.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
