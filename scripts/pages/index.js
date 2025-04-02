import { getPhotographers } from "../utils/api.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getPhotographerCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  if (photographers.length === 0) {
    // TODO : replace alert with better UX/UI
    alert("Aucun photographe trouvé. Veuillez réessayer plus tard.");
  } else {
    displayData(photographers);
  }
}

init();
