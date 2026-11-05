(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Email link, assembled in the browser so the address never appears in the page source
  var parts = ['moc.liamg', 'keviv.ahtrak'];
  var rev = function (t) { return t.split('').reverse().join(''); };
  var address = rev(parts[1]) + String.fromCharCode(64) + rev(parts[0]);
  document.querySelectorAll('[data-email]').forEach(function (link) {
    link.setAttribute('href', 'mai' + 'lto:' + address);
    if (link.hasAttribute('data-email-show')) link.textContent = address;
  });

  // Project screenshot switcher
  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var main = gallery.querySelector('.gallery-main');
    var buttons = gallery.querySelectorAll('.gallery-tabs button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        main.src = btn.dataset.src;
        main.alt = btn.dataset.alt;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      });
    });
  });

  // Highlight the section in view in the side navigation
  var links = document.querySelectorAll('.side-nav a');
  if ('IntersectionObserver' in window && links.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
  }
})();
