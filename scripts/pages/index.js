import { getPhotographerProfiles } from "../utils/api.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayPhotographers(photographers) {
  const photographersSection = document.getElementById("photographers_section");

  photographers.forEach((photographer) => {
    const photographerProfil = photographerTemplate(photographer);
    photographersSection.appendChild(photographerProfil.idCard());
  });
}

async function init() {
  const photographers = await getPhotographerProfiles();
  if (photographers) {
    displayPhotographers(photographers);
  } else {
    // TODO : replace alert with better UX/UI
    alert("Une erreur est survenue");
  }
}

init();
