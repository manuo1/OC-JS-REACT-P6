import { getPhotographerData } from "../utils/api.js";
import { getPhotographerIdFromUrl, sumLikes } from "../utils/utils.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayPhotographer(photographerData) {
  const main = document.getElementById("main");

  //Profil section
  const photographerProfil = photographerTemplate(photographerData.profil);
  main.appendChild(photographerProfil.profilInfo());
  // Media Gallery
  const media = photographerData.media;
  console.log(media);
  // Page Title
  document.title = `Fisheye - ${photographerData.profil.name}`;
  // Price
  const priceElement = document.getElementById("likes-price-box-price");
  priceElement.textContent = `${photographerData.profil.price}€/jour`;
  // Likes
  const totalLikeCount = document.getElementById("total-like-count");
  totalLikeCount.textContent = sumLikes(photographerData.media);
}

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

  // modal display / close
  document.getElementById("contact_button").addEventListener("click", displayModal);
  document.getElementById("close-icon").addEventListener("click", closeModal);
}

init();
