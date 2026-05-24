/* =========================================================
   VIVEK KARTHA — Site interactions v2
   Dark mode + scroll reveals + nav active state
   ========================================================= */

(function () {
  'use strict';

  // ── Year ──────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Dark mode ─────────────────────────────────────────
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  // Load saved preference
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);

  function setTheme(theme) {
    html.classList.add('theme-transitioning');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setTimeout(() => html.classList.remove('theme-transitioning'), 350);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Nav scroll background ─────────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 16) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Nav active section highlight ──────────────────────
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ── Scroll reveal ─────────────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.section-head, .about-visual, .about-body, .project, .role, .stack-card, .stat'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // ── Smooth scroll with nav offset ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
