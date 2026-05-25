(function () {
  "use strict";

  // Centralized download links: product -> platform
  var DOWNLOAD_LINKS = {
    tradework: {
      windows:
        "https://github.com/simo-an/app-storage/releases/download/v0.2.0/TradeWork.Setup.0.2.0.exe",
      macos:
        "https://github.com/simo-an/app-storage/releases/download/v0.2.0/TradeWork-0.2.0-arm64.dmg",
    },
    tradecowork: {
      windows:
        "https://github.com/simo-an/app-storage/releases/download/v1.0.0-beta.3/TradeCoWork.Setup.1.0.0-beta.3.exe",
      macos:
        "https://github.com/simo-an/app-storage/releases/download/v1.0.0-beta.3/TradeCoWork-1.0.0-beta.3-arm64.dmg",
    },
  };

  function detectOS() {
    var ua = navigator.userAgent.toLowerCase();
    return /macintosh|mac os x|macos/.test(ua) ? "macos" : "windows";
  }

  var currentOS = detectOS();

  // 1) Product cards (#card-*): each .download-link auto-points to current OS
  document
    .querySelectorAll(".download-link[data-product]")
    .forEach(function (link) {
      var product = link.getAttribute("data-product");
      var product_links = DOWNLOAD_LINKS[product];
      if (product_links && product_links[currentOS]) {
        link.href = product_links[currentOS];
      }
    });

  // 2) Download section: render both platforms per product, mark current OS as recommended
  document
    .querySelectorAll(".download-platforms[data-product]")
    .forEach(function (group) {
      var product = group.getAttribute("data-product");
      var product_links = DOWNLOAD_LINKS[product];
      if (!product_links) return;

      group
        .querySelectorAll(".download-platform[data-platform]")
        .forEach(function (item) {
          var platform = item.getAttribute("data-platform");
          if (product_links[platform]) {
            item.href = product_links[platform];
          }
          // Reflect detected OS as recommended (markup defaults to windows)
          item.classList.toggle("is-recommended", platform === currentOS);
        });
    });

  // Expose globally for easy maintenance
  window.TRADE_INWORK_DOWNLOAD_LINKS = DOWNLOAD_LINKS;

  // ---------- Header / nav ----------
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navMain = document.querySelector(".nav-main");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ---------- Hero preview image ----------
  var previewFrame = document.querySelector("[data-hero-preview]");
  var previewImg = document.querySelector(".hero-preview-img");
  if (previewFrame && previewImg) {
    function markPreviewLoaded() {
      previewFrame.classList.add("is-loaded");
    }

    if (previewImg.complete && previewImg.naturalWidth > 0) {
      markPreviewLoaded();
    } else {
      previewImg.addEventListener("load", markPreviewLoaded);
      previewImg.addEventListener("error", function () {
        previewFrame.classList.add("is-error");
      });
    }
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuToggle && navMain) {
    menuToggle.addEventListener("click", function () {
      var open = navMain.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navMain.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMain.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Reveal on scroll ----------
  if ("IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
