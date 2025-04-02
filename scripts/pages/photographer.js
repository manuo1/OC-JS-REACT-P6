import { getPhotographerData } from "../utils/api.js";
import { getPhotographerIdFromUrl } from "../utils/utils.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

async function init() {
  const photographerId = getPhotographerIdFromUrl();

  try {
    if (!photographerId) {
      throw new Error("No photographer ID found in the URL.");
    }
    const photographerData = await getPhotographerData(photographerId);
    console.log(photographerData);
    document.title = `Fisheye - ${photographerData.info.name}`;
  } catch (error) {
    console.error("Error loading photographer:", error);
  }

  // modal display / close
  document.querySelector(".contact_button").addEventListener("click", displayModal);
  document.querySelector("#contact_modal img").addEventListener("click", closeModal);
}

init();
