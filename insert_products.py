import bs4

products = [
    # Coberturas
    {"cat": "coberturas", "badge": "Linha Viva", "title": "Cobertura p/ Condutor B.T até 25mm", "code": "1604946BTO", "desc": "Coberturas utilizadas para isolamento de condutores de até 25mm de diâmetro."},
    {"cat": "coberturas", "badge": "Linha Viva", "title": "Cobertura protetora para chave fusível", "code": "1604060009", "desc": "Cobertura presa por um pino pela parte traseira do isolador, apoiada sobre o sporte metálico."},
    {"cat": "coberturas", "badge": "Linha Viva", "title": "Cobertura p/ Isolador de pino (João de Barro)", "code": "1604947000", "desc": "Coberturas utilizadas para a proteção das partes energizadas junto aos isoladores de pino."},
    {"cat": "coberturas", "badge": "Linha Viva", "title": "Cobertura para extremidade da cruzeta", "code": "160147801", "desc": "Utilizadas pra proteger a extremidade da cruzeta, a fim de evitar o contato acidental."},
    
    # Bastões
    {"cat": "bastoes", "badge": "Linha Viva", "title": "Bastão de tração c/ torniquete", "code": "1405460000", "desc": "Bastão de tração com torniquete para trabalhos em linha viva."},
    {"cat": "bastoes", "badge": "Linha Viva", "title": "Bastão de tração espiral", "code": "1406020000", "desc": "Bastão de tração modelo espiral."},
    {"cat": "bastoes", "badge": "Linha Viva", "title": "Vara de manobra c/ 5 elementos", "code": "140912B000", "desc": "Vara de manobra com cabeçote."},
    
    # Lençol Isolante
    {"cat": "isolantes", "badge": "Isolação", "title": "Lençol Isolante 2 x 250 x 900 mm", "code": "1202026001", "desc": "Lençol isolante de borracha para baixa e alta tensão."},
    {"cat": "isolantes", "badge": "Isolação", "title": "Manta isolante CL II ou CL IV", "code": "1300490000", "desc": "Manta isolante CL II ou CL IV, com fenda ou sem fenda."},
    
    # Conjunto de Aterramento
    {"cat": "aterramento", "badge": "Segurança", "title": "Conj. aterramento p/ curto-circuitamento", "code": "1104470000", "desc": "Conjunto de aterramento temporário p/ rede secundária BT, c/ 4 ou 5 grampos."},
    {"cat": "aterramento", "badge": "Segurança", "title": "Conj. aterramento rápido 22kV", "code": "1107810000", "desc": "Conjunto de aterramento rápido e temporário, p/ linhas de distribuição aérea até 22kV."},
    {"cat": "aterramento", "badge": "Segurança", "title": "Detector de tensão por aproximação", "code": "1308000000", "desc": "Detector de tensão por aproximação com três faixas de medição."},

    # Ferramentas Isoladas
    {"cat": "ferramentas", "badge": "Ferramentas", "title": "Alicate de corte isolado", "code": "1300501000", "desc": "Alicate de corte com isolamento de 1000V."},
    {"cat": "ferramentas", "badge": "Ferramentas", "title": "Alicate universal isolado", "code": "1300072000", "desc": "Alicate universal com isolamento para eletricistas."},
    {"cat": "ferramentas", "badge": "Ferramentas", "title": "Chave inglesa isolada", "code": "1300455000", "desc": "Chave inglesa isolada para trabalhos seguros."},
    
    # EPIs / Bolsas
    {"cat": "epis", "badge": "NR-35", "title": "Cinto Tipo Paraquedista", "code": "12012803", "desc": "Confeccionado em fita de poliéster retardante a chama; acolchoado na lombar e nas pernas."},
    {"cat": "epis", "badge": "NR-35", "title": "Talabarte I c/ absorvedor de energia", "code": "120169M200", "desc": "Talabarte I com absorvedor de energia e 2 mosquetões."},
    {"cat": "epis", "badge": "Acessórios", "title": "Bolsa de lona ou couro p/ EPIs", "code": "1201395000", "desc": "Bolsa p/ acondicionamento e transporte de EPIs e ferramentas c/ fechamento via cadeado."},
    {"cat": "epis", "badge": "NR-10", "title": "Luva isolante de borracha", "code": "1300534000", "desc": "Luva isolante de borracha: CL 0, CL 00, CL 1, CL 2, CL 3, CL4."}
]

html_template = """
          <article class="product-card reveal" data-category="{cat}" role="listitem" aria-label="{title}">
            <div class="product-card__inner">
              <div class="product-card__front">
                <div class="product-card__image" onclick="this.closest('.product-card').classList.toggle('flipped')" tabindex="0">
                  <img src="https://via.placeholder.com/300x300.png?text=SERVEQ" alt="{title}" loading="lazy" width="300" height="300">
                  <div class="product-card__badge">
                    <span class="badge badge--success">Serveq</span>
                  </div>
                  <div class="product-card__overlay">
                    <svg onclick="event.stopPropagation(); openLightbox(this.closest('.product-card'))" class="zoom-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                    <h3 class="product-card__overlay-title">{title}</h3>
                    <span class="badge badge--navy">{badge}</span>
                  </div>
                </div>
              </div>
              <div class="product-card__back">
                <div class="product-card__body">
                  <div class="product-card__category">{badge}</div>
                  <h3 class="product-card__name">{title}</h3>
                  <div class="product-card__specs">
                    Ref/Cód: {code}<br>
                    {desc}
                  </div>
                  <div class="product-card__actions">
                    <button class="btn btn--primary btn--sm btn-add-cart" data-product="{title}">Adicionar ao Carrinho</button>
                  </div>
                </div>
              </div>
            </article>
"""

with open('produtos.html', 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f, 'html.parser')

grid = soup.find(id='products-grid')

for p in products:
    article_html = html_template.format(
        cat=p['cat'],
        title=p['title'].replace('"', '&quot;'),
        badge=p['badge'],
        code=p['code'],
        desc=p['desc']
    )
    new_tag = bs4.BeautifulSoup(article_html, 'html.parser')
    grid.append(new_tag)

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
