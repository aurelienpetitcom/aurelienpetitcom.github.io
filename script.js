const siteStructure = {
  header: (siteRoot, isHomePage, isProductionsPage) => `
    <a class="brand" href="${siteRoot}/index.html" data-i18n-aria-label="header.home">
      <img src="${siteRoot}/assets/images/logo-ap.png" data-i18n-alt="header.logo">
    </a>
    <nav class="site-nav" data-i18n-aria-label="header.primaryNavigation">
      <div class="site-nav-links">
        <a href="${isProductionsPage ? "#productions" : `${siteRoot}/productions.html`}"
          ${isProductionsPage ? 'data-current-page' : ""} data-i18n="nav.productions"></a>
        <a href="${siteRoot}/about.html"
          data-i18n="nav.about"></a>
      </div>
      <div class="site-search">
        <button class="site-search-toggle" type="button" data-i18n-aria-label="header.search" aria-expanded="false"
          aria-controls="site-search-panel">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3"></circle>
            <path d="m15.5 15.5 5 5"></path>
          </svg>
        </button>
      </div>
      <button class="site-menu-toggle" type="button" data-i18n-aria-label="header.menu" aria-expanded="false"
        aria-controls="site-mobile-menu">
        <span></span><span></span>
      </button>
    </nav>
  `,
  overlays: (siteRoot, isHomePage, isProductionsPage) => `
    <div class="minimum-width-screen" role="status">
      <img src="${siteRoot}/assets/images/logo-ap.png" data-i18n-alt="header.logo">
      <p data-i18n="screen.minimumWidth"></p>
    </div>
    <div class="site-overlay-backdrop" aria-hidden="true"></div>
    <section class="site-search-panel" id="site-search-panel" aria-hidden="true">
      <div class="site-search-panel-content">
        <form class="site-search-form" role="search">
          <div class="site-search-input-row">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.3"></circle>
              <path d="m16 16 4.3 4.3"></path>
            </svg>
            <input class="site-search-input" type="search" data-i18n-placeholder="search.placeholder"
              data-i18n-aria-label="search.inputLabel" autocomplete="off">
            <button class="site-search-clear" type="button" data-i18n-aria-label="search.clear" hidden>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18"></path>
              </svg>
            </button>
          </div>
        </form>
        <div class="site-search-results" aria-live="polite" data-i18n-aria-label="search.suggestions"></div>
      </div>
    </section>
    <nav class="site-mobile-menu" id="site-mobile-menu" data-i18n-aria-label="header.primaryNavigation"
      aria-hidden="true">
      <a href="${isProductionsPage ? "#productions" : `${siteRoot}/productions.html`}"
        ${isProductionsPage ? 'data-current-page' : ""} data-i18n="nav.productions"></a>
      <a href="${siteRoot}/about.html"
        data-i18n="nav.about"></a>
    </nav>
  `,
  footer: (siteRoot) => `
    <a class="footer-brand" href="${siteRoot}/index.html" data-i18n-aria-label="footer.backToTop">
      <img src="${siteRoot}/assets/images/logo-ap.png" data-i18n-alt="header.logo">
    </a>
    <p data-i18n="footer.copyright"></p>
    <p data-i18n="footer.trademarks"></p>
    <nav class="footer-links" data-i18n-aria-label="footer.navigation">
      <a href="${siteRoot}/legal/privacy-policy.html" target="_blank" rel="noopener noreferrer"
        data-i18n="footer.privacy"></a>
      <a href="${siteRoot}/legal/terms.html" target="_blank" rel="noopener noreferrer"
        data-i18n="footer.terms"></a>
      <button type="button" id="language-toggle" data-i18n="language.toggle"
        data-i18n-aria-label="language.switchToFrench"></button>
    </nav>
  `,
  comments: `
    <div class="section-comments-1-background" aria-hidden="true">
      <p><span>So cool · Excellent! That's great · Really cool!!! Keep going · Whoahhh so nice · Amazing! yin yang! · This is excellent ·&nbsp;</span></p>
      <p><span>Really cool!!! Keep going · A creative piece of artwork · Amazing! · Excellent! · So cool ·&nbsp;</span></p>
      <p><span>Amazing! yin yang! · This is excellent · Whoahhh so nice · So cool · Keep going ·&nbsp;</span></p>
    </div>
    <div>
      <h2 id="comments-title"><span data-i18n="comments.title"></span><br><span
          data-i18n="comments.subtitle"></span></h2>
      <a class="review-link" href="mailto:contact@aurelienpetit.com"><span
          data-i18n="comments.review"></span><span
          aria-hidden="true"></span></a>
    </div>
  `,
};

const siteRoot = document.body.dataset.siteRoot || ".";
if ("serviceWorker" in navigator && window.isSecureContext) {
  const serviceWorkerUrl = new URL(`${siteRoot}/service-worker.js`, document.baseURI);
  navigator.serviceWorker.register(serviceWorkerUrl.href).catch(error => {
    console.error("The asset cache could not be initialized.", error);
  });
}
const isHomePage = document.body.classList.contains("home-page");
const isProductionsPage = document.body.classList.contains("productions-page");
const siteTranslations = window.siteTranslations;
const siteProductions = window.siteProductions;
const languageStorageKey = "aurelien-home-language";
const cookieConsentStorageKey = "cookiesConsent";
const googleAnalyticsMeasurementId = "G-HEM24T99FD";
let currentLocale = localStorage.getItem(languageStorageKey) || document.documentElement.lang;

if (!Object.hasOwn(siteTranslations, currentLocale)) currentLocale = "en";

function loadGoogleAnalytics() {
  if (window.__gaLoaded) {
    window[`ga-disable-${googleAnalyticsMeasurementId}`] = false;
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }

  window.__gaLoaded = true;
  window[`ga-disable-${googleAnalyticsMeasurementId}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("consent", "default", { analytics_storage: "granted" });
  window.gtag("config", googleAnalyticsMeasurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`;
  script.onerror = () => {
    window.__gaLoaded = false;
    console.error("Google Analytics could not be loaded.");
  };
  document.head.append(script);
}

function revokeGoogleAnalytics() {
  window[`ga-disable-${googleAnalyticsMeasurementId}`] = true;
  if (window.__gaLoaded) {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }

  const cookieNames = document.cookie
    .split(";")
    .map(cookie => cookie.trim().split("=")[0])
    .filter(name => name === "_ga" || name.startsWith("_ga_"));
  const domains = [""];
  if (
    location.hostname === "aurelienpetit.com"
    || location.hostname.endsWith(".aurelienpetit.com")
  ) {
    domains.push("; domain=aurelienpetit.com");
  }

  cookieNames.forEach(name => {
    domains.forEach(domain => {
      document.cookie = `${name}=; max-age=0; path=/${domain}; SameSite=Lax`;
    });
  });
}

function initializeCookieConsent() {
  const banner = document.createElement("section");
  banner.className = "cookie-consent";
  banner.dataset.i18nAriaLabel = "cookie.bannerLabel";
  banner.setAttribute("aria-live", "polite");
  banner.tabIndex = -1;
  banner.innerHTML = `
    <div class="cookie-consent-copy">
      <p data-i18n="cookie.message"></p>
      <a href="${siteRoot}/legal/privacy-policy.html" target="_blank" rel="noopener noreferrer"
        data-i18n="cookie.privacy"></a>
    </div>
    <div class="cookie-consent-actions">
      <button type="button" data-cookie-consent="accept" data-i18n="cookie.accept"></button>
      <button type="button" data-cookie-consent="reject" data-i18n="cookie.reject"></button>
    </div>
  `;
  document.body.append(banner);
  applyTranslations();

  const siteFooter = document.querySelector(".site-footer");
  let isManuallyOpened = false;
  function updateCookieBannerVisibility() {
    if (!siteFooter) return;
    const footerBounds = siteFooter.getBoundingClientRect();
    const footerIsVisible = footerBounds.top < window.innerHeight && footerBounds.bottom > 0;
    const hideBanner = footerIsVisible && !isManuallyOpened;
    banner.classList.toggle("is-near-footer", hideBanner);
    banner.inert = hideBanner;
    banner.setAttribute("aria-hidden", String(hideBanner));
  }
  window.addEventListener("scroll", updateCookieBannerVisibility, { passive: true });
  window.addEventListener("resize", updateCookieBannerVisibility);
  updateCookieBannerVisibility();

  const storedConsent = localStorage.getItem(cookieConsentStorageKey);
  if (storedConsent === "accepted") {
    banner.hidden = true;
    loadGoogleAnalytics();
  } else if (storedConsent === "rejected") {
    banner.hidden = true;
  } else {
    localStorage.setItem(cookieConsentStorageKey, "pending");
    banner.hidden = false;
  }

  function saveConsent(value) {
    localStorage.setItem(cookieConsentStorageKey, value);
    banner.hidden = true;
    isManuallyOpened = false;
    updateCookieBannerVisibility();
    if (value === "accepted") {
      loadGoogleAnalytics();
    } else {
      revokeGoogleAnalytics();
    }
  }

  banner.addEventListener("click", event => {
    const button = event.target.closest("[data-cookie-consent]");
    if (!button) return;
    saveConsent(button.dataset.cookieConsent === "accept" ? "accepted" : "rejected");
  });

  document.querySelectorAll(".legal-cookie-preferences").forEach(button => {
    button.addEventListener("click", () => {
      isManuallyOpened = true;
      banner.hidden = false;
      updateCookieBannerVisibility();
      banner.focus({ preventScroll: true });
    });
  });
}

function translate(key) {
  const translation = siteTranslations[currentLocale][key];
  if (translation === undefined) throw new Error(`Missing ${currentLocale} translation: ${key}`);
  return translation;
}

function applyTranslations() {
  document.documentElement.lang = currentLocale;

  const languageToggle = document.querySelector("#language-toggle");
  if (languageToggle) {
    languageToggle.dataset.i18nAriaLabel = currentLocale === "fr"
      ? "language.switchToEnglish"
      : "language.switchToFrench";
  }

  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
    const key = element === menuToggle && menuToggle.getAttribute("aria-expanded") === "true"
      ? "header.menuClose"
      : element === searchToggle && searchToggle.getAttribute("aria-expanded") === "true"
        ? "header.searchClose"
        : element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", translate(key));
  });
  document.querySelectorAll("[data-share-production]").forEach(button => {
    const production = siteProductions[button.dataset.shareProduction];
    if (!production) throw new Error(`Missing share data: ${button.dataset.shareProduction}`);
    const label = `${translate("share.button")}: ${translate(production.searchTitleKey)}`;
    button.setAttribute("aria-label", label);
    button.title = label;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(element => {
    element.setAttribute("alt", translate(element.dataset.i18nAlt));
  });
  document.querySelectorAll("[data-i18n-content]").forEach(element => {
    element.setAttribute("content", translate(element.dataset.i18nContent));
  });
  document.querySelectorAll("[data-release-date]").forEach(element => {
    const production = siteProductions[element.dataset.releaseDate];
    if (!production) throw new Error(`Missing production data: ${element.dataset.releaseDate}`);
    const date = new Date(`${production.releaseDate}T00:00:00Z`);
    const formattedDate = new Intl.DateTimeFormat(currentLocale, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      timeZone: "UTC",
    }).format(date);
    element.textContent = `${translate("date.releasePrefix")} ${formattedDate}`;
  });
  document.querySelectorAll("[data-about-cv-image]").forEach(image => {
    image.src = `${siteRoot}/assets/images/about/cv_aurelien_petit_06_10_26_${currentLocale}.png`;
    image.alt = translate("about.imageAlt");
  });
  document.querySelectorAll("[data-about-cv-download]").forEach(link => {
    const filename = `cv_aurelien_petit_06_10_26_${currentLocale}.pdf`;
    link.href = `${siteRoot}/assets/fichiers/about/${filename}`;
    link.download = filename;
  });
  document.querySelectorAll("[data-about-cv-size]").forEach(element => {
    element.textContent = translate(`about.fileSize.${currentLocale}`);
  });

  if (searchPanel?.classList.contains("is-open")) renderSearchResults();
}

document.querySelector("[data-site-header]").innerHTML = siteStructure.header(
  siteRoot,
  isHomePage,
  isProductionsPage,
);
document.querySelector("[data-site-header]").insertAdjacentHTML(
  "afterend",
  siteStructure.overlays(siteRoot, isHomePage, isProductionsPage),
);
document.querySelector("[data-site-footer]").innerHTML =
  siteStructure.footer(siteRoot);
document.querySelectorAll("[data-comments-section]").forEach(section => {
  section.innerHTML = siteStructure.comments;
});

function fillCommentMarquees() {
  document.querySelectorAll(".section-comments-1-background p").forEach(line => {
    const firstCopy = line.firstElementChild;
    if (!firstCopy) return;

    line.querySelectorAll("[data-marquee-copy]").forEach(copy => copy.remove());
    const copyWidth = firstCopy.getBoundingClientRect().width;
    const containerWidth = line.parentElement.clientWidth;
    if (!copyWidth || !containerWidth) return;

    const copyCount = Math.max(2, Math.ceil(containerWidth / copyWidth) * 2);
    for (let index = 1; index < copyCount; index += 1) {
      const copy = firstCopy.cloneNode(true);
      copy.dataset.marqueeCopy = "";
      copy.setAttribute("aria-hidden", "true");
      line.append(copy);
    }
  });
}

fillCommentMarquees();
document.fonts.ready.then(fillCommentMarquees);
window.addEventListener("resize", fillCommentMarquees, { passive: true });

document.querySelectorAll("[data-current-page]").forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});

document.querySelectorAll("[data-production-instagram]").forEach(link => {
  const production = siteProductions[link.dataset.productionInstagram];
  if (!production) throw new Error(`Missing production data: ${link.dataset.productionInstagram}`);
  link.href = production.instagram;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-production-timelapse]").forEach(link => {
  const production = siteProductions[link.dataset.productionTimelapse];
  if (!production?.timelapseInstagram) {
    throw new Error(`Missing timelapse link: ${link.dataset.productionTimelapse}`);
  }
  link.href = production.timelapseInstagram;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-production-id]").forEach(card => {
  const production = siteProductions[card.dataset.productionId];
  if (!production) throw new Error(`Missing production data: ${card.dataset.productionId}`);

  card.querySelectorAll("[data-production-link]").forEach(link => {
    if (link.dataset.productionLink === "instagram") {
      link.href = production.instagram;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else if (link.dataset.productionLink === "page" && production.page) {
      link.href = `${siteRoot}/${production.page}`;
    }
  });

});

function createShareButton(productionId) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "share-button";
  button.dataset.shareProduction = productionId;
  button.dataset.i18nAriaLabel = "share.button";
  button.title = translate("share.button");

  const icon = document.createElement("img");
  icon.src = `${siteRoot}/assets/images/logoshare.png`;
  icon.alt = "";
  button.append(icon);

  const feedback = document.createElement("span");
  feedback.className = "share-feedback";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  return { button, feedback };
}

document.querySelectorAll("[data-production-page]").forEach(page => {
  const productionId = page.dataset.productionPage;
  const production = siteProductions[productionId];
  if (!production) throw new Error(`Missing production data: ${productionId}`);

  const socialLinks = page.querySelector(".production-hero .social-links");
  if (!socialLinks || !production.shareSlug) return;
  const shareButton = createShareButton(productionId);
  socialLinks.append(shareButton.button, shareButton.feedback);
});

document.querySelectorAll("[data-share-production]").forEach(button => {
  button.addEventListener("click", async () => {
    const production = siteProductions[button.dataset.shareProduction];
    if (!production?.shareSlug) {
      throw new Error(`Missing share data: ${button.dataset.shareProduction}`);
    }

    const shareUrl = new URL(
      `${siteRoot}/share/${production.shareSlug}.html`,
      document.baseURI,
    ).href;
    const feedback = button.nextElementSibling;
    feedback.textContent = "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: translate(production.searchTitleKey),
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        feedback.textContent = translate("share.copied");
      } else {
        throw new Error("Neither native sharing nor clipboard access is available.");
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Could not share the production link.", error);
      feedback.textContent = translate("share.error");
    }
  });
});

document.querySelector("#language-toggle")?.addEventListener("click", () => {
  currentLocale = currentLocale === "fr" ? "en" : "fr";
  localStorage.setItem(languageStorageKey, currentLocale);
  applyTranslations();
  window.dispatchEvent(new CustomEvent("site-language-change", {
    detail: { locale: currentLocale },
  }));
});

const siteHeader = document.querySelector(".site-header");
const searchForm = document.querySelector(".site-search-form");
const searchInput = document.querySelector(".site-search-input");
const searchToggle = document.querySelector(".site-search-toggle");
const searchPanel = document.querySelector(".site-search-panel");
const searchResults = document.querySelector(".site-search-results");
const searchClear = document.querySelector(".site-search-clear");
const overlayBackdrop = document.querySelector(".site-overlay-backdrop");
const menuToggle = document.querySelector(".site-menu-toggle");
const mobileMenu = document.querySelector(".site-mobile-menu");
let overlayScrollY = 0;
applyTranslations();
initializeCookieConsent();

const searchEntries = [
  {
    titleKey: "site.archiveTitle",
    displayTitleKey: "search.archive",
    href: `${siteRoot}/productions.html`,
  },
  {
    titleKey: "about.title",
    displayTitleKey: "search.about",
    href: `${siteRoot}/about.html`,
  },
  {
    titleKey: "legal.privacyTitle",
    displayTitleKey: "search.privacy",
    href: `${siteRoot}/legal/privacy-policy.html`,
  },
  {
    titleKey: "legal.termsTitle",
    displayTitleKey: "search.terms",
    href: `${siteRoot}/legal/terms.html`,
  },
];

const productionSearchEntries = Object.entries(siteProductions).map(([id, production]) => ({
  titleKey: production.searchTitleKey,
  displayTitle: siteTranslations.en[production.searchTitleKey],
  releaseDate: production.releaseDate,
  searchAliases: production.searchAliases || [],
  searchTitleKeys: [production.searchTitleKey, production.searchPageTitleKey].filter(Boolean),
  href: production.page
    ? `${siteRoot}/${production.page}`
    : `${siteRoot}/productions.html#production-${id}`,
}));

function renderSearchResults() {
  const normalize = value => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
  const query = normalize(searchInput.value.trim());
  const queryTerms = query.split(/\s+/).filter(Boolean);
  searchClear.hidden = !query;
  searchResults.replaceChildren();

  const entries = query
    ? [...searchEntries, ...productionSearchEntries]
    : [...productionSearchEntries]
      .sort((left, right) => right.releaseDate.localeCompare(left.releaseDate))
      .slice(0, 3);
  const matches = entries
    .map((entry, index) => {
      const title = entry.displayTitle || translate(entry.displayTitleKey || entry.titleKey);
      const titleKeys = entry.searchTitleKeys || [entry.titleKey];
      const normalizedTitles = Object.values(siteTranslations)
        .flatMap(translations => titleKeys.map(key => translations[key]))
        .filter(Boolean)
        .map(title => title.replace(/\s+—\s+Aurélien Petit$/, ""))
        .concat(entry.searchAliases || [])
        .map(normalize);
      const matchingTitle = normalizedTitles.find(candidate =>
        queryTerms.every(term => candidate.includes(term))
      );
      const rank = matchingTitle === query
        ? 0
        : matchingTitle?.startsWith(query)
          ? 1
          : matchingTitle?.includes(query)
            ? 2
            : 3;

      return {
        ...entry,
        title,
        index,
        rank,
        matches: Boolean(matchingTitle),
      };
    })
    .filter(entry => entry.matches)
    .sort((left, right) => left.rank - right.rank || left.index - right.index)
    .slice(0, 5);

  if (!matches.length) {
    updateSearchPanelHeight();
    return;
  }

  const heading = document.createElement("p");
  heading.className = "site-search-results-heading";
  heading.textContent = query
    ? translate("search.suggestionsHeading")
    : translate("search.quickLinks");
  searchResults.append(heading);

  matches.forEach(entry => {
    const result = document.createElement("a");
    result.className = "site-search-result";
    result.href = entry.href;
    result.textContent = entry.title;
    searchResults.append(result);
  });

  updateSearchPanelHeight();
}

function updateSearchPanelHeight() {
  if (!searchPanel.classList.contains("is-open")) return;
  const contentBottom = searchResults.childElementCount
    ? searchResults.getBoundingClientRect().bottom
    : searchForm.getBoundingClientRect().bottom;
  const panelTop = searchPanel.getBoundingClientRect().top;
  searchPanel.style.height = `${Math.ceil(contentBottom - panelTop + 80)}px`;
}

function updateHeaderVisibility() {
  const overlayOpen = siteHeader.classList.contains("search-open")
    || siteHeader.classList.contains("menu-open");
  const opacity = overlayOpen ? 1 : Math.max(0, 1 - window.scrollY / 50);
  siteHeader.style.setProperty("--site-header-opacity", String(opacity));
  siteHeader.style.visibility = opacity === 0 ? "hidden" : "visible";
  siteHeader.inert = opacity === 0;
}

function lockPageScroll({ freeze = false } = {}) {
  overlayScrollY = window.scrollY;
  document.body.style.overflow = "hidden";
  if (freeze) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${overlayScrollY}px`;
    document.body.style.width = "100%";
  }
}

function unlockPageScroll() {
  const wasFixed = document.body.style.position === "fixed";
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("top");
  document.body.style.removeProperty("width");
  document.body.style.removeProperty("overflow");
  window.scrollTo(0, overlayScrollY);
}

function closeSearch({ restoreFocus = true } = {}) {
  siteHeader.classList.remove("search-open");
  searchPanel.classList.remove("is-open");
  searchPanel.setAttribute("aria-hidden", "true");
  overlayBackdrop.classList.remove("is-open");
  overlayBackdrop.setAttribute("aria-hidden", "true");
  searchToggle.setAttribute("aria-expanded", "false");
  searchToggle.setAttribute("aria-label", translate("header.search"));
  searchInput.value = "";
  searchClear.hidden = true;
  searchResults.replaceChildren();
  document.body.classList.remove("site-overlay-open");
  unlockPageScroll();
  updateHeaderVisibility();
  if (restoreFocus) searchToggle.focus({ preventScroll: true });
}

function openSearch() {
  if (menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu({ restoreFocus: false });
  }
  lockPageScroll();

  siteHeader.classList.add("search-open");
  searchPanel.classList.add("is-open");
  searchPanel.setAttribute("aria-hidden", "false");
  overlayBackdrop.classList.add("is-open");
  overlayBackdrop.setAttribute("aria-hidden", "false");
  searchToggle.setAttribute("aria-expanded", "true");
  searchToggle.setAttribute("aria-label", translate("header.searchClose"));
  document.body.classList.add("site-overlay-open");
  renderSearchResults();
  updateSearchPanelHeight();
  updateHeaderVisibility();
  searchInput.focus({ preventScroll: true });
}

function closeMenu({ restoreFocus = true } = {}) {
  siteHeader.classList.remove("menu-open");
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  overlayBackdrop.classList.remove("is-open");
  overlayBackdrop.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", translate("header.menu"));
  document.body.classList.remove("site-overlay-open");
  unlockPageScroll();
  updateHeaderVisibility();
  if (restoreFocus) menuToggle.focus({ preventScroll: true });
}

function openMenu() {
  if (siteHeader.classList.contains("search-open")) {
    closeSearch({ restoreFocus: false });
  }
  lockPageScroll({ freeze: true });

  siteHeader.classList.add("menu-open");
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  overlayBackdrop.classList.add("is-open");
  overlayBackdrop.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", translate("header.menuClose"));
  document.body.classList.add("site-overlay-open");
  updateHeaderVisibility();
  menuToggle.focus({ preventScroll: true });
}

function closeOverlay({ restoreFocus = true } = {}) {
  if (siteHeader.classList.contains("search-open")) {
    closeSearch({ restoreFocus });
  } else if (siteHeader.classList.contains("menu-open")) {
    closeMenu({ restoreFocus });
  }
}

searchToggle.addEventListener("click", () => {
  if (siteHeader.classList.contains("search-open")) {
    closeSearch();
  } else {
    openSearch();
  }
});
searchInput.addEventListener("input", renderSearchResults);
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  renderSearchResults();
  searchInput.focus({ preventScroll: true });
});
searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchResults.querySelector(".site-search-result")?.click();
});
menuToggle.addEventListener("click", () => {
  if (siteHeader.classList.contains("menu-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => closeMenu({ restoreFocus: false }));
});
overlayBackdrop.addEventListener("click", () => closeOverlay());
document.addEventListener("pointermove", event => {
  if (!searchPanel.classList.contains("is-open")) return;
  const panelBounds = searchPanel.getBoundingClientRect();
  const toggleBounds = searchToggle.getBoundingClientRect();
  const insidePanel = event.clientX >= panelBounds.left
    && event.clientX <= panelBounds.right
    && event.clientY >= panelBounds.top
    && event.clientY <= panelBounds.bottom;
  const insideToggle = event.clientX >= toggleBounds.left
    && event.clientX <= toggleBounds.right
    && event.clientY >= toggleBounds.top
    && event.clientY <= toggleBounds.bottom;
  if (!insidePanel && !insideToggle) closeSearch({ restoreFocus: false });
});
window.addEventListener("scroll", () => {
  if (searchPanel.classList.contains("is-open")) {
    closeSearch({ restoreFocus: false });
  } else {
    updateSearchPanelHeight();
  }
}, { passive: true });
window.addEventListener("resize", updateSearchPanelHeight);
document.addEventListener("wheel", () => {
  if (searchPanel.classList.contains("is-open")) {
    closeSearch({ restoreFocus: false });
  }
}, { passive: true });
document.addEventListener("touchmove", () => {
  if (searchPanel.classList.contains("is-open")) {
    closeSearch({ restoreFocus: false });
  }
}, { passive: true });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("site-overlay-open")) {
    closeOverlay();
  }
});
window.addEventListener("resize", updateSearchPanelHeight);

window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
updateHeaderVisibility();

const productionYearFilter = document.querySelector(".production-year-filter");

if (productionYearFilter) {
  const productionCards = [...document.querySelectorAll(".production-year-items [data-year]")];
  const yearButtons = [...productionYearFilter.querySelectorAll("button[data-year]")];
  const indicator = productionYearFilter.querySelector(".production-year-filter-indicator");
  const anchorTarget = productionCards.find(card => card.id === window.location.hash.slice(1));
  const requestedYear = anchorTarget?.dataset.year;
  const selectedButton = yearButtons.find(button => button.dataset.year === requestedYear)
    || yearButtons.find(button =>
      button.getAttribute("aria-pressed") === "true"
    );
  if (selectedButton) {
    yearButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button === selectedButton));
    });
  }
  let displayedYear = selectedButton?.dataset.year;
  let transitionId = 0;

  function moveYearIndicator(button) {
    if (!indicator) return;

    const filterLeft = productionYearFilter.getBoundingClientRect().left;
    const buttonRect = button.getBoundingClientRect();
    productionYearFilter.style.setProperty(
      "--year-pill-left",
      `${buttonRect.left - filterLeft}px`,
    );
    productionYearFilter.style.setProperty("--year-pill-width", `${buttonRect.width}px`);
  }

  function restoreDisplayedYear() {
    productionCards.forEach(card => {
      const visible = card.dataset.year === displayedYear;
      card.getAnimations().forEach(animation => animation.cancel());
      card.hidden = !visible;
      card.setAttribute("aria-hidden", String(!visible));
      card.inert = !visible;
    });
  }

  if (selectedButton && displayedYear) {
    restoreDisplayedYear();
    moveYearIndicator(selectedButton);
    document.fonts.ready.then(() => {
      const activeButton = yearButtons.find(button =>
        button.getAttribute("aria-pressed") === "true"
      );
      if (activeButton) {
        moveYearIndicator(activeButton);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            productionYearFilter.classList.add("is-ready");
            anchorTarget?.scrollIntoView({ block: "start" });
          });
        });
      }
    });
  }

  productionYearFilter.addEventListener("click", async event => {
    const selectedButton = event.target.closest("button[data-year]");
    if (!selectedButton || !productionYearFilter.contains(selectedButton)) return;

    const selectedYear = selectedButton.dataset.year;
    if (selectedButton.getAttribute("aria-pressed") === "true") return;
    const activeButton = yearButtons.find(button =>
      button.getAttribute("aria-pressed") === "true"
    );
    const direction = activeButton
      && selectedButton.compareDocumentPosition(activeButton) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1;

    yearButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button === selectedButton));
    });
    moveYearIndicator(selectedButton);

    const currentTransitionId = ++transitionId;
    restoreDisplayedYear();
    const outgoingCards = productionCards.filter(card => card.dataset.year === displayedYear);
    const incomingCards = productionCards.filter(card => card.dataset.year === selectedYear);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;

    outgoingCards.forEach(card => {
      card.setAttribute("aria-hidden", "true");
      card.inert = true;
    });
    await Promise.all(outgoingCards.map(card => {
      const animation = card.animate(
        [
          { opacity: 1, transform: "translateX(0)" },
          { opacity: 0, transform: `translateX(${direction * 28}px)` },
        ],
        { duration, easing: "ease", fill: "forwards" },
      );
      return animation.finished.catch(() => {});
    }));

    if (currentTransitionId !== transitionId) return;

    outgoingCards.forEach(card => {
      card.hidden = true;
    });
    incomingCards.forEach(card => {
      card.hidden = false;
      card.setAttribute("aria-hidden", "false");
      card.inert = false;
    });
    displayedYear = selectedYear;

    if (duration > 0) {
      await Promise.all(incomingCards.map(card => {
        const animation = card.animate(
          [
            { opacity: 0, transform: `translateX(${-direction * 28}px)` },
            { opacity: 1, transform: "translateX(0)" },
          ],
          { duration, easing: "ease-out" },
        );
        return animation.finished.catch(() => {});
      }));
    }
  });

  window.addEventListener("resize", () => {
    const activeButton = yearButtons.find(button =>
      button.getAttribute("aria-pressed") === "true"
    );
    if (activeButton) moveYearIndicator(activeButton);
  });
}

const lockup = document.querySelector(".production-lockup");

if (lockup) {
  const stickyRange = document.querySelector(".production-sticky-range");
  const detailsSection = document.querySelector(".section-details-1");
  const artworkSection = document.querySelector(".section-artwork-1");
  const artworkImage = document.querySelector(".section-artwork-1-image-layer");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function updateLockupOpacity() {
    const scrollY = window.scrollY;
    const stickyTop = parseFloat(getComputedStyle(lockup).top);
    const lockupRect = lockup.getBoundingClientRect();
    const rangeRect = stickyRange.getBoundingClientRect();
    const start = rangeRect.top + scrollY - stickyTop;
    const end = rangeRect.bottom + scrollY - lockupRect.height - stickyTop;
    const progress = (scrollY - start) / (end - start);

    lockup.style.opacity = String(Math.max(0, Math.min(1, 1 - progress)));
  }

  function updateDetailsAnimation() {
    const imageLayoutTop = Math.min(
      ...[
        ...detailsSection.querySelectorAll(
          ".section-details-1-image-left, .section-details-1-image-right",
        ),
      ].map(
        (image) =>
          image.offsetParent.getBoundingClientRect().top + image.offsetTop,
      ),
    );
    const shouldShow =
      !prefersReducedMotion.matches &&
      imageLayoutTop + 200 <= window.innerHeight * 0.9;

    detailsSection.classList.toggle("is-visible", shouldShow);
  }

  function updateArtworkParallax() {
    if (!artworkSection || !artworkImage) return;

    if (prefersReducedMotion.matches) {
      artworkImage.style.setProperty("--artwork-parallax-offset", "0px");
      return;
    }

    const sectionTop = artworkSection.getBoundingClientRect().top;
    const travelDistance = window.innerHeight + artworkSection.offsetHeight;
    const progress = Math.max(
      0,
      Math.min(1, (window.innerHeight - sectionTop) / travelDistance),
    );
    artworkImage.style.setProperty(
      "--artwork-parallax-offset",
      `${-100 * progress}px`,
    );
  }

  let opacityUpdatePending = false;
  window.addEventListener(
    "scroll",
    () => {
      if (opacityUpdatePending) return;
      opacityUpdatePending = true;
      requestAnimationFrame(() => {
        updateLockupOpacity();
        updateDetailsAnimation();
        updateArtworkParallax();
        opacityUpdatePending = false;
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", () => {
    updateLockupOpacity();
    updateDetailsAnimation();
    updateArtworkParallax();
  });
  updateLockupOpacity();
  updateDetailsAnimation();
  updateArtworkParallax();
}
