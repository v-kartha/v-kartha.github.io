(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Project screenshot switcher
  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var main = gallery.querySelector('.gallery-main');
    var buttons = gallery.querySelectorAll('.gallery-thumbs button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        main.src = btn.dataset.src;
        main.alt = btn.dataset.alt;
        buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      });
    });
  });

  // Highlight the nav link for the section in view
  var links = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && links.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
  }
})();
