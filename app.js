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

function changeLanguage(languageCode) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(function (elem) {
    const tag = elem.tagName.toLowerCase();
    if (elem.getAttribute("data-lang") === languageCode) {
      // display inline for span, block otherwise
      elem.style.display = tag === "span" ? "inline" : "block";
    } else {
      elem.style.display = "none";
    }
  });

  // Update toggleText buttons
  document
    .querySelectorAll(".description-container button.inline-button")
    .forEach((button) => {
      const container = button.closest(".description-container");
      const lang = languageCode;
      const moreText = container.querySelector(
        `.description[data-lang="${lang}"] .more-text`
      );

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
}

// select handler
const selector = document.getElementById("langSelector");
selector.addEventListener("change", function () {
  changeLanguage(this.value);
});

// détecter la langue de départ
const lang = navigator.userLanguage || navigator.language || "en-EN";
const startLang =
  Array.from(selector.options)
    .map((opt) => opt.value)
    .find((val) => lang.includes(val)) || "en";
changeLanguage(startLang);

// mettre à jour le select avec la valeur de départ
selector.selectedIndex = Array.from(selector.options)
  .map((opt) => opt.value)
  .indexOf(startLang);

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

      indicatorLabel.textContent = labelText;
      indicatorLabel.style.display = "block";
    }
  }

  const lastSection = sections[sections.length - 1];
  const lastSectionRect = lastSection.getBoundingClientRect();
  const lastSectionVisible = lastSectionRect.bottom;

  if (lastSectionVisible < windowHeight * 0.5) {
    scrollIndicator.classList.add("hidden");
  } else {
    scrollIndicator.classList.remove("hidden");
  }
}

function updateScrollNextArrow() {
  const scrollNextBtn = document.getElementById("scrollNextSection");
  if (!scrollNextBtn) return;

  const sections = document.querySelectorAll("section.scroll-parallax");
  const viewportHeight = window.innerHeight;
  const currentScroll = window.scrollY;
  const triggerPoint = currentScroll + viewportHeight * 0.75;

  const nextSection = Array.from(sections).find(
    (section) => section.offsetTop > triggerPoint
  );

  if (nextSection) {
    scrollNextBtn.style.display = "block";
  } else {
    scrollNextBtn.style.display = "none";
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
    // Si on affiche plus → montrer le texte et scroller en haut du texte supplémentaire
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

  document
    .querySelectorAll(".description-container button.inline-button")
    .forEach((button) => {
      const container = button.closest(".description-container");
      const descriptionEl = container.querySelector(
        `.description[data-lang="${lang}"]`
      );
      const moreText = descriptionEl
        ? descriptionEl.querySelector(".more-text")
        : null;

      if (moreText && moreText.classList.contains("hidden")) {
        button.textContent = lang === "en" ? "Show more" : "En voir plus";
      } else {
        button.textContent = lang === "en" ? "Show less" : "En voir moins";
      }
    });
});

let hasUserScrolled = false;

function handleParallaxScroll() {
  const elements = document.querySelectorAll(".scroll-parallax");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startTrigger = windowHeight * 0.95;

    if (rect.top < startTrigger && rect.bottom > 0) {
      if (!hasUserScrolled) return;

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
    // For English show "Curr. Vitae", for French show "CV"
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
    const triggerPoint = currentScroll + viewportHeight * 0.75; // 1/4 from bottom

    // Filter sections strictly below the triggerPoint
    const nextSection = Array.from(sections)
      .filter((section) => section.offsetTop > triggerPoint)
      .shift(); // pick the first one

    if (nextSection) {
      const targetScroll = nextSection.offsetTop - (viewportHeight * 2) / 3;
      window.scrollTo({
        top: targetScroll + 400,
        behavior: "smooth",
      });
    }
  });
}

// Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCloseBtn = document.getElementById("lightboxClose");

  if (!lightbox || !lightboxImg || !lightboxCloseBtn) return;

  // Function to disable scroll
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  // Function to enable scroll
  function enableScroll() {
    document.body.style.overflow = "";
  }

  // Open lightbox on image click
  document.querySelectorAll(".imagesouspost").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
      disableScroll();
    });
  });

  // Close on click of the close button
  lightboxCloseBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    enableScroll();
  });

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      enableScroll();
    }
  });
});

// Splash video on page load with smooth fade and scroll unlock at fade start
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const video = document.getElementById("splash-video");

  if (!splash || !video) return;

  // Disable scrolling
  document.body.style.overflow = "hidden";

  // Ensure initial opacity
  splash.style.opacity = "1";
  splash.style.transition = "opacity 0.2s ease";

  const hideSplash = () => {
    splash.style.opacity = "0";
    // Re-enable scrolling immediately as fade starts
    document.body.style.overflow = "";
    setTimeout(() => {
      splash.style.display = "none";
      document.body.classList.add("loaded");
    }, 200); // match the CSS transition duration
  };

  // When video ends
  video.addEventListener("ended", hideSplash);

  // Force hide after 3 seconds if video doesn't end naturally
  setTimeout(() => {
    if (splash.style.display !== "none") {
      video.pause();
      hideSplash();
    }
  }, 1300);

  // Ensure page is scrolled to top during splash
  window.scrollTo(0, 0);
});
