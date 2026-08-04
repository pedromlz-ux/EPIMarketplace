document.addEventListener('DOMContentLoaded', () => {
  // State
  let cartItems = JSON.parse(localStorage.getItem('epi_cart')) || [];
  
  // Elements
  const cartFab = document.getElementById('cart-fab');
  const cartBadge = document.getElementById('cart-badge');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsContainer = document.getElementById('cart-items');
  const btnCheckoutWA = document.getElementById('btn-checkout-wa');
  const btnCheckoutEmail = document.getElementById('btn-checkout-email');
  const inputName = document.getElementById('cart-name');
  const inputCompany = document.getElementById('cart-company');

  // Add a toast container to the body
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);

  // Initialize
  updateCartUI();

  // ----------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------
  
  // Open / Close Cart
  if (cartFab) cartFab.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Add to Cart buttons
  const addButtons = document.querySelectorAll('.btn-add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product');
      addToCart(productName);
      showToast(`Adicionado: ${productName}`);
    });
  });

  // Checkout Actions
  if (btnCheckoutWA) btnCheckoutWA.addEventListener('click', () => checkout('whatsapp'));
  if (btnCheckoutEmail) btnCheckoutEmail.addEventListener('click', () => checkout('email'));

  // ----------------------------------------------------
  // FUNCTIONS
  // ----------------------------------------------------

  function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function addToCart(productName) {
    cartItems.push(productName);
    saveCart();
    updateCartUI();
    
    // Animate badge
    cartBadge.classList.add('bump');
    setTimeout(() => {
      cartBadge.classList.remove('bump');
    }, 300);
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('epi_cart', JSON.stringify(cartItems));
  }

  function updateCartUI() {
    if (cartBadge) {
      cartBadge.textContent = cartItems.length;
      cartBadge.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }

    if (!cartItemsContainer) return;

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Seu carrinho de orçamentos está vazio.</p>
        </div>
      `;
      btnCheckoutWA.disabled = true;
      btnCheckoutEmail.disabled = true;
      return;
    }

    btnCheckoutWA.disabled = false;
    btnCheckoutEmail.disabled = false;

    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-name">${item}</div>
        <button class="cart-item-remove" data-index="${index}" aria-label="Remover item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      `;
      cartItemsContainer.appendChild(div);
    });

    // Add remove listeners
    const removeBtns = cartItemsContainer.querySelectorAll('.cart-item-remove');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        removeFromCart(idx);
      });
    });
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4cd964" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      ${message}
    `;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  function generateMessageText() {
    const name = inputName.value.trim() || 'Cliente';
    const company = inputCompany.value.trim() ? ` (${inputCompany.value.trim()})` : '';
    
    let text = `Olá! Sou ${name}${company} e gostaria de solicitar um orçamento para os seguintes produtos:\n\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item}\n`;
    });
    
    return text;
  }

  function checkout(method) {
    if (cartItems.length === 0) return;
    
    if (inputName && inputName.value.trim() === '') {
      alert("Por favor, preencha o seu nome para continuarmos.");
      inputName.focus();
      return;
    }

    const message = generateMessageText();

    if (method === 'whatsapp') {
      const whatsappNumber = '5511941493029';
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    } else if (method === 'email') {
      const email = 'vendas@epimarketplace.com.br';
      const subject = `Solicitação de Orçamento - EPI Marketplace`;
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;
    }
  }
});
