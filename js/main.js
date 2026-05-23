(function () {
  "use strict";

  // Centralized download links configuration
  var DOWNLOAD_LINKS = {
    windows:
      "https://github.com/simo-an/app-storage/releases/download/v0.2.0/TradeWork.Setup.0.2.0.exe",
    macos:
      "https://github.com/simo-an/app-storage/releases/download/v0.2.0/TradeWork-0.2.0-arm64.dmg",
  };

  // Detect OS and update download links and show appropriate download card
  function detectAndShowDownload() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isMacOS = /macintosh|mac os x|macos/.test(userAgent);

    var windowsCard = document.getElementById("download-windows");
    var macosCard = document.getElementById("download-macos");
    var downloadDesc = document.getElementById("download-desc");

    // Update download cards visibility
    if (windowsCard && macosCard && downloadDesc) {
      if (isMacOS) {
        windowsCard.style.display = "none";
        macosCard.style.display = "block";
        downloadDesc.textContent =
          "获取最新 macOS 安装包（Apple Silicon），在本机完成安装后即可使用。";
      } else {
        windowsCard.style.display = "block";
        macosCard.style.display = "none";
        downloadDesc.textContent =
          "获取最新 Windows 安装包，在本机完成安装后即可使用。";
      }
    }

    // Update all download links based on OS
    var downloadLinks = document.querySelectorAll(".download-link");
    downloadLinks.forEach(function (link) {
      var opposite = link.getAttribute("data-download-opposite");

      if (opposite) {
        // "Switch platform" links use opposite platform
        link.href = DOWNLOAD_LINKS[opposite];
      } else {
        // Normal links use current platform
        link.href = isMacOS ? DOWNLOAD_LINKS.macos : DOWNLOAD_LINKS.windows;
      }
    });
  }

  detectAndShowDownload();

  // Expose DOWNLOAD_LINKS globally for easy maintenance
  window.TRADE_WORK_DOWNLOAD_LINKS = DOWNLOAD_LINKS;

  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navMain = document.querySelector(".nav-main");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

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
