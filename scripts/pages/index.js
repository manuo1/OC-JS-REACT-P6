import { getPhotographers } from "../utils/api.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
  const photographersSection = document.getElementById("photographers_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const photographerCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(photographerCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  if (photographers) {
    displayData(photographers);
  } else {
    // TODO : replace alert with better UX/UI
    alert("Une erreur est survenue");
  }
}

init();
