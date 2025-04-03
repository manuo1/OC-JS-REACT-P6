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

  function idCard() {
    // ==================== Photographer card container ====================
    const photographCard = document.createElement("article");
    photographCard.classList.add("photographerIdCard");

    // -------------------- Photographer page link -------------------
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Voir le profil de ${name}`);
    link.classList.add("photographerIdCard__link");

    // -------------------- Photographer ID photo -------------------
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    img.classList.add("photographerIdCard__idPhoto");

    // -------------------- Photographer name -------------------
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographerIdCard__name");

    // -------------------- Build link -------------------
    link.appendChild(img);
    link.appendChild(h2);

    // -------------------- Photographer info container -------------------
    const infoSection = document.createElement("div");
    infoSection.classList.add("photographerIdCard__info");

    // -------------------- Photographer info location -------------------
    const location = document.createElement("p");
    location.classList.add("photographerIdCard__location");
    location.textContent = `${city}, ${country}`;

    // -------------------- Photographer info tagline -------------------
    const photographTagline = document.createElement("p");
    photographTagline.classList.add("photographerIdCard__tagline");
    photographTagline.textContent = tagline;

    // -------------------- Photographer info price -------------------
    const pricePerDay = document.createElement("p");
    pricePerDay.classList.add("photographerIdCard__price");
    pricePerDay.textContent = `${price}€/jour`;

    // -------------------- Build info section -------------------
    infoSection.appendChild(location);
    infoSection.appendChild(photographTagline);
    infoSection.appendChild(pricePerDay);

    // -------------------- Build article container -------------------
    photographCard.appendChild(link);
    photographCard.appendChild(infoSection);

    return photographCard;
  }

  function profilInfo() {
    // ==================== Photographer header section ====================
    const photographHeader = document.createElement("section");
    photographHeader.classList.add("photograph-header");

    // -------------------- Photographer profil container -------------------
    const photographProfil = document.createElement("div");
    photographProfil.classList.add("photograph-header__profil");
    // -------------------- Photographer name -------------------
    const h1 = document.createElement("h1");
    h1.textContent = name;
    h1.classList.add("photograph-header__name");
    // -------------------- Photographer info location -------------------
    const location = document.createElement("p");
    location.classList.add("photograph-header__location");
    location.textContent = `${city}, ${country}`;
    // -------------------- Photographer info tagline -------------------
    const photographTagline = document.createElement("p");
    photographTagline.classList.add("photograph-header__tagline");
    photographTagline.textContent = tagline;
    // -------------------- Build Photographer profil container -------------------
    photographProfil.appendChild(h1);
    photographProfil.appendChild(location);
    photographProfil.appendChild(photographTagline);
    // -------------------- contact Button -------------------
    const button = document.createElement("button");
    button.classList.add("photograph-header__contact_button");
    button.id = "contact_button";
    button.setAttribute("aria-haspopup", "dialog");
    button.textContent = "Contactez-moi";
    // -------------------- Photographer ID photo -------------------
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de ${name}`);
    img.classList.add("photograph-header__idPhoto");

    photographHeader.appendChild(photographProfil);
    photographHeader.appendChild(button);
    photographHeader.appendChild(img);

    return photographHeader;
  }

  return { idCard: idCard, profilInfo: profilInfo };
}

export { photographerTemplate };
