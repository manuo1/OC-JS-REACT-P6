import { getPhotographerProfiles } from "../services/api.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayPhotographers(photographers) {
  // Cette fonction retourne un tableau de cartes (pas d'insertion dans le DOM)
  return photographers.map((photographer) => {
    const photographerProfil = photographerTemplate(photographer);
    return photographerProfil.createPhotographerCard();
  });
}

async function init() {
  const photographers = await getPhotographerProfiles();
  const photographersSection = document.getElementById("photographers_section");

  if (photographers) {
    const cards = await displayPhotographers(photographers);
    cards.forEach((card) => {
      photographersSection.appendChild(card);
    });
  } else {
    // TODO : replace alert with better UX/UI
    alert("Une erreur est survenue");
  }
}

init();
