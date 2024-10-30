const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

function changeLanguage(languageCode) {
    const texts = document.querySelectorAll('.text');
    texts.forEach(function (elem) {
        if (elem.classList.contains('lang-' + languageCode)) {
            elem.style.display = 'block'; // Afficher le texte dans la langue sélectionnée
        } else {
            elem.style.display = 'none'; // Cacher les autres textes
        }
    });
}

// select handler
const selector = document.getElementById('langSelector');
selector.addEventListener('change', function () {
    changeLanguage(this.value); // Appeler la fonction pour changer la langue
});

// détecter la langue de départ
const lang = navigator.userLanguage || navigator.language || 'en-EN';
const startLang = Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'en';
changeLanguage(startLang);

// mettre à jour le select avec la valeur de départ
selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang);













// Sélection des sections et de l'élément d'indicateur
const sections = document.querySelectorAll("section");
const scrollIndicator = document.querySelector(".scroll-indicator");
const indicatorContainer = document.querySelector(".indicator-container");
const indicatorBall = document.querySelector(".indicator-ball");

let isDragging = false; // État pour savoir si la boule est en cours de déplacement

// Fonction pour mettre à jour la position de l'indicateur
function updateIndicator() {
    const scrollTop = window.scrollY; // Position de défilement verticale
    const windowHeight = window.innerHeight; // Hauteur de la fenêtre
    const documentHeight = document.body.scrollHeight; // Hauteur totale du document

    // Calculer le ratio de défilement total
    const totalScrollableHeight = documentHeight - windowHeight; // Hauteur totale défilable
    const scrollRatio = scrollTop / totalScrollableHeight; // Ratio de défilement

    // Positionner l'indicateur proportionnellement dans le contenu défilable
    const indicatorPosition = scrollRatio * (scrollIndicator.offsetHeight); // Position de l'indicateur

    // Vérifier si on est tout en haut ou tout en bas
    if (scrollTop === 0) {
        indicatorContainer.style.transform = `translateY(0)`; // Indicateur en haut
    } else if (scrollTop + windowHeight >= documentHeight) {
        indicatorContainer.style.transform = `translateY(${scrollIndicator.offsetHeight}px)`; // Indicateur en bas
    } else {
        // Appliquer la position calculée à l'indicateur
        indicatorContainer.style.transform = `translateY(${indicatorPosition}px)`; // Appliquer la position de l'indicateur
    }

    // Mettre à jour le texte de l'indicateur avec la section active si elle existe
    let activeSection = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;

        // Calculer le pourcentage de visibilité de chaque section
        const visibleTop = Math.max(0, rect.top); // Position du haut visible de la section
        const visibleBottom = Math.min(windowHeight, rect.bottom); // Position du bas visible de la section
        const visibleHeight = visibleBottom - visibleTop; // Hauteur visible de la section
        const visibilityPercentage = (visibleHeight / sectionHeight) * 100; // Pourcentage de visibilité

        // Vérifier si la section est visible à au moins 20%
        if (visibilityPercentage >= 20) {
            activeSection = section; // Si oui, on marque cette section comme active
        }
    });

    // Mettre à jour le texte de l'indicateur
    if (activeSection) {
        indicatorContainer.querySelector('.indicator-label').textContent = activeSection.getAttribute("data-label");
    }

    // Vérifier si plus de 20% de la dernière section est visible
    const lastSection = sections[sections.length - 1];
    const lastSectionRect = lastSection.getBoundingClientRect();

    // Calculer combien de la dernière section est visible
    const lastSectionVisible = lastSectionRect.bottom; // Position du bas de la dernière section

    // Si moins de 20% de la dernière section est visible, masquer l'indicateur
    if (lastSectionVisible < windowHeight * 0.2) {
        scrollIndicator.classList.add('hidden'); // Masquer l'indicateur
    } else {
        scrollIndicator.classList.remove('hidden'); // Afficher l'indicateur
    }
}

// Événement de défilement pour mettre à jour la position de l'indicateur
window.addEventListener('scroll', updateIndicator);

// Initialiser l'indicateur à la première section si déjà visible
document.addEventListener('DOMContentLoaded', updateIndicator);

// Gestion des événements de glissement sur le conteneur
indicatorContainer.addEventListener('mousedown', (event) => {
    isDragging = true; // Activer le mode de glissement
    indicatorContainer.style.cursor = 'grabbing'; // Changer le curseur lors du glissement
    indicatorBall.classList.add('expanded'); // Agrandir la boule
    event.preventDefault(); // Empêcher la sélection de texte
});

// Événement pour suivre le mouvement de la souris
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const scrollIndicatorRect = scrollIndicator.getBoundingClientRect();
        const offsetY = event.clientY - scrollIndicatorRect.top; // Position Y de la souris dans la barre
        const percentage = offsetY / scrollIndicatorRect.height; // Pourcentage de la barre
        const scrollTop = percentage * (document.body.scrollHeight - window.innerHeight); // Calculer la position de défilement
        window.scrollTo(0, scrollTop); // Appliquer le défilement
    }
});

// Événement pour désactiver le glissement
document.addEventListener('mouseup', () => {
    isDragging = false; // Désactiver le mode de glissement
    indicatorContainer.style.cursor = 'grab'; // Rétablir le curseur
    indicatorBall.classList.remove('expanded'); // Rétablir la taille de la boule
});

// Initialiser l'indicateur au chargement
document.addEventListener('DOMContentLoaded', updateIndicator);