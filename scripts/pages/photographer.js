import { getPhotographerData } from "../services/api.js";
import { getPhotographerIdFromUrl } from "../utils/utils.js";
import { displayPhotographer } from "../services/photographer.js";

async function init() {
  const photographerId = getPhotographerIdFromUrl();

  try {
    if (!photographerId) {
      throw new Error("No photographer ID found in the URL.");
    }
    const photographerData = await getPhotographerData(photographerId);
    if (photographerData) {
      displayPhotographer(photographerData);
    } else {
      // TODO : replace alert with better UX/UI
      alert("Une erreur est survenue");
    }
  } catch (error) {
    console.error("Error loading photographer:", error);
  }
}

init();
