/* =========================================================
   MULTIVERSOM — main.js
   Interações, animações, modal de vídeo, filtro de portfólio
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR: scroll effect & active link ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Fechar ao clicar em link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Marcar link ativo pelo pathname
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  // ── PARTICLES (canvas hero) ──
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 120 }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.twinkle += p.twinkleSpeed;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${a})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animFrame = requestAnimationFrame(draw);
    };

    init();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { cancelAnimationFrame(animFrame); init(); draw(); }, 200);
    }, { passive: true });
  }

  // ── AUDIO WAVES (hero decoration) ──
  const waveContainer = document.querySelector('.hero-wave');
  if (waveContainer) {
    const barCount = 42;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('span');
      const maxH = Math.floor(Math.random() * 48 + 8);
      const dur = (Math.random() * 0.8 + 0.6).toFixed(2);
      const delay = (Math.random() * 0.8).toFixed(2);
      bar.style.setProperty('--max-h', `${maxH}px`);
      bar.style.setProperty('--dur', `${dur}s`);
      bar.style.setProperty('--delay', `${delay}s`);
      waveContainer.appendChild(bar);
    }
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  // ── VIDEO MODAL ──
  const modal = document.getElementById('video-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-cat');
  const modalYtLink = document.getElementById('modal-yt-link');

  const openModal = (videoId, title, category, ytUrl) => {
    if (!modal || !modalIframe) return;
    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCat) modalCat.textContent = category;
    if (modalYtLink) modalYtLink.href = ytUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    if (modalIframe) modalIframe.src = '';
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Delegação de eventos para cards de vídeo
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-video-id]');
    if (card) {
      openModal(
        card.dataset.videoId,
        card.dataset.videoTitle || '',
        card.dataset.videoCategory || '',
        card.dataset.videoUrl || `https://youtu.be/${card.dataset.videoId}`
      );
    }
  });

  // ── PORTFOLIO FILTER ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoCards = document.querySelectorAll('.video-card[data-filter]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      videoCards.forEach(card => {
        const match = filter === 'all' || card.dataset.filter === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = match ? '1' : '0.2';
        card.style.transform = match ? 'scale(1)' : 'scale(0.97)';
        card.style.pointerEvents = match ? '' : 'none';
      });
    });
  });

  // ── LAZY LOAD: YouTube thumbnails ──
  const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        thumbObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => thumbObserver.observe(img));

  // ── CONTACT FORM ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const successDiv = document.getElementById('form-success');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      const data = new FormData(contactForm);
      const body = Object.fromEntries(data.entries());

      try {
        // Formspree endpoint — substituir pelo ID real ao configurar
        const resp = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(body)
        });

        if (resp.ok) {
          contactForm.style.display = 'none';
          if (successDiv) successDiv.style.display = 'block';
        } else {
          throw new Error('Falha no envio');
        }
      } catch {
        btn.disabled = false;
        btn.textContent = 'Enviar para o Sérgio';
        alert('Ocorreu um erro. Por favor, entre em contato pelo WhatsApp.');
      }
    });
  }

  // ── SMOOTH ANCHOR SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
