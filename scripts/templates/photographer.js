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

  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  function getPhotographerCardDOM() {
    // ==================== Photographer article container ====================
    const article = document.createElement("article");
    article.classList.add("photographer");

    // -------------------- Photographer page link -------------------
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);
    link.classList.add("photographer__link");

    // -------------------- Photographer ID photo -------------------
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    img.classList.add("photographer__image");

    // -------------------- Photographer name -------------------
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographer__name");

    // -------------------- Build link -------------------
    link.appendChild(img);
    link.appendChild(h2);

    // -------------------- Photographer info container -------------------
    const infoSection = document.createElement("div");
    infoSection.classList.add("photographer__info");

    // -------------------- Photographer info location -------------------
    const location = document.createElement("p");
    location.classList.add("photographer__location");
    location.textContent = `${city}, ${country}`;

    // -------------------- Photographer info tagline -------------------
    const photographerTagline = document.createElement("p");
    photographerTagline.classList.add("photographer__tagline");
    photographerTagline.textContent = tagline;

    // -------------------- Photographer info price -------------------
    const pricePerDay = document.createElement("p");
    pricePerDay.classList.add("photographer__price");
    pricePerDay.textContent = `${price}€/jour`;

    // -------------------- Build info section -------------------
    infoSection.appendChild(location);
    infoSection.appendChild(photographerTagline);
    infoSection.appendChild(pricePerDay);

    // -------------------- Build article container -------------------
    article.appendChild(link);
    article.appendChild(infoSection);

    return article;
  }

  return { name, picture, getPhotographerCardDOM: getPhotographerCardDOM };
}

export { photographerTemplate };
