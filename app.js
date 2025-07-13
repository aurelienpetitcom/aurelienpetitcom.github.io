const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

function changeLanguage(languageCode) {
  const texts = document.querySelectorAll(".text");
  texts.forEach(function (elem) {
    if (elem.classList.contains("lang-" + languageCode)) {
      elem.style.display = "block"; // Afficher le texte dans la langue sélectionnée
    } else {
      elem.style.display = "none"; // Cacher les autres textes
    }
  });
}

// select handler
const selector = document.getElementById("langSelector");
selector.addEventListener("change", function () {
  changeLanguage(this.value); // Appeler la fonction pour changer la langue
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

// Fonction pour mettre à jour la position de l'indicateur
function updateIndicator() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;

  // Calculer le ratio de défilement total
  const totalScrollableHeight = documentHeight - windowHeight;
  const scrollRatio = scrollTop / totalScrollableHeight;

  // Positionner l'indicateur proportionnellement dans le contenu défilable
  const indicatorPosition = scrollRatio * scrollIndicator.offsetHeight;

  if (scrollTop === 0) {
    indicatorContainer.style.transform = `translateY(0)`;
  } else if (scrollTop + windowHeight >= documentHeight) {
    indicatorContainer.style.transform = `translateY(${scrollIndicator.offsetHeight}px)`;
  } else {
    indicatorContainer.style.transform = `translateY(${indicatorPosition}px)`;
  }

  // Trouver la section active
  let activeSection = null;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(windowHeight, rect.bottom);
    const visibleHeight = visibleBottom - visibleTop;
    const visibilityPercentage = (visibleHeight / sectionHeight) * 100;

    if (visibilityPercentage >= 50) {
      activeSection = section;
    }
  });

  // Mettre à jour le texte de l'indicateur
  if (activeSection) {
    indicatorContainer.querySelector(".indicator-label").textContent =
      activeSection.getAttribute("data-label");
  }

  // Vérifier si moins de 20% de la dernière section est visible
  const lastSection = sections[sections.length - 1];
  const lastSectionRect = lastSection.getBoundingClientRect();
  const lastSectionVisible = lastSectionRect.bottom;

  if (lastSectionVisible < windowHeight * 0.5) {
    scrollIndicator.classList.add("hidden");
  } else {
    scrollIndicator.classList.remove("hidden");
  }
}

// Événement de défilement pour mettre à jour la position de l'indicateur
window.addEventListener("scroll", updateIndicator);

// Initialiser l'indicateur à la première section si déjà visible
document.addEventListener("DOMContentLoaded", updateIndicator);

// Gestion des événements de glissement sur le conteneur
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

// Initialiser l'indicateur au chargement
document.addEventListener("DOMContentLoaded", updateIndicator);

function toggleText(button) {
  const container = button.closest(".description-container");
  const moreText = container.querySelector(".more-text");

  moreText.classList.remove("hidden"); // Affiche le texte
  button.style.display = "none"; // Cache le bouton
}

let hasUserScrolled = false;

function handleParallaxScroll() {
  const elements = document.querySelectorAll(".scroll-parallax");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startTrigger = windowHeight * 0.95;

    if (rect.top < startTrigger && rect.bottom > 0) {
      // Pas d'effet tant que l'utilisateur n'a pas scrollé
      if (!hasUserScrolled) return;

      const distanceFromBottom = windowHeight - rect.top;
      const visibleRatio = Math.min(1, distanceFromBottom / windowHeight);

      const translateY = (1 - visibleRatio) * 40; // max 40px de décalage
      const scale = 0.95 + visibleRatio * 0.05; // de 0.97 à 1

      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }
  });
}

function activateParallaxOnFirstScroll() {
  hasUserScrolled = true;
  handleParallaxScroll(); // Appliquer directement après scroll
  window.removeEventListener("scroll", activateParallaxOnFirstScroll);
}

// Attache les événements
window.addEventListener("scroll", activateParallaxOnFirstScroll, {
  once: true,
});
window.addEventListener("scroll", handleParallaxScroll);
window.addEventListener("resize", handleParallaxScroll);
document.addEventListener("DOMContentLoaded", handleParallaxScroll);

function updateTxtBtnText() {
  const el = document.querySelector(".txt_btn_cv");
  if (!el) return;

  if (window.innerWidth < 600) {
    el.textContent = "Curr. Vitae";
  } else {
    el.textContent = "Curriculum Vitae";
  }
}

// Appel initial
updateTxtBtnText();

// Met à jour si on redimensionne la fenêtre
window.addEventListener("resize", updateTxtBtnText);
