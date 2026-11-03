(() => {
  const sitePrefix = window.location.pathname
    .split("/")
    .includes("productions")
    ? "../"
    : "";

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="minimum-width-screen" role="status" aria-live="polite">
          <img src="${sitePrefix}assets/images/logo-ap.png" alt="Logo Aurélien Petit"
            data-i18n-alt="header.logo">
          <p data-i18n="screen.minimumWidth">
            Veuillez agrandir la fenêtre, réduire le zoom ou changer d’appareil.
          </p>
        </div>
        <header class="site-header" id="top">
          <a class="brand" href="${sitePrefix}index.html" aria-label="Accueil" data-i18n-aria-label="header.home">
            <img src="${sitePrefix}assets/images/logo-ap.png" alt="Logo Aurélien Petit" data-i18n-alt="header.logo">
          </a>
          <nav class="nav-primary" aria-label="Navigation principale" data-i18n-aria-label="header.primaryNavigation">
            <a href="${sitePrefix}productions.html" data-i18n="nav.productions">Productions</a>
            <a href="${sitePrefix}store.html" data-i18n="nav.store">Store</a>
            <a class="mobile-nav-link" href="${sitePrefix}about.html" data-i18n="nav.about">About</a>
            <a class="mobile-nav-link" href="${sitePrefix}contact.html" data-i18n="nav.contact">Contact</a>
          </nav>
          <nav class="nav-secondary" aria-label="Informations" data-i18n-aria-label="header.infoNavigation">
            <a href="${sitePrefix}about.html" data-i18n="nav.about">About</a>
            <a href="${sitePrefix}contact.html" data-i18n="nav.contact">Contact</a>
            <button class="search-toggle" type="button" aria-label="Ouvrir la recherche"
              data-i18n-aria-label="search.open" aria-expanded="false" aria-controls="search-panel">
              <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.5"></circle>
                <path d="m16 16 4.3 4.3"></path>
              </svg>
            </button>
            <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false"
              aria-controls="nav-primary"><span></span><span></span></button>
          </nav>
        </header>
        <div class="search-backdrop" aria-hidden="true"></div>
        <section class="search-panel" id="search-panel" aria-hidden="true">
          <div class="search-panel-content">
            <form id="search-form" role="search" action="/search" method="get">
              <div class="search-input-row">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.5"></circle>
                  <path d="m16 16 4.3 4.3"></path>
                </svg>
                <input id="site-search" type="search" placeholder="Rechercher sur aurelienpetit.com"
                  name="q" aria-label="Rechercher sur aurelienpetit.com"
                  data-i18n-placeholder="search.placeholder" data-i18n-aria-label="search.inputLabel"
                  autocomplete="off">
                <button class="search-clear" id="search-clear" type="button"
                  aria-label="Effacer la recherche" data-i18n-aria-label="search.clear" hidden>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18"></path>
                  </svg>
                </button>
              </div>
            </form>
            <div class="search-results" aria-live="polite" aria-label="Suggestions de recherche"
              data-i18n-aria-label="search.suggestions"></div>
          </div>
        </section>
        <div class="toast" role="status" aria-live="polite"></div>
      `;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer">
          <a class="footer-brand" href="#top" aria-label="Retour en haut"
            data-i18n-aria-label="header.backToTop">
            <img src="${sitePrefix}assets/images/logo-ap.png" alt="Logo Aurélien Petit" data-i18n-alt="header.logo">
          </a>
          <p data-i18n="footer.copyright">Copyright © 2026 Aurélien Petit. Tous droits réservés.</p>
          <p data-i18n="footer.trademarks">Les marques de commerce, logos et droits d’auteur appartiennent à leurs
            propriétaires respectifs. Tous droits réservés.</p>
          <nav class="footer-links" aria-label="Informations légales et langue"
            data-i18n-aria-label="footer.navigation">
            <a href="${sitePrefix}../legal/privacy-policy.html" target="_blank" rel="noopener noreferrer"
              data-i18n="footer.privacy">Politique de confidentialité ↗</a>
            <a href="${sitePrefix}../legal/terms.html" target="_blank" rel="noopener noreferrer"
              data-i18n="footer.terms">Conditions générales ↗</a>
            <button type="button" id="language-toggle" data-i18n="language.toggle"
              data-i18n-aria-label="language.switchToEnglish">Changer de langue</button>
          </nav>
        </footer>
      `;
    }
  }

  class ProductionComments extends HTMLElement {
    connectedCallback() {
      const rows = window.productionReviewComments;
      if (!rows) throw new Error("Production review comments are not loaded.");
      const marquees = rows
        .map(
          (row) => `
            <div class="review-marquee" aria-hidden="true">
              <div class="review-marquee-track">
                ${Array.from(
                  { length: 4 },
                  () => `
                    <div class="review-marquee-group">
                      ${row.map((comment) => `<span>${comment}</span>`).join("")}
                    </div>
                  `,
                ).join("")}
              </div>
            </div>
          `,
        )
        .join("");

      this.innerHTML = `
        <section class="comments-section" aria-labelledby="comments-title">
          <div class="comments-heading">
            <h2 id="comments-title" data-i18n="productions.commentsTitle">Your comments are important.</h2>
            <a class="pill-button" href="mailto:contact@aurelienpetit.com?subject=Website%20feedback"
              data-i18n="quick.review">Leave a review online</a>
          </div>
          <div class="review-marquees" aria-label="Avis des visiteurs" data-i18n-aria-label="productions.reviews">
            ${marquees}
          </div>
        </section>
      `;
    }
  }

  class ProductionGallery extends HTMLElement {
    connectedCallback() {
      const images = [
        {
          name: this.dataset.imageOne,
          descriptionKey: this.dataset.descriptionOneKey,
        },
        {
          name: this.dataset.imageTwo,
          descriptionKey: this.dataset.descriptionTwoKey,
        },
        {
          name: this.dataset.imageThree,
          descriptionKey: this.dataset.descriptionThreeKey,
        },
      ].filter(({ name }) => name);
      const altKey = this.dataset.altKey;
      const cardMarkup = images
        .map(
          ({ name, descriptionKey }) => `
            <figure class="production-gallery-card">
              <img src="${sitePrefix}assets/images/${name}" alt=""
                ${altKey ? `data-i18n-alt="${altKey}"` : ""} loading="lazy">
              <figcaption data-i18n="${descriptionKey}"></figcaption>
            </figure>
          `,
        )
        .join("");

      this.innerHTML = `
        <section class="production-gallery page-width" aria-labelledby="production-gallery-title">
          <h2 id="production-gallery-title" data-i18n="${this.dataset.titleKey}"></h2>
          <div class="production-gallery-carousel">
            <div class="production-gallery-track">${cardMarkup}</div>
          </div>
          <div class="production-gallery-controls">
            <button type="button" class="production-gallery-prev" aria-label="Image précédente"
              data-i18n-aria-label="carousel.previous">‹</button>
            <button type="button" class="production-gallery-next" aria-label="Image suivante"
              data-i18n-aria-label="carousel.next">›</button>
          </div>
        </section>
      `;

      const carousel = this.querySelector(".production-gallery-track");
      const previous = this.querySelector(".production-gallery-prev");
      const next = this.querySelector(".production-gallery-next");
      const cards = [...carousel.querySelectorAll(".production-gallery-card")];
      const getCardScrollPosition = (index) => {
        const trackLeft =
          carousel.getBoundingClientRect().left + carousel.clientLeft;
        const cardLeft =
          cards[index].getBoundingClientRect().left -
          trackLeft +
          carousel.scrollLeft;
        const paddingLeft = Number.parseFloat(
          getComputedStyle(carousel).paddingLeft,
        );
        return Math.max(
          0,
          Math.min(
            carousel.scrollWidth - carousel.clientWidth,
            cardLeft - paddingLeft,
          ),
        );
      };
      const getCurrentIndex = () =>
        cards.reduce((nearestIndex, _, index) => {
          const nearestDistance = Math.abs(
            getCardScrollPosition(nearestIndex) - carousel.scrollLeft,
          );
          const currentDistance = Math.abs(
            getCardScrollPosition(index) - carousel.scrollLeft,
          );
          return currentDistance < nearestDistance ? index : nearestIndex;
        }, 0);
      const updateControls = () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentIndex = getCurrentIndex();
        previous.disabled = currentIndex === 0;
        next.disabled = currentIndex === cards.length - 1;
        this.querySelector(".production-gallery-controls").hidden =
          cards.length <= 1 || maxScroll <= 2;
      };
      const scrollToAdjacentCard = (direction) => {
        const currentIndex = getCurrentIndex();
        const targetIndex = Math.max(
          0,
          Math.min(cards.length - 1, currentIndex + direction),
        );
        const target = getCardScrollPosition(targetIndex);
        const behavior =
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          window.matchMedia("(max-width: 760px)").matches
            ? "auto"
            : "smooth";
        carousel.scrollTo({ left: target, behavior });
        if (behavior === "auto") updateControls();
      };

      previous.addEventListener("click", () => scrollToAdjacentCard(-1));
      next.addEventListener("click", () => scrollToAdjacentCard(1));
      carousel.addEventListener("scroll", updateControls, { passive: true });
      window.addEventListener("resize", updateControls);
      updateControls();
    }
  }

  class ProductionVideo extends HTMLElement {
    connectedCallback() {
      const video = this.dataset.src;
      const discoverUrl = this.dataset.discoverUrl;
      this.innerHTML = `
        <section class="production-video-section">
          <div class="page-width">
            <h2 data-i18n="${this.dataset.titleKey}"></h2>
            <p data-i18n="${this.dataset.descriptionKey}"></p>
            <div class="production-video-frame">
              <video muted loop playsinline preload="metadata">
                <source src="${sitePrefix}assets/videos/${video}" type="video/webm">
              </video>
              <div class="production-video-actions">
                <a class="production-video-discover" href="${discoverUrl}" target="_blank" rel="noreferrer">
                  <span data-i18n="productionVideo.discover">Discover the video</span>
                  <span aria-hidden="true">›</span>
                </a>
                <button type="button" class="production-video-toggle" aria-label="Pause video"
                  data-i18n-aria-label="productionVideo.pause" aria-pressed="false">
                  <span aria-hidden="true">Ⅱ</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      `;

      const player = this.querySelector("video");
      const toggle = this.querySelector(".production-video-toggle");
      const updateToggle = () => {
        const paused = player.paused;
        toggle.setAttribute("aria-pressed", String(paused));
        toggle.dataset.i18nAriaLabel = paused
          ? "productionVideo.play"
          : "productionVideo.pause";
        const translatedLabel = window.siteI18n?.translate(
          toggle.dataset.i18nAriaLabel,
        );
        toggle.setAttribute(
          "aria-label",
          translatedLabel ||
            (paused ? "Play video" : "Pause video"),
        );
        toggle.firstElementChild.textContent = paused ? "▶" : "Ⅱ";
      };

      toggle.addEventListener("click", () => {
        if (player.paused) {
          player.play().catch((error) => {
            console.error("The production video could not be played.", error);
            updateToggle();
          });
        } else {
          player.pause();
        }
      });
      player.addEventListener("play", updateToggle);
      player.addEventListener("pause", updateToggle);
      player.addEventListener("error", updateToggle);
      window.addEventListener("site-language-change", updateToggle);
      updateToggle();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        player.play().catch((error) => {
          console.error("The production video could not be played.", error);
        });
      }
    }
  }

  class ProductionVideoCarousel extends HTMLElement {
    connectedCallback() {
      const count = Number(this.dataset.count);
      if (!Number.isInteger(count) || count < 1) {
        throw new Error("Production video carousel requires a positive card count.");
      }
      const cardMarkup = Array.from({ length: count }, (_, index) => {
        const number = index + 1;
        return `
          <article class="production-video-card" data-video-index="${index}">
            <div class="production-video-card-screen">
              <video muted loop playsinline preload="auto"
                aria-labelledby="production-video-card-title-${number}">
                <source src="${sitePrefix}assets/videos/${this.dataset.srcPrefix}${number}.webm"
                  type="video/webm">
              </video>
              <button class="production-video-card-toggle" type="button" aria-pressed="false"
                aria-label="Lire la vidéo" data-i18n-aria-label="productionVideo.play">
                <span aria-hidden="true">▶</span>
              </button>
            </div>
            <div class="production-video-card-copy">
              <h3 id="production-video-card-title-${number}"
                data-i18n="${this.dataset.cardTitleKey}${number}"></h3>
              <p data-i18n="${this.dataset.cardDescriptionKey}${number}"></p>
            </div>
          </article>
        `;
      }).join("");

      this.innerHTML = `
        <section class="production-video-carousel-section" aria-labelledby="production-video-carousel-title">
          <div class="production-video-carousel-heading page-width">
            <div>
              <h2 id="production-video-carousel-title" data-i18n="${this.dataset.titleKey}"></h2>
              <p data-i18n="${this.dataset.descriptionKey}"></p>
            </div>
            <div class="journey-video-links">
              <a class="pill-button" href="https://www.youtube.com/" target="_blank"
                rel="noopener noreferrer">YouTube ↗</a>
              <a class="pill-button" href="https://www.instagram.com/ap.aurelienpetit/" target="_blank"
                rel="noopener noreferrer">Instagram ↗</a>
            </div>
          </div>
          <div class="production-video-carousel-track">
            ${cardMarkup}
            <div class="production-video-carousel-spacer" aria-hidden="true"></div>
          </div>
          <div class="production-video-carousel-controls page-width">
            <button class="production-video-carousel-prev" type="button" aria-label="Carte précédente"
              data-i18n-aria-label="carousel.previous" disabled>‹</button>
            <button class="production-video-carousel-next" type="button" aria-label="Carte suivante"
              data-i18n-aria-label="carousel.next">›</button>
          </div>
        </section>
      `;

      const track = this.querySelector(".production-video-carousel-track");
      const items = [...track.querySelectorAll(".production-video-card")];
      const spacer = this.querySelector(".production-video-carousel-spacer");
      const previous = this.querySelector(".production-video-carousel-prev");
      const next = this.querySelector(".production-video-carousel-next");
      let activeIndex = 0;
      let scrollFrame = 0;
      let programmaticScrollTimer = 0;

      const updateTrackEndPadding = () => {
        const lastCard = items[items.length - 1];
        const style = getComputedStyle(track);
        const minimumSpacer = Math.max(
          0,
          track.clientWidth -
            lastCard.clientWidth -
            Number.parseFloat(style.paddingLeft) -
            Number.parseFloat(style.paddingRight),
        );
        spacer.style.flexBasis = `${minimumSpacer}px`;
      };
      const updateControls = () => {
        previous.disabled = activeIndex === 0;
        next.disabled = activeIndex === items.length - 1;
      };
      const setActive = (index) => {
        const nextIndex = Math.max(0, Math.min(items.length - 1, index));
        if (nextIndex === activeIndex) return;
        items[activeIndex].querySelector("video").pause();
        activeIndex = nextIndex;
        items.forEach((item, itemIndex) => {
          item.classList.toggle("is-active", itemIndex === activeIndex);
        });
        updateControls();
        items[activeIndex]
          .querySelector("video")
          .play()
          .catch((error) => {
            console.error(
              "The active production video could not be played.",
              error,
            );
          });
      };
      const scrollToCard = (index) => {
        setActive(index);
        const left =
          items[activeIndex].offsetLeft -
          track.offsetLeft -
          Number.parseFloat(getComputedStyle(track).paddingLeft);
        window.clearTimeout(programmaticScrollTimer);
        programmaticScrollTimer = window.setTimeout(() => {
          programmaticScrollTimer = 0;
          updateActiveFromScroll();
        }, 120);
        track.scrollTo({
          left,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      };
      const updateActiveFromScroll = () => {
        if (programmaticScrollTimer) {
          window.clearTimeout(programmaticScrollTimer);
          programmaticScrollTimer = window.setTimeout(() => {
            programmaticScrollTimer = 0;
            updateActiveFromScroll();
          }, 120);
          return;
        }
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
          const trackLeft = track.getBoundingClientRect().left + track.clientLeft;
          const closestIndex = items.reduce((closest, item, index) => {
            const distance = Math.abs(item.getBoundingClientRect().left - trackLeft);
            const closestDistance = Math.abs(
              items[closest].getBoundingClientRect().left - trackLeft,
            );
            return distance < closestDistance ? index : closest;
          }, 0);
          setActive(closestIndex);
        });
      };

      items.forEach((item, index) => {
        const video = item.querySelector("video");
        const toggle = item.querySelector(".production-video-card-toggle");
        item.classList.toggle("is-active", index === activeIndex);

        toggle.addEventListener("click", () => {
          if (index !== activeIndex) return;
          if (video.paused) {
            video.play().catch((error) => {
              console.error("The production video could not be played.", error);
            });
          } else {
            video.pause();
          }
        });
        const updateToggle = () => {
          const playing = !video.paused;
          toggle.setAttribute("aria-pressed", String(playing));
          toggle.dataset.i18nAriaLabel = playing
            ? "productionVideo.pause"
            : "productionVideo.play";
          toggle.setAttribute(
            "aria-label",
            window.siteI18n?.translate(toggle.dataset.i18nAriaLabel) ||
              (playing ? "Pause video" : "Play video"),
          );
          toggle.firstElementChild.textContent = playing ? "Ⅱ" : "▶";
        };
        video.addEventListener("play", updateToggle);
        video.addEventListener("pause", updateToggle);
        video.addEventListener("error", updateToggle);
        video.addEventListener("loadeddata", () => {
          if (index !== activeIndex) video.pause();
        });
        window.addEventListener("site-language-change", updateToggle);
        updateToggle();
        video.load();
        video.play().catch((error) => {
          console.error("The production video preview could not be loaded.", error);
        });
      });
      previous.addEventListener("click", () => scrollToCard(activeIndex - 1));
      next.addEventListener("click", () => scrollToCard(activeIndex + 1));
      track.addEventListener("scroll", updateActiveFromScroll, { passive: true });
      window.addEventListener("resize", () => {
        updateTrackEndPadding();
        updateActiveFromScroll();
      });
      updateTrackEndPadding();
      updateControls();
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
  customElements.define("production-comments", ProductionComments);
  customElements.define("production-gallery", ProductionGallery);
  customElements.define("production-video", ProductionVideo);
  customElements.define("production-video-carousel", ProductionVideoCarousel);
})();
