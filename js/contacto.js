const URL = 'https://script.google.com/macros/s/AKfycbyYA9khG_piUliAgsS8bjhXKPvZVn1VyhP-7HliVLl95wYQPjYX4gb9V5oTvMZt0LHh/exec';
document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('contactForm');
  const btn    = document.getElementById('sendBtn');
  const txt    = btn?.querySelector('.btn-text');
  const spin   = btn?.querySelector('.spinner-border');
  const msgBox = document.getElementById('formMsg');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return form.classList.add('was-validated');

    // lock UI
    btn?.setAttribute('disabled','true');
    spin?.classList.remove('d-none');
    txt && (txt.textContent = 'Enviando…');
    msgBox.textContent = '';

    const data = {
      nombre:   document.getElementById('nombre').value.trim(),
      apellido: document.getElementById('apellido').value.trim(),
      email:    document.getElementById('email').value.trim(),
      tipo:     document.getElementById('tipo').value,
      mensaje:  document.getElementById('mensaje').value.trim(),
      source:   'contacto.html' // útil para identificar origen en la hoja
    };

    try {
      await fetch(URL, {
        method: 'POST',
        mode: 'no-cors',                // con sitios estáticos, mantenelo
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      form.reset();
      form.classList.remove('was-validated');
      msgBox.className = 'mt-3 text-success';
      msgBox.textContent = '¡Enviado! Gracias por tu mensaje.';

    } catch (err) {
      console.error(err);
      msgBox.className = 'mt-3 text-danger';
      msgBox.textContent = 'Hubo un problema al enviar. Probá de nuevo.';
    } finally {
      // unlock UI
      btn?.removeAttribute('disabled');
      spin?.classList.add('d-none');
      txt && (txt.textContent = 'Enviar');
    }
  });
});

const isBot = document.getElementById('company').value.trim() !== '';
if (isBot) return; // no enviar
