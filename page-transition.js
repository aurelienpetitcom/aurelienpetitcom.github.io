(() => {
  const storageKey = "site-page-transition";
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let navigationStarted = false;
  let entranceTimer;
  let productionHeroTimer;

  function startProductionHeroEntrance() {
    window.clearTimeout(productionHeroTimer);
    root.classList.remove("production-hero-entering");
    if (
      reducedMotion.matches
      || !/\/productions\/[^/]+\.html?$/i.test(window.location.pathname)
    ) return;
    void root.offsetWidth;
    root.classList.add("production-hero-entering");
    productionHeroTimer = window.setTimeout(
      () => root.classList.remove("production-hero-entering"),
      1400,
    );
  }

  function scheduleEntranceCleanup() {
    window.clearTimeout(entranceTimer);
    entranceTimer = window.setTimeout(
      () => root.classList.remove("page-transition-entering"),
      400,
    );
  }

  function startEntrance() {
    root.classList.remove("page-transition-entering");
    if (reducedMotion.matches) return;
    void root.offsetWidth;
    root.classList.add("page-transition-entering");
    scheduleEntranceCleanup();
  }

  function isHistoryNavigation() {
    const navigationType = window.performance.getEntriesByType?.("navigation")[0]?.type;
    return navigationType === "back_forward" || window.performance.navigation?.type === 2;
  }

  const shouldEnter = sessionStorage.getItem(storageKey) === "enter" || isHistoryNavigation();
  sessionStorage.removeItem(storageKey);

  if (shouldEnter) {
    if (reducedMotion.matches) {
      root.classList.remove("page-transition-entering");
    } else {
      root.classList.add("page-transition-entering");
      scheduleEntranceCleanup();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startProductionHeroEntrance, { once: true });
  } else {
    startProductionHeroEntrance();
  }

  window.addEventListener("pageshow", event => {
    if (!event.persisted) return;
    navigationStarted = false;
    document.body.classList.remove("page-transition-leaving");
    startEntrance();
    startProductionHeroEntrance();
  });
  document.addEventListener("click", event => {
    if (
      navigationStarted
      || event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || !(event.target instanceof Element)
    ) return;

    const link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || link.relList.contains("external")) return;
    if (link.target && link.target !== "_self") return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (
      destination.pathname === window.location.pathname
      && destination.search === window.location.search
    ) return;
    if (/\.[a-z\d]+$/i.test(destination.pathname) && !/\.html?$/i.test(destination.pathname)) return;

    event.preventDefault();
    navigationStarted = true;
    sessionStorage.setItem(storageKey, "enter");

    const transitionDuration = reducedMotion.matches ? 0 : 180;
    if (transitionDuration) document.body.classList.add("page-transition-leaving");
    window.setTimeout(() => window.location.assign(destination.href), transitionDuration);
  });
})();
