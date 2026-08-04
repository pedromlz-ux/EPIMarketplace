import re

mappings = {
    "1604946BTO": "img/serveq/p3-img10.png",
    "1604060009": "img/serveq/p4-img13.png",
    "1604947000": "img/serveq/p4-img14.png",
    "160147801": "img/serveq/p4-img15.png",
    "1405460000": "img/serveq/p5-img20.png",
    "1406020000": "img/serveq/p5-img21.png",
    "140912B000": "img/serveq/p5-img22.png",
    "1202026001": "img/serveq/p7-img29.png",
    "1300490000": "img/serveq/p7-img30.png",
    "1104470000": "img/serveq/p8-img36.png",
    "1107810000": "img/serveq/p8-img37.png",
    "1308000000": "img/serveq/p9-img47.png",
    "1300501000": "img/serveq/p18-img112.png",
    "1300072000": "img/serveq/p18-img113.png",
    "1300455000": "img/serveq/p18-img114.png",
    "12012803": "img/serveq/p14-img88.png",
    "120169M200": "img/serveq/p15-img92.png",
    "1201395000": "img/serveq/p19-img116.png",
    "1300534000": "img/serveq/p20-img125.png"
}

with open('produtos.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I will find all articles and process them
# I'll use regex to split the HTML into articles, modify them, and stitch them back together
parts = re.split(r'(<article.*?</article>)', html, flags=re.DOTALL)

for i, part in enumerate(parts):
    if '<article' in part:
        # Check if it has Ref/Cód:
        match = re.search(r'Ref/Cód:\s*([A-Za-z0-9]+)<br>', part)
        if match:
            code = match.group(1)
            if code in mappings:
                # Replace the placeholder image with the actual image
                part = re.sub(r'https://via.placeholder.com/300x300.png\?text=SERVEQ', mappings[code], part)
                parts[i] = part

new_html = "".join(parts)

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Images updated successfully.")
