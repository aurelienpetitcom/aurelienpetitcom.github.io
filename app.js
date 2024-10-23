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
