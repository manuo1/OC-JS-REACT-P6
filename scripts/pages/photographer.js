import { getPhotographerData } from "../utils/api.js";
import { getPhotographerIdFromUrl, sumLikes } from "../utils/utils.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayPhotographer(photographerData) {
  const photographer = photographerTemplate(photographerData.profil);
  // Add photograph header
  const photographHeader = document.getElementById("photograph-header");
  photographHeader.innerHTML = photographer.createPhotographHeader();
  // Add Media Gallery
  const media = photographerData.media;
  console.log(media);
  // Add total likes and price section
  const likesPriceSection = document.getElementById("likes-price-section");
  likesPriceSection.innerHTML = photographer.createLikesAndPriceSection();

  // Update Page Title
  document.title = `Fisheye - ${photographerData.profil.name}`;
  // Update Likes count
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
