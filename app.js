const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

function getCurrentLanguage() {
  const selector = document.getElementById("langSelector");
  return selector ? selector.value : "fr"; // valeur par défaut
}

/* =========================
   COOKIE CONSENT + GA LOAD
   ========================= */

function loadGoogleAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-HEM24T99FD";
  document.head.appendChild(gaScript);

  gaScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", "G-HEM24T99FD", { anonymize_ip: true });
  };
}

function updateCookieBannerLanguage(lang) {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;
  // Hide all accept/reject buttons and all <p>
  banner.querySelectorAll(".accept-cookies, .reject-cookies").forEach((btn) => {
    btn.style.display = "none";
  });
  banner.querySelectorAll("p[data-lang]").forEach((p) => {
    p.style.display = "none";
  });
  // Show only those matching the current language
  banner
    .querySelectorAll(
      `.accept-cookies[data-lang="${lang}"], .reject-cookies[data-lang="${lang}"]`
    )
    .forEach((btn) => {
      btn.style.display = "inline-block";
    });
  banner.querySelectorAll(`p[data-lang="${lang}"]`).forEach((p) => {
    p.style.display = "block";
  });
}

function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  // Remove any CSS transitions on opacity, we will handle it fully in JS
  banner.style.transition = "none";
  banner.style.opacity = "0";
  banner.style.visibility = "hidden";
  banner.style.pointerEvents = "none";

  // Forcer l'affichage du banner dans la langue actuelle dès l'initialisation
  updateCookieBannerLanguage(getCurrentLanguage());

  // Attach click events only once
  let handlersAttached = false;

  function fadeTo(targetOpacity, duration, callback) {
    // duration in ms
    const step = 16; // ~60fps
    let opacity = parseFloat(banner.style.opacity) || 0;
    const start = performance.now();
    const initial = opacity;
    const delta = targetOpacity - initial;
    function animate(now) {
      const elapsed = now - start;
      let progress = Math.min(elapsed / duration, 1);
      let current = initial + delta * progress;
      banner.style.opacity = current;
      if (
        (delta > 0 && current < targetOpacity) ||
        (delta < 0 && current > targetOpacity)
      ) {
        requestAnimationFrame(animate);
      } else {
        banner.style.opacity = targetOpacity;
        if (callback) callback();
      }
    }
    requestAnimationFrame(animate);
  }

  const showBanner = () => {
    const banner = document.getElementById("cookie-banner");
    if (!banner) return;

    // Préparer le banner pour le fade
    banner.style.opacity = "0";
    banner.style.visibility = "visible";
    banner.style.pointerEvents = "none";

    // Afficher uniquement les boutons et textes pour la langue active
    const lang = getCurrentLanguage();
    updateCookieBannerLanguage(lang);

    // Attendre 2 secondes avant d'afficher le banner
    setTimeout(() => {
      // Fade-in sur 400ms
      fadeTo(1, 400, () => {
        banner.style.pointerEvents = "auto";
      });

      // Attacher les événements aux boutons après le fade
      if (!handlersAttached) {
        const acceptButtons = banner.querySelectorAll(".accept-cookies");
        const rejectButtons = banner.querySelectorAll(".reject-cookies");

        acceptButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            localStorage.setItem("cookiesConsent", "accepted");
            hideBanner(true);
            loadGoogleAnalytics();
          });
        });

        rejectButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            localStorage.setItem("cookiesConsent", "rejected");
            hideBanner(true);
          });
        });

        handlersAttached = true;
      }
    }, 2000); // délai de 2 secondes
  };

  function hideBanner(animate) {
    banner.style.pointerEvents = "none";
    if (animate) {
      fadeTo(0, 400, () => {
        banner.style.visibility = "hidden";
      });
    } else {
      banner.style.opacity = "0";
      banner.style.visibility = "hidden";
    }
  }

  // Vérifie le consentement
  const consent = localStorage.getItem("cookiesConsent");
  if (consent === "accepted") {
    hideBanner(false);
    loadGoogleAnalytics();
  } else if (consent === "rejected") {
    hideBanner(false);
  } else {
    // Aucun consentement → afficher
    showBanner();
  }
}

// Appel après DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCookieBanner);
} else {
  initCookieBanner();
}

// Nouvelle gestion des boutons "Modifier mon consentement"
function attachCookieResetButtons() {
  const resetBtnFr = document.getElementById("reset-cookie-consent");
  const resetBtnEn = document.getElementById("reset-cookie-consent-en");

  function resetConsent() {
    localStorage.removeItem("cookiesConsent");

    const banner = document.getElementById("cookie-banner");
    if (!banner) return;

    banner.style.opacity = "0";
    banner.style.visibility = "visible";
    banner.style.pointerEvents = "none";

    const lang = getCurrentLanguage();
    updateCookieBannerLanguage(lang);

    // Fade-in sur 400ms après 2 secondes
    setTimeout(() => {
      let start = performance.now();
      function animate(now) {
        let elapsed = now - start;
        let progress = Math.min(elapsed / 400, 1);
        banner.style.opacity = progress;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          banner.style.pointerEvents = "auto";
        }
      }
      requestAnimationFrame(animate);
    }, 0);
  }

  if (resetBtnFr) resetBtnFr.addEventListener("click", resetConsent);
  if (resetBtnEn) resetBtnEn.addEventListener("click", resetConsent);
}

document.addEventListener("DOMContentLoaded", () => {
  attachCookieResetButtons();
});

// Return the visible/active "Show more" button for the current language in a container
function getVisibleToggleButton(descContainer, lang) {
  // Prefer a button inside a localized wrapper if it exists
  let btn = descContainer.querySelector(
    `[data-lang="${lang}"] button.inline-button`
  );
  if (btn) return btn;

  // Otherwise, pick the visible button
  const candidates = Array.from(
    descContainer.querySelectorAll("button.inline-button")
  );
  btn = candidates.find((b) => {
    const cs = window.getComputedStyle(b);
    return (
      cs.display !== "none" &&
      cs.visibility !== "hidden" &&
      b.offsetParent !== null
    );
  });
  return btn || candidates[0] || null;
}

function changeLanguage(languageCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(function (elem) {
    // ❗ Ne jamais toucher au cookie banner
    if (elem.closest("#cookie-banner")) return;

    const tag = elem.tagName.toLowerCase();
    if (elem.getAttribute("data-lang") === languageCode) {
      elem.style.display = tag === "span" ? "inline" : "block";
    } else {
      elem.style.display = "none";
    }
  });

  // Update toggleText buttons (per container, pick the visible/active button for current lang)
  document.querySelectorAll(".description-container").forEach((container) => {
    const lang = languageCode;
    const moreText = container.querySelector(
      `.description[data-lang="${lang}"] .more-text`
    );
    const button = getVisibleToggleButton(container, lang);
    if (!button) return;

    if (moreText && moreText.classList.contains("hidden")) {
      button.textContent = lang === "en" ? "Show more" : "En voir plus";
    } else {
      button.textContent = lang === "en" ? "Show less" : "En voir moins";
    }
  });

  // Update scroll indicator labels
  const indicatorLabels = document.querySelectorAll(".indicator-label");
  indicatorLabels.forEach((label) => {
    if (label.getAttribute("data-lang") === languageCode) {
      label.style.display = "block";
    } else {
      label.style.display = "none";
    }
  });

  // Scroll to 1px first, then 0px after a short delay to ensure proper page refresh
  window.scrollTo(0, 1);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 5); // 5ms delay

  // Gérer les options du filtre des publications
  rebuildPostFilter(languageCode);
}

function rebuildPostFilter(languageCode) {
  const postFilter = document.getElementById("postFilter");
  if (!postFilter) return;

  // Cache all localized options once
  if (!window.__postFilterStore) {
    const store = {};
    Array.from(postFilter.querySelectorAll("option[data-lang]")).forEach(
      (opt) => {
        const lang = opt.getAttribute("data-lang");
        if (!store[lang]) store[lang] = [];
        store[lang].push({ value: opt.value, text: opt.textContent });
      }
    );
    window.__postFilterStore = store;
  }

  const data = window.__postFilterStore[languageCode] || [];
  const previousValue = postFilter.value;

  // Rebuild the select with only the options for the active language
  postFilter.innerHTML = "";
  data.forEach(({ value, text }) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = text;
    postFilter.appendChild(o);
  });

  // Restore previous value if still available, otherwise select the first option
  if (data.some((d) => d.value === previousValue)) {
    postFilter.value = previousValue;
  } else if (data[0]) {
    postFilter.value = data[0].value;
  }

  // Apply filtering immediately
  filterPosts();
}

// Filter posts based on selected category
function filterPosts() {
  const postFilter = document.getElementById("postFilter");
  if (!postFilter) return;

  const selectedCategory = postFilter.value;
  const sections = document.querySelectorAll("section.accueil_section1");

  sections.forEach((section) => {
    // Toujours cacher les sections avec la classe 'hidden'
    if (section.classList.contains("hidden")) {
      section.style.display = "none";
      return;
    }

    const categoriesAttr = section.getAttribute("data-category") || "";
    const categories = categoriesAttr
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (categories.includes(selectedCategory)) {
      section.style.display = "block";
      // Charger les images seulement si un more-text est déjà ouvert
      section
        .querySelectorAll(".more-text:not(.hidden)")
        .forEach((moreText) => {
          loadMoreTextImages(moreText);
        });
      // Animation verticale des éléments .content-defilement
      section.querySelectorAll(".content-defilement").forEach((content) => {
        content.style.transition = "none";
        content.style.transform = "translateY(100px) scale(1)";
        content.style.opacity = "0";

        // Forcer reflow
        void content.offsetWidth;

        // Animation vers la position normale
        content.style.transition =
          "transform 0.5s ease-out, opacity 0.5s ease-out";
        content.style.transform = "translateY(0)";
        content.style.opacity = "1";
      });
    } else {
      section.style.display = "none";
    }
  });

  // Mettre à jour l'indicator-label avec la première section visible
  const visibleSections = Array.from(sections).filter(
    (s) => s.style.display !== "none"
  );
  if (visibleSections.length > 0) {
    const lang = getCurrentLanguage();
    const indicatorLabel = document.querySelector(".indicator-label");
    if (indicatorLabel) {
      const firstSection = visibleSections[0];
      const labelText =
        lang === "en"
          ? firstSection.getAttribute("data-label-en")
          : firstSection.getAttribute("data-label-fr");
      indicatorLabel.textContent = labelText;
    }
  }

  // Mettre à jour la flèche scrollNextSection
  updateScrollNextArrow();
  handleParallaxScroll();
}

// Attach change event
const postFilter = document.getElementById("postFilter");
if (postFilter) {
  postFilter.addEventListener("change", () => {
    filterPosts();
  });
}

// --- Gestion du cookie de langue ---
function getLangCookie() {
  const match = document.cookie.match(/(?:^|; )siteLanguage=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "none";
}

function setLangCookie(lang) {
  document.cookie = `siteLanguage=${encodeURIComponent(
    lang
  )}; path=/; max-age=31536000; SameSite=Lax`;
}

// Nouvelle logique d'initialisation de la langue avec cookie
let startLang = getLangCookie();

if (startLang === "none") {
  const browserLang = navigator.language || "en";
  startLang = browserLang.includes("fr") ? "fr" : "en";
  setLangCookie(startLang);
}

// Appliquer la langue sur TOUTES les pages
changeLanguage(startLang);
updateCookieBannerLanguage(startLang);

// Gestion du sélecteur de langue (si présent)
const selector = document.getElementById("langSelector");
if (selector) {
  selector.value = startLang;

  selector.addEventListener("change", function () {
    changeLanguage(this.value);
    updateCookieBannerLanguage(this.value);
    setLangCookie(this.value);
  });
}

// Sélection des sections et de l'élément d'indicateur
const sections = document.querySelectorAll("section");
const scrollIndicator = document.querySelector(".scroll-indicator");
const indicatorContainer = document.querySelector(".indicator-container");
const indicatorBall = document.querySelector(".indicator-ball");

let isDragging = false; // État pour savoir si la boule est en cours de déplacement

function updateIndicator() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  const totalScrollableHeight = documentHeight - windowHeight;
  const scrollRatio = scrollTop / totalScrollableHeight;

  const indicatorPosition = scrollRatio * scrollIndicator.offsetHeight;

  if (scrollTop === 0) {
    indicatorContainer.style.transform = `translateY(0)`;
  } else if (scrollTop + windowHeight >= documentHeight) {
    indicatorContainer.style.transform = `translateY(${scrollIndicator.offsetHeight}px)`;
  } else {
    indicatorContainer.style.transform = `translateY(${indicatorPosition}px)`;
  }

  let activeSection = null;
  let sectionProgress = 0;
  const quarterFromBottom = window.innerHeight * 0.75; // point 1/4 from the bottom
  const triggerPoint = window.scrollY + quarterFromBottom;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    let sectionHeight = rect.height;

    if (
      triggerPoint >= sectionTop &&
      triggerPoint <= sectionTop + sectionHeight
    ) {
      activeSection = section;
      // Check if .more-text is visible and adjust sectionHeight accordingly
      const moreText = activeSection.querySelector(".more-text");
      if (moreText && !moreText.classList.contains("hidden")) {
        sectionHeight = activeSection.scrollHeight;
      }
      sectionProgress = ((triggerPoint - sectionTop) / sectionHeight) * 100;
      sectionProgress = Math.min(Math.max(sectionProgress, 0), 100);
      sectionProgress = Math.round(sectionProgress / 10) * 10;
      break;
    }
  }

  function updateIndicatorLabelAfterFilter() {
    const sections = Array.from(
      document.querySelectorAll("section.scroll-parallax")
    ).filter((s) => s.style.display !== "none"); // seulement les sections visibles

    if (!sections.length) return;

    const lang = getCurrentLanguage();
    const indicatorLabel = document.querySelector(".indicator-label");
    if (!indicatorLabel) return;

    // Affiche le label de la première section visible
    const firstSection = sections[0];
    const labelText =
      lang === "en"
        ? firstSection.getAttribute("data-label-en")
        : firstSection.getAttribute("data-label-fr");

    indicatorLabel.textContent = labelText;
  }

  if (activeSection) {
    let sectionProgressDisplay = sectionProgress;

    // Cap the displayed progress between 0% and 100
    sectionProgressDisplay = Math.min(Math.max(sectionProgressDisplay, 0), 100);

    const lang = getCurrentLanguage();
    const indicatorLabel = indicatorContainer.querySelector(".indicator-label");
    if (indicatorLabel) {
      let labelText =
        lang === "en"
          ? activeSection.getAttribute("data-label-en")
          : activeSection.getAttribute("data-label-fr");

      // Append percentage only if between 20% and 80
      //if (sectionProgressDisplay >= 20 && sectionProgressDisplay <= 80) {
      //  labelText += ` - ${sectionProgressDisplay}%`;
      //}

      indicatorLabel.innerHTML = labelText;
      indicatorLabel.style.display = "block";
    }
  }

  //  const lastSection = sections[sections.length - 1];
  //  const lastSectionRect = lastSection.getBoundingClientRect();
  //  const lastSectionVisible = lastSectionRect.bottom;
  //
  //  if (lastSectionVisible < windowHeight * 0.5) {
  //    scrollIndicator.classList.add("hidden");
  //  } else {
  //    scrollIndicator.classList.remove("hidden");
  //  }
}

function updateScrollNextArrow() {
  const scrollNextBtn = document.getElementById("scrollNextSection");
  if (!scrollNextBtn) return;

  const sections = Array.from(
    document.querySelectorAll("section.scroll-parallax")
  ).filter((s) => s.style.display !== "none"); // seulement les sections visibles

  if (sections.length === 0) {
    scrollNextBtn.style.display = "none";
    return;
  }

  const lang = getCurrentLanguage();
  const lastSection = sections[sections.length - 1];
  const lastLabel =
    lang === "en"
      ? lastSection.getAttribute("data-label-en")
      : lastSection.getAttribute("data-label-fr");

  const indicatorLabel = document.querySelector(".indicator-label");
  if (!indicatorLabel) return;

  const currentLabel = indicatorLabel.textContent.trim();

  // Transition pour l'opacité
  scrollNextBtn.style.transition = "opacity 0.2s ease";

  if (currentLabel === lastLabel) {
    scrollNextBtn.style.opacity = "0";
    setTimeout(() => {
      scrollNextBtn.style.display = "none";
    }, 200);
  } else {
    scrollNextBtn.style.display = "block";
    setTimeout(() => {
      scrollNextBtn.style.opacity = "1";
    }, 10);
  }
}

window.addEventListener("scroll", updateScrollNextArrow);
window.addEventListener("resize", updateScrollNextArrow);
document.addEventListener("DOMContentLoaded", updateScrollNextArrow);

window.addEventListener("scroll", updateIndicator);
document.addEventListener("DOMContentLoaded", updateIndicator);

indicatorContainer.addEventListener("mousedown", (event) => {
  isDragging = true;
  indicatorContainer.style.cursor = "grabbing";
  indicatorBall.classList.add("expanded");
  event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const scrollIndicatorRect = scrollIndicator.getBoundingClientRect();
    const offsetY = event.clientY - scrollIndicatorRect.top;
    const percentage = offsetY / scrollIndicatorRect.height;
    const scrollTop =
      percentage * (document.body.scrollHeight - window.innerHeight);
    window.scrollTo(0, scrollTop);
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  indicatorContainer.style.cursor = "grab";
  indicatorBall.classList.remove("expanded");
});

document.addEventListener("DOMContentLoaded", updateIndicator);

// Lazy-load des images contenues dans .more-text
function loadMoreTextImages(moreText) {
  if (!moreText) return;

  moreText.querySelectorAll("img[data-src]").forEach((img) => {
    if (!img.src || img.src === "") {
      img.onload = () => {
        img.classList.add("loaded");
      };

      img.src = img.dataset.src;
    }
  });
}

function toggleText(button) {
  const container = button.closest(".description-container");
  const lang = getCurrentLanguage();
  const descriptionEl = container.querySelector(
    `.description[data-lang="${lang}"]`
  );
  // Updated logic: find the .more-text inside the description element, which may contain multiple elements
  const moreText = descriptionEl
    ? descriptionEl.querySelector(".more-text")
    : null;
  const wasHidden = moreText && moreText.classList.contains("hidden");

  if (wasHidden) {
    // ✅ Charger les images UNIQUEMENT à l'ouverture
    loadMoreTextImages(moreText);

    // Afficher le texte
    moreText.classList.remove("hidden");
    const imagesRows = moreText.querySelectorAll(".images-row");
    imagesRows.forEach((row) => {
      row.style.display = "";
    });
    button.textContent = lang === "en" ? "Show less" : "En voir moins";

    const textTop = moreText.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: textTop - 300, behavior: "smooth" });
  } else {
    // Si on affiche moins → garder la même distance visuelle
    const buttonOffsetBefore = button.getBoundingClientRect().top;

    moreText.classList.add("hidden");
    const imagesRows = moreText.querySelectorAll(".images-row");
    imagesRows.forEach((row) => {
      row.style.display = "none";
    });
    button.textContent = lang === "en" ? "Show more" : "En voir plus";

    const buttonOffsetAfter = button.getBoundingClientRect().top;
    const scrollDiff = buttonOffsetAfter - buttonOffsetBefore;
    window.scrollBy({ top: scrollDiff, behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getCurrentLanguage();

  document.querySelectorAll(".description-container").forEach((container) => {
    const descriptionEl = container.querySelector(
      `.description[data-lang="${lang}"]`
    );
    const moreText = descriptionEl
      ? descriptionEl.querySelector(".more-text")
      : null;
    const button = getVisibleToggleButton(container, lang);
    if (!button) return;

    if (moreText && moreText.classList.contains("hidden")) {
      button.textContent = lang === "en" ? "Show more" : "En voir plus";
    } else {
      button.textContent = lang === "en" ? "Show less" : "En voir moins";
    }
  });
});

let hasUserScrolled = false;

function handleParallaxScroll() {
  const elements = document.querySelectorAll(
    ".scroll-parallax, .filter-container.scroll-parallax"
  );

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startTrigger = windowHeight * 1;

    if (rect.top < startTrigger && rect.bottom > 0) {
      // Always apply transform regardless of hasUserScrolled
      const distanceFromBottom = windowHeight - rect.top;
      const visibleRatio = Math.min(1, distanceFromBottom / windowHeight);

      const translateY = (1 - visibleRatio) * 40;
      const scale = 0.95 + visibleRatio * 0.05;

      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }
  });
}

function activateParallaxOnFirstScroll() {
  hasUserScrolled = true;
  handleParallaxScroll();
  window.removeEventListener("scroll", activateParallaxOnFirstScroll);
}

window.addEventListener("scroll", activateParallaxOnFirstScroll, {
  once: true,
});
window.addEventListener("scroll", handleParallaxScroll);
window.addEventListener("resize", handleParallaxScroll);
document.addEventListener("DOMContentLoaded", handleParallaxScroll);

function updateTxtBtnText() {
  const lang = getCurrentLanguage();
  const el = document.querySelector(`.txt_btn_cv[data-lang="${lang}"]`);
  if (!el) return;

  if (window.innerWidth < 500) {
    // For English show "Resume", for French show "CV"
    el.textContent = lang === "en" ? "Curr. Vitae" : "Curr. Vitae";
  } else {
    // Full text for both languages
    el.textContent = lang === "en" ? "Curriculum Vitae" : "Curriculum Vitae";
  }
}

// Call initially
updateTxtBtnText();
// Update on resize
window.addEventListener("resize", updateTxtBtnText);

// Scroll arrow to next section
const scrollNextBtn = document.getElementById("scrollNextSection");
if (scrollNextBtn) {
  scrollNextBtn.addEventListener("click", () => {
    const sections = document.querySelectorAll("section.scroll-parallax");
    const viewportHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const triggerPoint = currentScroll + viewportHeight * 0.25; // 1/4 from bottom

    // Filter sections strictly below the triggerPoint
    const nextSection = Array.from(sections)
      .filter((section) => section.offsetTop > triggerPoint)
      .shift(); // pick the first one

    if (nextSection) {
      const targetScroll = nextSection.offsetTop - 150;
      window.scrollTo({
        top: targetScroll + 400,
        behavior: "smooth",
      });
    }
  });
}

// Lightbox functionality with navigation arrows
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCloseBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !lightboxImg || !lightboxCloseBtn) return;

  let currentIndex = 0;
  let currentGroup = [];

  // Function to disable scroll
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  // Function to enable scroll
  function enableScroll() {
    document.body.style.overflow = "";
  }

  function showImage(index) {
    if (!currentGroup || currentGroup.length === 0) return;

    // Circular navigation
    if (index < 0) {
      currentIndex = currentGroup.length - 1;
    } else if (index >= currentGroup.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const imgSrc = currentGroup[currentIndex].src;
    if (imgSrc) {
      lightboxImg.src = imgSrc;

      // Scale animation
      lightboxImg.style.transition = "none";
      lightboxImg.style.transform = "scale(0.95)";
      void lightboxImg.offsetWidth; // force reflow
      lightboxImg.style.transition = "transform 0.4s ease";
      lightboxImg.style.transform = "scale(1)";
    }
  }

  // Open lightbox on image click
  document.querySelectorAll(".imagesouspost").forEach((img) => {
    img.addEventListener("click", () => {
      currentGroup = Array.from(
        img
          .closest(".description-container")
          ?.querySelectorAll(".imagesouspost") || []
      ).filter((i) => !!i.src); // Remove undefined or empty src
      currentIndex = currentGroup.indexOf(img);

      if (!currentGroup.length) return;

      lightboxImg.src = currentGroup[currentIndex].src;

      lightbox.style.display = "flex";
      lightbox.tabIndex = -1;
      lightbox.focus();
      disableScroll();
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) scrollIndicator.style.opacity = "0";

      // Scale animation
      lightboxImg.style.transition = "none";
      lightboxImg.style.transform = "scale(0.95)";
      void lightboxImg.offsetWidth; // force reflow
      lightboxImg.style.transition = "transform 0.4s ease";
      lightboxImg.style.transform = "scale(1)";
    });
  });

  // Navigation arrows
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  // Close on click of the close button
  lightboxCloseBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    enableScroll();
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) scrollIndicator.style.opacity = "1";
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      enableScroll();
      const scrollIndicator = document.querySelector(".scroll-indicator");
      if (scrollIndicator) scrollIndicator.style.opacity = "1";
    }
  });
});

function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const targetSection = document.querySelector(hash);
  if (!targetSection) return;

  const categories = targetSection.dataset.category;
  if (!categories) return;

  const mainCategory = categories.split(",")[0];

  const filterSelect = document.getElementById("postFilter");
  if (filterSelect) {
    filterSelect.value = mainCategory;
    filterSelect.dispatchEvent(new Event("change"));
  }

  setTimeout(() => {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const moreText = targetSection.querySelector(".more-text");
    const button = targetSection.querySelector(".inline-button");

    if (moreText && moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden");
      if (button) button.style.display = "none";
    }
  }, 400);
}

// Splash video on page load with fade triggered at 1.3s
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const video = document.getElementById("splash-video");

  if (!splash || !video) return;

  // Disable scrolling initially
  document.body.style.overflow = "hidden";

  // Ensure initial opacity
  splash.style.opacity = "1";
  splash.style.transition = "opacity 0.2s ease";

  const hideSplash = () => {
    // Scroll to 1px first, then back to 0 quickly
    window.scrollTo(0, 1);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 5);

    splash.style.opacity = "0";
    // Re-enable scrolling immediately
    document.body.style.overflow = "";

    // Trigger the content-defilement animation
    document.querySelectorAll(".content-defilement").forEach((el) => {
      el.classList.add("active");
    });

    setTimeout(() => {
      splash.style.display = "none";
      document.body.classList.add("loaded");

      // 🔗 Navigation par lien direct (hash) APRÈS le splash
      handleHashNavigation();
    }, 200); // match the CSS transition duration
  };

  // Use timeupdate event to check video currentTime
  const onTimeUpdate = () => {
    if (video.currentTime >= 1.2) {
      hideSplash();
      video.removeEventListener("timeupdate", onTimeUpdate);
    }
  };

  video.addEventListener("timeupdate", onTimeUpdate);

  // Also end if video naturally ends before 1.3s
  video.addEventListener("ended", hideSplash);

  // Fallback: if video doesn't start (e.g. iOS low power mode), hide splash after short delay
  setTimeout(() => {
    if (video.currentTime === 0) {
      hideSplash();
    }
  }, 1000);

  // Ensure page is scrolled to top during splash
  window.scrollTo(0, 0);
});

// Ensure parallax placement is correct on initial load
document.addEventListener("DOMContentLoaded", () => {
  handleParallaxScroll();
});

document.addEventListener("keydown", (e) => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCloseBtn = document.getElementById("lightboxClose");
  if (!lightbox || lightbox.style.display !== "flex" || !lightboxImg) return;

  const currentSrc = lightboxImg.src;
  const currentImgElement = Array.from(
    document.querySelectorAll(".imagesouspost")
  ).find((img) => img.src === currentSrc);
  if (!currentImgElement) return;

  const container =
    currentImgElement.closest(".description-container") || document.body;
  const allImgs = Array.from(container.querySelectorAll(".imagesouspost"));
  let currentIndex = allImgs.findIndex((img) => img.src === currentSrc);
  if (currentIndex === -1) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + allImgs.length) % allImgs.length;
    lightboxImg.src = allImgs[currentIndex].src;
  } else if (e.key === "Escape") {
    // Ferme la lightbox comme le bouton de fermeture
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // réactive le scroll
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) scrollIndicator.style.opacity = "1";
    return; // stop ici
  } else {
    return; // autre touche ignorée
  }

  // scale animation
  lightboxImg.style.transition = "none";
  lightboxImg.style.transform = "scale(0.95)";
  void lightboxImg.offsetWidth; // force reflow
  lightboxImg.style.transition = "transform 0.4s ease";
  lightboxImg.style.transform = "scale(1)";
});

// Hide all .more-text elements (and reset buttons) if user scrolls near top of page
window.addEventListener("scroll", function () {
  if (window.scrollY < window.innerHeight * 0.3) {
    document.querySelectorAll(".more-text:not(.hidden)").forEach((moreText) => {
      moreText.classList.add("hidden");
      moreText.querySelectorAll(".images-row").forEach((row) => {
        row.style.display = "none";
      });

      const descContainer = moreText.closest(".description-container");
      if (descContainer) {
        const lang = getCurrentLanguage();
        const button = getVisibleToggleButton(descContainer, lang);
        if (button) {
          button.textContent = lang === "en" ? "Show more" : "En voir plus";
        }
      }
    });
  }
});

// Swipe detection for lightbox (mobile) - horizontal swipes
let touchStartX = 0;
let touchEndX = 0;

function handleSwipeGesture() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox || lightbox.style.display !== "flex") return;

  const deltaX = touchEndX - touchStartX;
  const minSwipeDistance = 50; // px

  if (deltaX < -minSwipeDistance) {
    // swipe left → next image
    const nextBtn = document.getElementById("lightboxNext");
    if (nextBtn) nextBtn.click();
  } else if (deltaX > minSwipeDistance) {
    // swipe right → previous image
    const prevBtn = document.getElementById("lightboxPrev");
    if (prevBtn) prevBtn.click();
  }
}

document.addEventListener("touchstart", (e) => {
  if (!e.touches.length) return;
  touchStartX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipeGesture();
});

document.addEventListener("touchstart", (e) => {
  if (!e.touches.length) return;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].clientY;
  handleSwipeGesture();
});

// Close lightbox if user scrolls
window.addEventListener("scroll", () => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox && lightbox.style.display === "flex") {
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // réactive le scroll
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) scrollIndicator.style.opacity = "1";
  }
});

function updateBackgroundColor() {
  const indicatorLabel = document.querySelector(".indicator-label");
  const currentLabel = indicatorLabel ? indicatorLabel.textContent.trim() : "";
  const sections = document.querySelectorAll(
    "section[data-label-en], section[data-label-fr]"
  );
  const body = document.body;
  let appliedColor = "#000000ff"; // couleur par défaut

  sections.forEach((section) => {
    const labelEN = section.getAttribute("data-label-en")?.trim();
    const labelFR = section.getAttribute("data-label-fr")?.trim();
    if (currentLabel === labelEN || currentLabel === labelFR) {
      appliedColor = section.getAttribute("data-bgcolor") || "#000000ff";
    }
  });

  body.style.transition = "background-color 1s ease";
  body.style.backgroundColor = appliedColor;
  const mainContainer = document.querySelector(".main__container");
  if (mainContainer) {
    mainContainer.style.transition = "background-color 1s ease";
    mainContainer.style.backgroundColor = appliedColor;
  }
  // Ajout pour appliquer la couleur et la transition à .main
  const main = document.querySelector(".main");
  if (main) {
    main.style.transition = "background-color 1s ease";
    main.style.backgroundColor = appliedColor;
  }
  // Ajout pour appliquer la couleur et la transition à .main__container-bandebp
  const bandeBP = document.querySelector(".main__container-bandebp");
  if (bandeBP) {
    bandeBP.style.transition = "background-color 1s ease";
    bandeBP.style.backgroundColor = appliedColor;
  }
}

// --- Exécuter sur scroll ---
document.addEventListener("scroll", updateBackgroundColor);

// --- Exécuter quand le label change ---
const indicatorLabel = document.querySelector(".indicator-label");
if (indicatorLabel) {
  const observer = new MutationObserver(updateBackgroundColor);
  observer.observe(indicatorLabel, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

// --- Exécuter aussi au chargement initial ---
document.addEventListener("DOMContentLoaded", updateBackgroundColor);

// Partage d'une publication via une page dédiée (share page) pour ne partager que le lien
document.querySelectorAll(".social-share").forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const section = button.closest("section[id]");
    if (!section) return;

    const postId = section.id;

    // Construire le lien à partager uniquement
    const shareLink = `https://aurelienpetit.com/share/${postId}`;

    // Choisir le titre selon la langue actuelle
    const lang = getCurrentLanguage();
    const title =
      lang === "en"
        ? section.getAttribute("data-label-en") || postId
        : section.getAttribute("data-label-fr") || postId;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareLink,
        });
      } catch (err) {
        console.log("Sharing failed", err);
      }
    }
  });
});
