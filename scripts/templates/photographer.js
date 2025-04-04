function photographerTemplate(data) {
  const {
    name = "Nom inconnu",
    portrait = "default.png",
    city = "Ville inconnue",
    country = "Pays inconnu",
    tagline = "Pas de description",
    price = 0,
    id,
  } = data;

  const picture = `assets/photographers/id-photos-min/${portrait}`;

  function createPhotographerCard() {
    const article = document.createElement("article");
    article.classList.add("photographerIdCard");

    article.innerHTML = `
      <a href="photographer.html?id=${id}" aria-label="Voir le profil de ${name}" class="photographerIdCard__link">
        <img src="${picture}" alt="Photo de ${name}" class="photographerIdCard__idPhoto" />
        <h2 class="photographerIdCard__name">${name}</h2>
      </a>
      <div class="photographerIdCard__info">
        <p class="photographerIdCard__location">${city}, ${country}</p>
        <p class="photographerIdCard__tagline">${tagline}</p>
        <p class="photographerIdCard__price">${price}€/jour</p>
      </div>
    `;

    return article;
  }

  function createPhotographHeader() {
    return `
      <div class="photograph-header__profil">
        <h1 class="photograph-header__name">${name}</h1>
        <p class="photograph-header__location">${city}, ${country}</p>
        <p class="photograph-header__tagline">${tagline}</p>
      </div>
      <button class="photograph-header__contact_button" id="contact_button" aria-haspopup="dialog">Contactez-moi</button>
      <img src="${picture}" alt="Photo de ${name}" class="photograph-header__idPhoto" />
    `;
  }

  function createLikesAndPriceSection() {
    return `
        <span class="likes-price-section__total-likes">
          <span id="total-like-count" aria-live="polite"></span>
          &#10084;
        </span>
        <span class="likes-price-section__price" id="likes-price-section-price">${price}€/jour</span>
    `;
  }

  return { createPhotographerCard, createPhotographHeader, createLikesAndPriceSection };
}

export { photographerTemplate };
