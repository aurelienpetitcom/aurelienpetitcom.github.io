const ASSET_CACHE = "aurelien-assets-v2"; // Increment when replacing assets at existing paths.
const ASSETS = [
  "./assets/fichiers/about/cv_aurelien_petit_06_10_26_en.pdf",
  "./assets/fichiers/about/cv_aurelien_petit_06_10_26_fr.pdf",
  "./assets/fonts/SF-Pro-Display-Light.otf",
  "./assets/fonts/SF-Pro-Display-Regular.otf",
  "./assets/fonts/SF-Pro-Display-Semibold.otf",
  "./assets/images/about/cv_aurelien_petit_06_10_26_en.png",
  "./assets/images/about/cv_aurelien_petit_06_10_26_fr.png",
  "./assets/images/famous-castle/famous-castle-1.png",
  "./assets/images/famous-castle/famous-castle-2.png",
  "./assets/images/famous-castle/famous-castle-2a.png",
  "./assets/images/famous-castle/famous-castle-2b.png",
  "./assets/images/famous-castle/famous-castle-2c.png",
  "./assets/images/famous-castle/famous-castle-3.png",
  "./assets/images/famous-castle/famous-castle-logo.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-1.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-2.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-2a.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-2b.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-2c.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-3.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-3a.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-3b.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-4.png",
  "./assets/images/journey-to-the-moon/journey-to-the-moon-logo.png",
  "./assets/images/logo-ap.png",
  "./assets/images/logoshare.png",
  "./assets/images/mecalodon-aquatic-show/mecalodon-aquatic-show-1.png",
  "./assets/images/mecalodon-aquatic-show/mecalodon-aquatic-show-logo.png",
  "./assets/images/the-electronic-brain/the-electronic-brain-1.png",
  "./assets/images/the-electronic-brain/the-electronic-brain-logo.png",
  "./assets/images/the-gift-agency/the-gift-agency-1.png",
  "./assets/images/the-gift-agency/the-gift-agency-logo.png",
  "./assets/images/the-iss/the-iss-1.png",
  "./assets/images/the-iss/the-iss-logo.png",
  "./assets/images/white-house-run/white-house-run-1.png",
  "./assets/images/white-house-run/white-house-run-logo.png",
  "./assets/images/yin-yang/yin-yang-1.png",
  "./assets/images/yin-yang/yin-yang-logo.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(ASSET_CACHE).then(cache => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith("aurelien-assets-") && cacheName !== ASSET_CACHE)
          .map(cacheName => caches.delete(cacheName)),
      )),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);
  const assetsPath = new URL("assets/", self.registration.scope).pathname;
  if (
    event.request.method !== "GET"
    || requestUrl.origin !== self.location.origin
    || !requestUrl.pathname.startsWith(assetsPath)
  ) return;

  event.respondWith(
    caches.open(ASSET_CACHE).then(async cache => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;

      const response = await fetch(event.request);
      if (response.ok) await cache.put(event.request, response.clone());
      return response;
    }),
  );
});
