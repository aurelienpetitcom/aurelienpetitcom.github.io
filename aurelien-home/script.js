(() => {
  const track = document.querySelector("#featured-track");
  const prev = document.querySelector("#carousel-prev");
  const next = document.querySelector("#carousel-next");
  const i18n = window.siteI18n;
  const catalog = window.productionCatalog || [];
  const siteSearchPages = window.siteSearchPages || [];
  const isProductionDetail = window.location.pathname
    .split("/")
    .includes("productions");
  const sitePrefix = isProductionDetail ? "../" : "";
  const productionIndex = document.querySelector(".production-index");
  const indexPrev = document.querySelector(".production-index-prev");
  const indexNext = document.querySelector(".production-index-next");

  function siteHref(path) {
    if (!isProductionDetail) return path;
    return path.startsWith("productions/")
      ? path.slice("productions/".length)
      : `../${path}`;
  }

  function createProjectCard(project, { production = false } = {}) {
    const card = document.createElement("a");
    card.className = `project-card searchable${
      production ? " production-card" : ""
    }${project.dark ? " project-card-dark" : ""}`;
    card.href = siteHref(project.href);
    card.dataset.search = project.searchTerms;
    if (production) card.dataset.year = project.year;

    const art = document.createElement("div");
    art.className = "project-art";
    const image = document.createElement("img");
    image.src = `${sitePrefix}assets/images/${project.image}`;
    image.loading = "lazy";
    if (project.altKey) {
      image.alt = i18n.translate(project.altKey);
      image.dataset.i18nAlt = project.altKey;
    } else {
      image.alt = "";
      image.setAttribute("aria-hidden", "true");
    }
    art.append(image);

    const copy = document.createElement("div");
    copy.className = "project-copy";
    const title = document.createElement("h3");
    title.textContent = i18n.translate(project.titleKey);
    title.dataset.i18n = project.titleKey;
    const description = document.createElement("p");
    description.textContent = i18n.translate(project.descriptionKey);
    description.dataset.i18n = project.descriptionKey;
    copy.append(title, description);
    card.append(art, copy);
    return card;
  }

  if (track && catalog.length) {
    const productionPage = document.querySelector(".productions-page");
    const projects = productionPage ? catalog : catalog.slice(0, 3);
    track.replaceChildren(
      ...projects.map((project) =>
        createProjectCard(project, { production: Boolean(productionPage) }),
      ),
    );
  }

  if (productionIndex && catalog.length) {
    productionIndex.replaceChildren(
      ...catalog.map((project) => {
        const item = document.createElement("a");
        item.className = "production-index-item";
        item.href = siteHref(project.href);
        const image = document.createElement("img");
        image.src = `${sitePrefix}assets/images/${project.logo}`;
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        const title = document.createElement("span");
        title.textContent = i18n.translate(project.titleKey);
        title.dataset.i18n = project.titleKey;
        item.append(image, title);
        return item;
      }),
    );
  }

  const journeyOpening = document.querySelector("[data-journey-opening]");
  if (journeyOpening) {
    const journeyOverview = document.querySelector(".journey-overview");
    const journeySubnav = document.querySelector(".journey-subnav");
    const updateJourneyOpening = () => {
      const transitionStart = Math.max(0, journeyOpening.offsetTop - 70);
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - transitionStart) / 208),
      );
      const lineOpacity = (start, end) =>
        Math.min(
          1,
          Math.max(
            0,
            Math.min((progress - start) / 0.08, (end - progress) / 0.08),
          ),
        );
      const introFade = Math.min(1, Math.max(0, (progress - 0.02) / 0.1));
      const overviewProgress = Math.min(
        1,
        Math.max(0, (progress - 0.82) / 0.18),
      );
      journeyOpening.style.setProperty(
        "--journey-intro-opacity",
        1 - introFade,
      );
      journeyOverview.style.setProperty(
        "--journey-overview-opacity",
        overviewProgress,
      );
      journeyOverview.style.setProperty(
        "--journey-overview-offset",
        `${(1 - overviewProgress) * 24}px`,
      );
      journeyOpening.style.setProperty(
        "--journey-narrative-one-opacity",
        lineOpacity(0.08, 0.42),
      );
      journeyOpening.style.setProperty(
        "--journey-narrative-two-opacity",
        lineOpacity(0.33, 0.63),
      );
      journeyOpening.style.setProperty(
        "--journey-narrative-three-opacity",
        lineOpacity(0.58, 0.82),
      );
      journeyOpening.classList.toggle("is-narrative-active", progress >= 0.12);
      const subnavTop = journeySubnav.getBoundingClientRect().top;
      const subnavOpacity = Math.min(
        1,
        Math.max(0, (160 - subnavTop) / (160 - 12)),
      );
      journeySubnav.style.setProperty(
        "--journey-subnav-opacity",
        subnavOpacity,
      );
      journeySubnav.style.pointerEvents =
        subnavOpacity > 0 ? "auto" : "none";
      journeySubnav.inert = subnavOpacity === 0;
      journeySubnav.setAttribute("aria-hidden", String(subnavOpacity === 0));
    };
    window.addEventListener("scroll", updateJourneyOpening, { passive: true });
    window.addEventListener("resize", updateJourneyOpening);
    updateJourneyOpening();
  }

  const projectCards = [...document.querySelectorAll(".project-card")];
  let wheelScrollLocked = false;
  let carouselAnimationFrame = 0;
  let cardAnimationFrame = 0;
  let animatedCarousel = null;

  function animateProjectCards(cardsToAnimate) {
    cancelAnimationFrame(cardAnimationFrame);
    cardAnimationFrame = 0;
    projectCards.forEach((card) => card.classList.remove("is-entering"));
    projectCards.forEach((card) =>
      card.style.removeProperty("--card-enter-delay"),
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cardsToAnimate.forEach((card, index) => {
      card.style.setProperty("--card-enter-delay", `${index * 70}ms`);
    });
    if (!cardsToAnimate.length) return;
    void cardsToAnimate[0].offsetWidth;
    cardAnimationFrame = requestAnimationFrame(() => {
      cardsToAnimate.forEach((card) => card.classList.add("is-entering"));
      cardAnimationFrame = 0;
    });
  }
  projectCards.forEach((card) => {
    card.addEventListener("animationend", (event) => {
      if (event.animationName !== "production-card-enter") return;
      card.classList.remove("is-entering");
      card.style.removeProperty("--card-enter-delay");
    });
  });

  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.querySelector(".search-panel");
  const searchBackdrop = document.querySelector(".search-backdrop");
  const searchInput = document.querySelector("#site-search");
  const searchClear = document.querySelector("#search-clear");
  const searchForm = document.querySelector("#search-form");
  const results = document.querySelector(".search-results");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".nav-primary");
  const siteHeader = document.querySelector(".site-header");
  const toast = document.querySelector(".toast");
  const languageToggle = document.querySelector("#language-toggle");
  let toastTimer;
  let menuScrollY = 0;
  function updateSearchPanelHeight() {
    if (!searchPanel.classList.contains("is-open")) return;
    const contentBottom = results.childElementCount
      ? results.getBoundingClientRect().bottom
      : searchForm.getBoundingClientRect().bottom;
    const panelTop = searchPanel.getBoundingClientRect().top;
    searchPanel.style.height = `${Math.ceil(contentBottom - panelTop + 80)}px`;
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }
  languageToggle?.addEventListener("click", () => i18n.toggleLocale());
  window.addEventListener("site-language-change", (event) => {
    languageToggle.dataset.i18nAriaLabel =
      event.detail.locale === "fr"
        ? "language.switchToEnglish"
        : "language.switchToFrench";
    languageToggle.setAttribute(
      "aria-label",
      i18n.translate(languageToggle.dataset.i18nAriaLabel),
    );
    if (searchPanel.classList.contains("is-open")) {
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  function openSearch(open, { focusToggle = true } = {}) {
    if (open) setMenuOpen(false);
    siteHeader.classList.toggle("search-open", open);
    searchPanel.classList.toggle("is-open", open);
    searchBackdrop.classList.toggle("is-open", open);
    searchPanel.setAttribute("aria-hidden", String(!open));
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute(
      "aria-label",
      i18n.translate(open ? "search.close" : "search.open"),
    );
    document.body.classList.toggle("search-open", open);
    if (open) {
      searchInput.focus({ preventScroll: true });
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      searchInput.value = "";
      searchClear.hidden = true;
      results.replaceChildren();
      if (focusToggle) {
        searchToggle.focus({ preventScroll: true });
      } else {
        searchInput.blur();
      }
    }
  }
  searchToggle.addEventListener("click", () =>
    openSearch(!searchPanel.classList.contains("is-open")),
  );
  searchBackdrop.addEventListener("click", () => openSearch(false));
  document.addEventListener("pointermove", (event) => {
    if (!searchPanel.classList.contains("is-open")) return;
    const bounds = searchPanel.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      openSearch(false, { focusToggle: false });
    }
  });
  window.addEventListener(
    "scroll",
    () => {
      if (searchPanel.classList.contains("is-open")) openSearch(false);
    },
    { passive: true },
  );
  document.addEventListener(
    "wheel",
    () => {
      if (searchPanel.classList.contains("is-open")) openSearch(false);
    },
    { passive: true },
  );
  document.addEventListener(
    "touchmove",
    () => {
      if (searchPanel.classList.contains("is-open")) openSearch(false);
    },
    { passive: true },
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchPanel.classList.contains("is-open"))
      openSearch(false);
    else if (
      e.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    )
      setMenuOpen(false);
  });

  function submitSearch(query) {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      showToast(i18n.translate("search.empty"));
      return;
    }
    window.location.href = `/search?q=${encodeURIComponent(normalizedQuery)}`;
  }

  searchInput.addEventListener("input", () => {
    searchClear.hidden = !searchInput.value;
    const query = searchInput.value.trim().toLocaleLowerCase(i18n.getLocale());
    results.replaceChildren();

    const suggestions = siteSearchPages.filter((page) => {
      if (!query) return true;
      const content = [
        i18n.translate(page.titleKey),
        ...page.keys.map((key) => i18n.translate(key)),
        page.searchTerms,
      ]
        .join(" ")
        .toLocaleLowerCase(i18n.getLocale());
      return content.includes(query);
    }).slice(0, 5);

    if (!suggestions.length) {
      updateSearchPanelHeight();
      return;
    }

    const heading = document.createElement("p");
    heading.className = "search-results-heading";
    heading.textContent = i18n.translate(
      query ? "search.suggestionsHeading" : "search.quickLinks",
    );
    results.append(heading);
    suggestions.forEach((page) => {
      const suggestion = document.createElement("a");
      suggestion.className = "search-result";
      suggestion.href = siteHref(page.href);
      suggestion.textContent = i18n.translate(page.titleKey);
      results.append(suggestion);
    });
    updateSearchPanelHeight();
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.hidden = true;
    searchInput.focus({ preventScroll: true });
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitSearch(searchInput.value);
  });
  window.addEventListener("resize", updateSearchPanelHeight);

  const yearFilters = document.querySelectorAll("[data-year-filter]");
  if (yearFilters.length && track) {
    const cards = [...track.querySelectorAll(".production-card")];
    const yearTabs = yearFilters[0].parentElement;
    function updateYearIndicator() {
      const selectedFilter = [...yearFilters].find((filter) =>
        filter.classList.contains("is-selected"),
      );
      if (!selectedFilter || !yearTabs) return;
      yearTabs.style.setProperty(
        "--year-indicator-left",
        `${selectedFilter.offsetLeft}px`,
      );
      yearTabs.style.setProperty(
        "--year-indicator-width",
        `${selectedFilter.offsetWidth}px`,
      );
    }
    yearFilters.forEach((filter) => {
      filter.addEventListener("click", () => {
        const year = filter.dataset.yearFilter;
        yearFilters.forEach((tab) => {
          const selected = tab === filter;
          tab.classList.toggle("is-selected", selected);
          tab.setAttribute("aria-pressed", String(selected));
          tab.disabled = selected;
        });
        updateYearIndicator();
        cards.forEach((card) => {
          card.hidden = card.dataset.year !== year;
        });
        animateProjectCards(cards.filter((card) => !card.hidden));
        if (carouselAnimationFrame) {
          cancelAnimationFrame(carouselAnimationFrame);
          carouselAnimationFrame = 0;
          animatedCarousel?.style.removeProperty("scroll-snap-type");
          animatedCarousel = null;
        }
        track.scrollLeft = 0;
        updateCarouselControls();
      });
    });
    const initialYear = yearFilters[0].dataset.yearFilter;
    cards.forEach((card) => {
      card.hidden = card.dataset.year !== initialYear;
    });
    animateProjectCards(cards.filter((card) => !card.hidden));
    updateYearIndicator();
    window.addEventListener("resize", updateYearIndicator);
  } else {
    animateProjectCards(projectCards.filter((card) => !card.hidden));
  }

  function setMenuOpen(open) {
    if (open) menuScrollY = window.scrollY;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? i18n.translate("menu.close") : i18n.translate("menu.open"),
    );
    primaryNav.classList.toggle("nav-open", open);
    siteHeader.classList.toggle("menu-open", open);
    document.body.classList.toggle("mobile-menu-open", open);
    if (open) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${menuScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      menuToggle.focus({ preventScroll: true });
    } else {
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("overflow");
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, menuScrollY);
      requestAnimationFrame(() =>
        document.documentElement.style.removeProperty("scroll-behavior"),
      );
    }
  }
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    if (open && searchPanel.classList.contains("is-open")) openSearch(false);
    setMenuOpen(open);
  });
  primaryNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      setMenuOpen(false);
    }),
  );

  function updateCarouselControls() {
    if (!track || !prev || !next) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll - 12;
    prev.closest(".carousel-controls").hidden = prev.disabled && next.disabled;
  }
  function updateIndexControls() {
    if (!productionIndex || !indexPrev || !indexNext) return;
    const maxScroll = productionIndex.scrollWidth - productionIndex.clientWidth;
    const canScroll = maxScroll > 2;
    indexPrev.hidden = !canScroll || productionIndex.scrollLeft <= 2;
    indexNext.hidden =
      !canScroll || productionIndex.scrollLeft >= maxScroll - 2;
  }
  function scrollToAdjacentItem(container, selector, direction) {
    if (!container) return;
    const items = [...container.querySelectorAll(selector)];
    if (!items.length) return;
    const containerLeft =
      container.getBoundingClientRect().left + container.clientLeft;
    const currentIndex = items.reduce((nearestIndex, item, index) => {
      const currentDistance = Math.abs(
        items[nearestIndex].getBoundingClientRect().left - containerLeft,
      );
      const candidateDistance = Math.abs(
        item.getBoundingClientRect().left - containerLeft,
      );
      return candidateDistance < currentDistance ? index : nearestIndex;
    }, 0);
    const nextIndex = Math.max(
      0,
      Math.min(items.length - 1, currentIndex + direction),
    );
    if (nextIndex === currentIndex) return;
    const scrollInset = Number.parseFloat(
      getComputedStyle(container).scrollPaddingLeft,
    );
    const targetLeft = Math.max(
      0,
      Math.min(
        container.scrollWidth - container.clientWidth,
        container.scrollLeft +
          items[nextIndex].getBoundingClientRect().left -
          containerLeft -
          (Number.isNaN(scrollInset) ? 0 : scrollInset),
      ),
    );
    cancelAnimationFrame(carouselAnimationFrame);
    carouselAnimationFrame = 0;
    animatedCarousel?.style.removeProperty("scroll-snap-type");
    animatedCarousel = container;
    container.style.scrollSnapType = "none";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      container.scrollTo({ left: targetLeft, behavior: "auto" });
      container.style.removeProperty("scroll-snap-type");
      animatedCarousel = null;
      return;
    }
    const startLeft = container.scrollLeft;
    const startTime = performance.now();
    const duration = 700;
    function animateCarousel(timestamp) {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress =
        progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      container.scrollLeft =
        startLeft + (targetLeft - startLeft) * easedProgress;
      if (progress < 1) {
        carouselAnimationFrame = requestAnimationFrame(animateCarousel);
      } else {
        carouselAnimationFrame = 0;
        container.style.removeProperty("scroll-snap-type");
        animatedCarousel = null;
      }
    }
    carouselAnimationFrame = requestAnimationFrame(animateCarousel);
  }
  function scrollToAdjacentCard(direction) {
    scrollToAdjacentItem(track, ".project-card:not([hidden])", direction);
  }
  prev?.addEventListener("click", () => scrollToAdjacentCard(-1));
  next?.addEventListener("click", () => scrollToAdjacentCard(1));
  indexPrev?.addEventListener("click", () =>
    scrollToAdjacentItem(productionIndex, ".production-index-item", -1),
  );
  indexNext?.addEventListener("click", () =>
    scrollToAdjacentItem(productionIndex, ".production-index-item", 1),
  );
  track?.addEventListener(
    "wheel",
    (event) => {
      const horizontalDelta = event.shiftKey
        ? event.deltaY
        : Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : 0;
      if (!horizontalDelta) return;
      event.preventDefault();
      if (wheelScrollLocked) return;
      wheelScrollLocked = true;
      scrollToAdjacentCard(Math.sign(horizontalDelta));
      setTimeout(() => {
        wheelScrollLocked = false;
      }, 750);
    },
    { passive: false },
  );
  track?.addEventListener("scroll", updateCarouselControls, { passive: true });
  productionIndex?.addEventListener("scroll", updateIndexControls, {
    passive: true,
  });
  if (productionIndex && "ResizeObserver" in window) {
    new ResizeObserver(updateIndexControls).observe(productionIndex);
  }
  window.addEventListener("load", updateIndexControls, { once: true });
  window.addEventListener("resize", () => {
    if (carouselAnimationFrame) {
      cancelAnimationFrame(carouselAnimationFrame);
      carouselAnimationFrame = 0;
      animatedCarousel?.style.removeProperty("scroll-snap-type");
      animatedCarousel = null;
    }
    requestAnimationFrame(updateCarouselControls);
    requestAnimationFrame(updateIndexControls);
  });
  updateCarouselControls();
  requestAnimationFrame(updateIndexControls);
})();
