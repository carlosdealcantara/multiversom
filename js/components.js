/* =========================================================
   MULTIVERSOM — components.js
   Navbar e Footer injetados em todas as páginas
   ========================================================= */

(function () {
  const rawPath = window.location.pathname.split('/').pop() || 'index';
  const CURRENT = rawPath.replace('.html', '') || 'index';

  const NAV_LINKS = [
    { href: './',           label: 'Início',           page: 'index' },
    { href: 'processo',     label: 'O Processo',       page: 'processo' },
    { href: 'portfolio',    label: 'Portfólio',        page: 'portfolio' },
    { href: 'compositor',   label: 'Sérgio Melo',      page: 'compositor' },
  ];

  // ── NAVBAR ──
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) {
    navbarEl.innerHTML = `
      <a href="./" class="nav-logo" aria-label="Multiversom - Início">
        <img src="assets/logo/logomvm.png" alt="Logo Multiversom" width="44" height="44">
        <span class="nav-logo-text">MultiverSOM</span>
      </a>
      <ul class="nav-menu" id="nav-menu" role="navigation" aria-label="Menu principal">
        ${NAV_LINKS.map(l => `
          <li>
            <a href="${l.href}"
               class="nav-link${CURRENT === l.page ? ' active' : ''}"
               data-page="${l.page}">${l.label}</a>
          </li>
        `).join('')}
        <li>
          <a href="contato" class="nav-link nav-cta" data-page="contato"
             id="nav-cta-btn">✨ Faça sua Música</a>
        </li>
      </ul>
      <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    `;
  }

  // ── FOOTER ──
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="assets/logo/logomvm.png" alt="Logo Multiversom" width="40" height="40">
              <span class="footer-logo-text">MultiverSOM</span>
            </div>
            <p class="footer-tagline">
              Músicas autorais que tocam a alma.<br>
              Letra, melodia e alma, criadas por Sérgio Melo,<br>
              com o mais alto padrão de produção musical.
            </p>
          </div>

          <div class="footer-links">
            <h4>Páginas</h4>
            <ul>
              ${NAV_LINKS.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
              <li><a href="contato">Faça sua Música</a></li>
            </ul>
          </div>

          <div class="footer-links footer-social">
            <h4>Redes</h4>
            <a href="https://www.youtube.com/@MULTIVERSOMAUTORAL" target="_blank" rel="noopener"
               aria-label="YouTube do Multiversom">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
              </svg>
              YouTube @MULTIVERSOMAUTORAL
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copy">© ${new Date().getFullYear()} MultiverSOM · Sérgio Melo. Todos os direitos reservados.</p>
          <p class="footer-credit">Desenvolvido por <a href="#">Multiversom</a></p>
        </div>
      </div>
    `;
  }

  // ── WHATSAPP FLOAT ──
  const waFloat = document.getElementById('whatsapp-float');
  if (waFloat) {
    waFloat.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97s-.48-.15-.67.15-.77.97-.95 1.17-.35.22-.65.07a8.16 8.16 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.6s.3-.36.44-.54a2 2 0 0 0 .3-.5.55.55 0 0 0-.02-.52c-.07-.15-.67-1.62-.92-2.22s-.49-.5-.67-.51h-.57a1.1 1.1 0 0 0-.8.37 3.36 3.36 0 0 0-1.05 2.5 5.83 5.83 0 0 0 1.22 3.1c.14.2 2 3.05 4.83 4.28a16.27 16.27 0 0 0 1.6.6 3.87 3.87 0 0 0 1.77.1 3.09 3.09 0 0 0 2.03-1.43 2.5 2.5 0 0 0 .17-1.43c-.07-.13-.27-.2-.57-.35zM12 2A10 10 0 0 0 3.48 17.4L2 22l4.75-1.24A10 10 0 1 0 12 2zm0 18.18a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3-.2-.31A8.19 8.19 0 1 1 12 20.18z"/>
      </svg>
    `;
    waFloat.href = 'https://wa.me/5561999943622';
    waFloat.title = 'Fale com o Sérgio no WhatsApp';
    waFloat.setAttribute('aria-label', 'Contato via WhatsApp');
  }

  // ── VIDEO MODAL TEMPLATE ──
  const modalEl = document.getElementById('video-modal');
  if (modalEl) {
    modalEl.innerHTML = `
      <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" id="modal-close" aria-label="Fechar vídeo">✕</button>
        <div class="modal-video-wrap">
          <iframe id="modal-iframe"
            src=""
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            title="Vídeo Multiversom">
          </iframe>
        </div>
        <div class="modal-info">
          <div>
            <p class="modal-title" id="modal-title"></p>
            <p class="modal-cat" id="modal-cat"></p>
          </div>
          <a href="#" id="modal-yt-link" target="_blank" rel="noopener"
             class="modal-yt-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            Ver no YouTube
          </a>
        </div>
      </div>
    `;
  }
})();
