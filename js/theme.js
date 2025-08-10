// js/theme.js
(function () {
  const root = document.documentElement; // <html>
  const btn  = document.querySelector('[data-theme-toggle]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);     // nuestro tema
    root.setAttribute('data-bs-theme', theme);  // para que Bootstrap acompañe
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.textContent = theme === 'dark' ? '☀️' : '🌙'; // icono: sol/luna
      btn.title = theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
    }
  }

  // 1) Restaurar preferencia guardada o preferencia del SO
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  // 2) Toggle al click
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(current);
    localStorage.setItem('theme', current);
  });
})();