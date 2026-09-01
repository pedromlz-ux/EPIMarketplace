import re

with open('produtos.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Substituir o link do WhatsApp por um botão de adicionar ao carrinho
pattern = re.compile(
    r'<a href="https://wa\.me/5511989088928\?text=Olá! Gostaria de fazer um orçamento do produto:\s*(.*?)"\s*target="_blank"\s*rel="noopener noreferrer"\s*class="btn btn--primary btn--sm">Solicitar Orçamento</a>',
    re.IGNORECASE | re.DOTALL
)

def repl(match):
    product_name = match.group(1).replace('"', '&quot;')
    return f'<button class="btn btn--primary btn--sm btn-add-cart" data-product="{product_name}">Adicionar ao Carrinho</button>'

html_new = pattern.sub(repl, html)

# Adicionar a div do cart e os scripts antes de </body>
cart_html = """
<!-- CARRINHO DE ORÇAMENTOS -->
<div class="cart-overlay" id="cart-overlay"></div>
<aside class="cart-sidebar" id="cart-sidebar">
  <div class="cart-header">
    <h2>Seu Orçamento</h2>
    <button class="cart-close" id="cart-close" aria-label="Fechar carrinho">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="cart-items" id="cart-items">
    <!-- Itens do carrinho aparecerão aqui -->
  </div>
  <div class="cart-footer">
    <div class="cart-form">
      <input type="text" id="cart-name" placeholder="Seu Nome (Obrigatório)" required>
      <input type="text" id="cart-company" placeholder="Sua Empresa (Opcional)">
    </div>
    <div class="cart-actions">
      <button class="btn btn--primary w-100" id="btn-checkout-wa">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        Enviar pelo WhatsApp
      </button>
      <button class="btn btn--outline w-100 mt-2" id="btn-checkout-email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Enviar por E-mail
      </button>
    </div>
  </div>
</aside>

<!-- BOTÃO FLUTUANTE DO CARRINHO -->
<button class="cart-fab" id="cart-fab" aria-label="Abrir carrinho">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
  <span class="cart-badge" id="cart-badge">0</span>
</button>

<script src="js/cart.js"></script>
</body>"""

html_new = html_new.replace('</body>', cart_html)
html_new = html_new.replace('</head>', '<link rel="stylesheet" href="css/cart.css">\n</head>')

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(html_new)
