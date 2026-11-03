(() => {
  const translations = {
    fr: {
      "site.title": "Aurélien Petit — Accueil",
      "site.description":
        "Portfolio d’Aurélien Petit — ingénieur industriel en électromécanique et créateur. Projets, productions et univers créatifs.",
      "header.home": "Accueil",
      "header.logo": "Logo Aurélien Petit",
      "header.primaryNavigation": "Navigation principale",
      "header.infoNavigation": "Informations",
      "header.backToTop": "Retour en haut",
      "screen.minimumWidth":
        "Veuillez agrandir la fenêtre, réduire le zoom ou changer d’appareil.",
      "nav.productions": "Productions",
      "nav.newswire": "Actualités",
      "nav.store": "Boutique",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      "menu.open": "Ouvrir le menu",
      "menu.close": "Fermer le menu",
      "search.open": "Ouvrir la recherche",
      "search.close": "Fermer la recherche",
      "search.placeholder": "Rechercher sur aurelienpetit.com",
      "search.inputLabel": "Rechercher sur aurelienpetit.com",
      "search.clear": "Effacer la recherche",
      "search.suggestions": "Suggestions de recherche",
      "intro.description":
        "Ingénieur industriel en électromécanique, je m’investis pleinement dans chaque projet avec l’ambition de dépasser les attentes et de repousser les limites. Mon objectif professionnel est d’allier expertise technique et créativité afin d’apporter une touche personnelle et une valeur ajoutée aux projets auxquels je contribue.",
      "featured.title": "Mis en avant.",
      "featured.description": "Le meilleur à découvrir dès maintenant.",
      "carousel.label": "Productions mises en avant",
      "carousel.previous": "Productions précédentes",
      "carousel.next": "Productions suivantes",
      "project.journey.aria": "Découvrir Journey to the Moon",
      "project.journey.title": "Journey to the Moon",
      "project.journey.alt": "Illustration du vaisseau Journey to the Moon",
      "project.journey.pageTitle": "Journey to the Moon — Aurélien Petit",
      "project.journey.releaseDate": "Sortie le 08.08.26",
      "project.journey.newswireMessage":
        "Découvrez les dernières actualités des productions sur la page Actualités",
      "project.journey.newswireLink": "En savoir plus ›",
      "project.journey.launchText":
        "Le canon s’incline, un grondement profond résonne, et la fusée est lancée à toute vitesse vers la Lune.",
      "project.journey.overview": "Overview",
      "project.journey.timelapse": "Timelapse",
      "project.journey.buy": "Buy",
      "project.journey.narrativeOne": "Embarquez pour un voyage",
      "project.journey.narrativeTwo": "à bord du vaisseau légendaire",
      "project.journey.narrativeThree": "en route vers la Lune",
      "project.journey.mainArtworkDescription":
        "Inspirée des dimensions et de l’esprit de l’attraction originale, cette œuvre est née d’un défi créatif : représenter le contraste entre l’intérieur et l’extérieur du bâtiment. Une simplification importante était nécessaire en raison de la richesse architecturale du lieu et de l’épaisseur des lignes.",
      "project.journey.dimensionsTitle": "One production. Two dimensions.",
      "project.journey.galleryTitle":
        "Quelle que soit la forme de votre journée.",
      "project.journey.galleryDescriptionOne":
        "Le canon s’incline, un grondement profond résonne, et la fusée est lancée à toute vitesse vers la Lune. Le voyage ne sera pas de tout repos : le retour s’annonce particulièrement mouvementé au milieu d’un dangereux nuage d’astéroïdes. Au fait, le port du chapeau est fortement déconseillé : certains l’ont appris à leurs dépens !",
      "project.journey.galleryDescriptionTwo":
        "Inspirée des dimensions et de l’esprit de l’attraction originale, cette œuvre est née d’un défi créatif : représenter le contraste entre l’intérieur et l’extérieur du bâtiment. Une simplification importante était nécessaire en raison de la richesse architecturale du lieu et de l’épaisseur des lignes.",
      "project.journey.videoTitle": "Découvrez le timelapse de la production.",
      "project.journey.videoDescription":
        "Découvrez le processus créatif derrière la création de Journey to the Moon. Inspiré par les dimensions et l’esprit de l’attraction originale, ce travail créatif raconte l’histoire d’un contraste entre l’intérieur et l’extérieur du bâtiment.",
      "project.journey.videoCardTitle1": "Vidéo 1",
      "project.journey.videoCardTitle2": "Vidéo 2",
      "project.journey.videoCardTitle3": "Vidéo 3",
      "project.journey.videoCardDescription1": "Description à venir.",
      "project.journey.videoCardDescription2": "Description à venir.",
      "project.journey.videoCardDescription3": "Description à venir.",
      "project.journey.description":
        "Embarquez à bord du légendaire vaisseau en route vers la Lune dans un style graphique unique, où les Okbots semblent déjà avoir pris leurs quartiers.",
      "project.castle.aria": "Découvrir Famous Castle",
      "project.castle.title": "Famous Castle",
      "project.castle.alt": "Illustration d’un château fantastique",
      "project.castle.pageTitle": "Famous Castle — Aurélien Petit",
      "project.castle.galleryTitle": "Le travail autour du château.",
      "project.castle.imageDescriptionOne":
        "Alors que le spectacle de drones bat son plein, les robots semblent avoir pris d’assaut le château et tentent sans relâche d’atteindre son sommet par tous les moyens. Mais que cherchent-ils vraiment à accomplir ?",
      "project.castle.imageDescriptionTwo":
        "Inspiré des dimensions originales, ce projet a été un véritable défi : simplifier la richesse des détails tout en préservant la géométrie et la profondeur, afin de proposer une vision simplifiée mais fidèle.",
      "project.castle.imageDescriptionThree":
        "L’objectif était de préserver l’identité et la cohérence graphique des créations.",
      "project.castle.description":
        "Découvrez un château réinventé dans un style graphique unique, où les Okbots semblent prêts à tout pour atteindre les sommets.",
      "project.mecalodon.title": "Mecalodon Aquatic Show",
      "project.mecalodon.description":
        "Cette illustration a été réalisée dans le cadre de mon mémoire intitulé « Conception et réalisation de fontaines interactives intégrées à l’aménagement de l’attraction « Mecalodon » à Walibi Belgium ».",
      "project.electronicBrain.title": "The Electronic Brain",
      "project.electronicBrain.description":
        "Découvrez une représentation graphique unique du cerveau et de sa structure, accompagnée des Okbots. Ils travaillent sans relâche pour assurer le bon fonctionnement de chacune de ses parties.",
      "project.iss.title": "The ISS",
      "project.iss.description":
        "Découvrez la Station spatiale internationale, désormais sous le contrôle des Okbots… qui, apparemment, n’ont pas tous suivi la formation adéquate.",
      "project.giftAgency.title": "The Gift Agency",
      "project.giftAgency.description":
        "Découvrez l’agence de distribution de cadeaux dans un style graphique unique, aux côtés des Okbots. L’heure de la livraison est enfin arrivée.",
      "project.whiteHouseRun.title": "White House Run",
      "project.whiteHouseRun.description":
        "La course à la Maison-Blanche est lancée. Qui réussira à prendre le drapeau américain en premier ? Une chose est sûre : le gagnant sera le plus rapide.",
      "project.yinYang.title": "Yin Yang",
      "project.yinYang.description":
        "La toute première création de la série « The Okbots » est arrivée. Sortie le 10 juin 2020, elle représente le symbole emblématique du Yin Yang sous un nouveau jour, avec l’apparition d’une ville pleine de vie.",
      "project.detailsComingSoon": "Description à venir.",
      "productions.metaDescription":
        "Découvrez les productions d’Aurélien Petit, classées par année.",
      "productions.pageTitle": "Productions — Aurélien Petit",
      "productions.title": "Productions",
      "productions.indexLabel": "Accès aux productions",
      "productions.exploreByYear": "Explorer par année",
      "productions.filterByYear": "Filtrer par année",
      "productions.yearProjects": "Productions de l’année",
      "productions.commentsTitle": "Vos commentaires sont importants.",
      "productions.reviews": "Avis des visiteurs",
      "productions.reviewOne": "Une œuvre inventive et créative",
      "productions.reviewTwo": "Incroyable ! C’est vraiment génial !",
      "productions.reviewThree":
        "Excellent ! C’est super, vraiment très réussi !",
      "productions.reviewFour": "Continuez ! C’est tellement beau !",
      "productions.reviewFive": "Yin Yang ! C’est excellent !",
      "productionVideo.discover": "Découvrir la vidéo",
      "productionVideo.play": "Lire la vidéo",
      "productionVideo.pause": "Mettre la vidéo en pause",
      "quick.title": "Liens rapides.",
      "quick.description": "Trouvez ce que vous cherchez.",
      "quick.about": "À propos",
      "quick.review": "Laisser un avis",
      "social.title": "Restez informé",
      "okbots.description":
        "Okbots Expedition est un jeu de plateforme narratif en cours de développement sous Unreal Engine 5. Vous incarnez un personnage chargé d’infiltrer la civilisation des Okbots — des robots intelligents créés par l’humanité et envoyés explorer un autre système solaire potentiellement habitable — afin de les empêcher de surpasser l’humanité.",
      "okbots.learnMore": "En savoir plus",
      "footer.copyright":
        "Copyright © 2026 Aurélien Petit. Tous droits réservés.",
      "footer.trademarks":
        "Les marques de commerce, logos et droits d’auteur appartiennent à leurs propriétaires respectifs. Tous droits réservés.",
      "footer.navigation": "Informations légales et langue",
      "footer.privacy": "Politique de confidentialité ↗",
      "footer.terms": "Conditions générales ↗",
      "language.toggle": "Changer de langue",
      "language.switchToEnglish": "Passer le site en anglais",
      "language.switchToFrench": "Passer le site en français",
      "search.suggestionsHeading": "Suggestions",
      "search.quickLinks": "Liens rapides",
      "search.empty": "Entrez un terme à rechercher.",
      "project.pageComingSoon":
        "La page « {title} » pourra être créée séparément.",
    },
    en: {
      "site.title": "Aurélien Petit — Home",
      "site.description":
        "The portfolio of Aurélien Petit — industrial electromechanical engineer and creator. Projects, productions, and creative worlds.",
      "header.home": "Home",
      "header.logo": "Aurélien Petit logo",
      "header.primaryNavigation": "Main navigation",
      "header.infoNavigation": "Information",
      "header.backToTop": "Back to top",
      "screen.minimumWidth":
        "Please enlarge the window, zoom out, or switch to another device.",
      "nav.productions": "Productions",
      "nav.newswire": "Newswire",
      "nav.store": "Store",
      "nav.about": "About",
      "nav.contact": "Contact",
      "menu.open": "Open menu",
      "menu.close": "Close menu",
      "search.open": "Open search",
      "search.close": "Close search",
      "search.placeholder": "Search aurelienpetit.com",
      "search.inputLabel": "Search aurelienpetit.com",
      "search.clear": "Clear search",
      "search.suggestions": "Search suggestions",
      "intro.description":
        "As an Industrial Engineer in Electromechanics, I fully invest myself in every project with the ambition to exceed expectations and push boundaries. My professional goal is to combine technical expertise and creativity to bring a personal touch and added value to the projects I contribute to.",
      "featured.title": "Featured.",
      "featured.description": "The best to discover right now.",
      "carousel.label": "Featured productions",
      "carousel.previous": "Previous productions",
      "carousel.next": "Next productions",
      "project.journey.aria": "Discover Journey to the Moon",
      "project.journey.title": "Journey to the Moon",
      "project.journey.alt":
        "Illustration of the Journey to the Moon spaceship",
      "project.journey.pageTitle": "Journey to the Moon — Aurélien Petit",
      "project.journey.releaseDate": "Released on 08.08.26",
      "project.journey.newswireMessage":
        "Discover the latest news about productions through the Newswire page",
      "project.journey.newswireLink": "Learn more ›",
      "project.journey.launchText":
        "The cannon tilts, a deep roar echoes, and the rocket is launched at full speed towards the Moon.",
      "project.journey.overview": "Overview",
      "project.journey.timelapse": "Timelapse",
      "project.journey.buy": "Buy",
      "project.journey.narrativeOne": "Embark on a journey",
      "project.journey.narrativeTwo": "aboard the legendary spaceship",
      "project.journey.narrativeThree": "bound for the Moon",
      "project.journey.mainArtworkDescription":
        "Inspired by the dimensions and spirit of the original attraction, this artwork was born from a creative challenge: depicting the contrast between the building's interior and exterior. Significant simplification was required due to the architectural richness of the venue and the thickness of the lines.",
      "project.journey.dimensionsTitle": "One production. Two dimensions.",
      "project.journey.galleryTitle": "Whatever shape your day takes.",
      "project.journey.galleryDescriptionOne":
        "The cannon tilts, a deep roar echoes, and the rocket is launched at full speed towards the Moon. The trip won't be a walk in the park, as the return journey promises to be particularly bumpy amidst a dangerous asteroid cloud. By the way, wearing hats is strongly discouraged: some had to learn that the hard way!",
      "project.journey.galleryDescriptionTwo":
        "Inspired by the dimensions and spirit of the original attraction, this artwork was born from a creative challenge: depicting the contrast between the building's interior and exterior. Significant simplification was required due to the architectural richness of the venue and the thickness of the lines.",
      "project.journey.videoTitle": "Discover the timelapse of the production.",
      "project.journey.videoDescription":
        "Discover the creative process behind the creation Journey to the Moon. Inspired by the dimensions and spirit of the original attraction, this artwork was born from a creative challenge depicting the contrast between the building's interior and exterior.",
      "project.journey.videoCardTitle1": "Video 1",
      "project.journey.videoCardTitle2": "Video 2",
      "project.journey.videoCardTitle3": "Video 3",
      "project.journey.videoCardDescription1":
        "The cannon tilts, a deep roar echoes, and the rocket is launched at full speed towards the Moon. ",
      "project.journey.videoCardDescription2":
        "The trip won't be a walk in the park, as the return journey promises to be particularly bumpy amidst a dangerous asteroid cloud.",
      "project.journey.videoCardDescription3":
        "By the way, wearing hats is strongly discouraged: some had to learn that the hard way!",
      "project.journey.description":
        "Embark on a journey aboard the legendary spaceship bound for the Moon in a unique graphic style, where the Okbots already seem to have taken over the place.",
      "project.castle.aria": "Discover Famous Castle",
      "project.castle.title": "Famous Castle",
      "project.castle.alt": "Illustration of a fantasy castle",
      "project.castle.pageTitle": "Famous Castle — Aurélien Petit",
      "project.castle.galleryTitle": "The work behind the castle.",
      "project.castle.imageDescriptionOne":
        "While the drone show is in full swing, the robots appear to have taken over the castle, relentlessly trying to climb to the summit by any means necessary. But what are they really trying to achieve?",
      "project.castle.imageDescriptionTwo":
        "Inspired by the original dimensions, this project was a real challenge: simplifying the wealth of details while preserving the geometry and depth, in order to deliver a simplified yet faithful vision.",
      "project.castle.imageDescriptionThree":
        "The goal was to maintain the identity and design consistency of the creations.",
      "project.castle.description":
        "Discover a reimagined castle in a unique graphic style, where the Okbots seem willing to do anything to reach the very top.",
      "project.mecalodon.title": "Mecalodon Aquatic Show",
      "project.mecalodon.description":
        "This illustration was created as part of my thesis entitled “Design and implementation of interactive fountains integrated into the layout of the ‘Mecalodon’ attraction at Walibi Belgium”.",
      "project.electronicBrain.title": "The Electronic Brain",
      "project.electronicBrain.description":
        "Discover a unique graphic representation of the brain and its structure, accompanied by the Okbots. Tirelessly, they work to ensure the proper functioning of each of its parts.",
      "project.iss.title": "The ISS",
      "project.iss.description":
        "Discover the International Space Station, now under the control of the Okbots… who, apparently, have not all completed the proper training.",
      "project.giftAgency.title": "The Gift Agency",
      "project.giftAgency.description":
        "Discover the gift distribution agency in a unique graphic style, alongside the Okbots. The delivery time has finally arrived.",
      "project.whiteHouseRun.title": "White House Run",
      "project.whiteHouseRun.description":
        "That’s it, the race at the White House is launched. Who will manage to take the American flag first? What is certain is that the winner will be the fastest.",
      "project.yinYang.title": "Yin Yang",
      "project.yinYang.description":
        "The very first creation of the series “The Okbots” is here. Released on June 10, 2020, it represents the emblematic symbol of Yin Yang under a new perspective with the appearance of a city full of life.",
      "project.detailsComingSoon": "Description coming soon.",
      "productions.metaDescription":
        "Explore Aurélien Petit’s productions, organized by year.",
      "productions.pageTitle": "Productions — Aurélien Petit",
      "productions.title": "Productions",
      "productions.indexLabel": "Browse productions",
      "productions.exploreByYear": "Explore by year",
      "productions.filterByYear": "Filter by year",
      "productions.yearProjects": "Productions from this year",
      "productions.commentsTitle": "Your comments are important.",
      "productions.reviews": "Visitor comments",
      "productions.reviewOne":
        "Such an inventive and creative piece of artwork",
      "productions.reviewTwo": "Amazing! This is so cool!",
      "productions.reviewThree": "Excellent! That's great. Really cool!",
      "productions.reviewFour": "Keep going! Whoahhh so nice!",
      "productions.reviewFive": "Yin Yang! This is excellent!",
      "productionVideo.discover": "Discover the video",
      "productionVideo.play": "Play video",
      "productionVideo.pause": "Pause video",
      "quick.title": "Quick links.",
      "quick.description": "Find what you're looking for.",
      "quick.about": "About me",
      "quick.review": "Leave a review online",
      "social.title": "Stay informed",
      "okbots.description":
        "Okbots Expedition is a narrative platformer currently in development on Unreal Engine 5. You play as a character tasked with infiltrating the civilization of the Okbots — intelligent robots created by humans and sent to explore another potentially habitable solar system — to prevent them from surpassing humanity.",
      "okbots.learnMore": "Learn more",
      "footer.copyright":
        "Copyright © 2026 Aurélien Petit. All rights reserved.",
      "footer.trademarks":
        "Trademarks, logos, and copyrights are the property of their respective owners. All rights reserved.",
      "footer.navigation": "Legal information and language",
      "footer.privacy": "Privacy policy ↗",
      "footer.terms": "Terms and conditions ↗",
      "language.toggle": "Change language",
      "language.switchToEnglish": "Switch the site to English",
      "language.switchToFrench": "Switch the site to French",
      "search.suggestionsHeading": "Suggestions",
      "search.quickLinks": "Quick links",
      "search.empty": "Enter a search term.",
      "project.pageComingSoon": 'The "{title}" page can be created separately.',
    },
  };

  const storageKey = "aurelien-home-language";
  let locale =
    localStorage.getItem(storageKey) || document.documentElement.lang;
  if (!Object.hasOwn(translations, locale)) locale = "fr";

  function translate(key, values = {}) {
    let text = translations[locale][key] ?? key;
    Object.entries(values).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, value);
    });
    return text;
  }

  function applyTranslations() {
    document.documentElement.lang = locale;
    const languageToggle = document.querySelector("#language-toggle");
    if (languageToggle) {
      languageToggle.dataset.i18nAriaLabel =
        locale === "fr"
          ? "language.switchToEnglish"
          : "language.switchToFrench";
    }
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute(
        "aria-label",
        translate(element.dataset.i18nAriaLabel),
      );
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute(
        "placeholder",
        translate(element.dataset.i18nPlaceholder),
      );
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      element.setAttribute("alt", translate(element.dataset.i18nAlt));
    });
    document.querySelectorAll("[data-i18n-content]").forEach((element) => {
      element.setAttribute("content", translate(element.dataset.i18nContent));
    });
  }

  function setLocale(nextLocale) {
    if (!Object.hasOwn(translations, nextLocale)) {
      throw new RangeError(`Unsupported language: ${nextLocale}`);
    }
    locale = nextLocale;
    localStorage.setItem(storageKey, locale);
    applyTranslations();
    window.dispatchEvent(
      new CustomEvent("site-language-change", { detail: { locale } }),
    );
  }

  window.siteI18n = {
    translate,
    getLocale: () => locale,
    setLocale,
    toggleLocale: () => setLocale(locale === "fr" ? "en" : "fr"),
  };

  applyTranslations();
})();
