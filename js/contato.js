/* ============================================================
   CONTATO — Form validation & submission
============================================================ */
(function () {
  'use strict';

  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (!form) return;

  /* Validation helpers */
  function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.classList.add('error');
    error.textContent = msg;
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorId);
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  function validateForm() {
    let valid = true;

    const name  = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const msg   = document.getElementById('contact-message');

    const nameErr  = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const msgErr   = document.getElementById('msg-error');

    clearError(name, nameErr);
    clearError(email, emailErr);
    clearError(msg, msgErr);

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError('contact-name', 'name-error', 'Informe seu nome completo.');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      setError('contact-email', 'email-error', 'Informe um e-mail válido.');
      valid = false;
    }

    if (!msg.value.trim() || msg.value.trim().length < 10) {
      setError('contact-message', 'msg-error', 'Mensagem muito curta. Descreva o que você precisa.');
      valid = false;
    }

    return valid;
  }

  /* Live validation on blur */
  ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', validateForm);
    el.addEventListener('input', () => {
      const errId = id.replace('contact-', '') + '-error';
      const errEl = document.getElementById(errId);
      if (errEl) {
        el.classList.remove('error');
        errEl.textContent = '';
        el.removeAttribute('aria-invalid');
      }
    });
  });

  /* Form submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Enviando…
    `;

    const data = new FormData(form);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: data.get('nome'),
          company: data.get('empresa') || null,
          email: data.get('_replyto'),
          phone: data.get('telefone') || null,
          subject: data.get('assunto'),
          message: data.get('mensagem')
        })
      });

      if (response.ok) {
        form.reset();
        successMsg.hidden = false;
        errorMsg.hidden = true;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      errorMsg.hidden = false;
      successMsg.hidden = true;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Enviar mensagem
      `;
    }
  });
})();
