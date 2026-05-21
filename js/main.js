(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.menu-toggle');
  var navMain = document.querySelector('.nav-main');
  var yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var previewFrame = document.querySelector('[data-hero-preview]');
  var previewImg = document.querySelector('.hero-preview-img');
  if (previewFrame && previewImg) {
    function markPreviewLoaded() {
      previewFrame.classList.add('is-loaded');
    }

    if (previewImg.complete && previewImg.naturalWidth > 0) {
      markPreviewLoaded();
    } else {
      previewImg.addEventListener('load', markPreviewLoaded);
      previewImg.addEventListener('error', function () {
        previewFrame.classList.add('is-error');
      });
    }
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuToggle && navMain) {
    menuToggle.addEventListener('click', function () {
      var open = navMain.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMain.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if ('IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
