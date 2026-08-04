with open('produtos.html', 'r', encoding='utf-8') as f:
    html = f.read()

count = html.count('<article')
html = html.replace('<strong id="count-display">6</strong>', f'<strong id="count-display">{count}</strong>')

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(html)
