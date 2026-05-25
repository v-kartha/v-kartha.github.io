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

  // ── Commitly screenshot carousel ─────────────────────
  const carousel = document.getElementById('commitlyScreenshots');
  if (carousel) {
    const shots = carousel.querySelectorAll('.project-screenshot');
    const dots  = carousel.querySelectorAll('.screenshot-dot');
    let current = 0;
    let timer;

    function showSlide(index) {
      shots[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      shots[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function startTimer() {
      timer = setInterval(() => showSlide((current + 1) % shots.length), 3500);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        showSlide(i);
        startTimer();
      });
    });

    startTimer();
  }

  // ── ECI dashboard screenshot carousel ────────────────
  const eciCarousel = document.getElementById('eciScreenshots');
  if (eciCarousel) {
    const eciShots = eciCarousel.querySelectorAll('.project-screenshot');
    const eciDots  = eciCarousel.querySelectorAll('.screenshot-dot');
    let eciCurrent = 0;
    let eciTimer;

    function showEciSlide(index) {
      eciShots[eciCurrent].classList.remove('active');
      eciDots[eciCurrent].classList.remove('active');
      eciCurrent = index;
      eciShots[eciCurrent].classList.add('active');
      eciDots[eciCurrent].classList.add('active');
    }

    function startEciTimer() {
      eciTimer = setInterval(() => showEciSlide((eciCurrent + 1) % eciShots.length), 3500);
    }

    eciDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(eciTimer);
        showEciSlide(i);
        startEciTimer();
      });
    });

    startEciTimer();
  }

  // ── Mobile hamburger ─────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      });
    });
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
