import { getPhotographerData } from "../utils/api.js";
import { getPhotographerIdFromUrl, sumLikes } from "../utils/utils.js";
import { openModal, closeModal } from "../utils/contactForm.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";

function displayMediaList(mediaList) {
  const mediaSection = document.getElementById("media-section");

  mediaList.forEach((media) => {
    const mediaCard = mediaTemplate(media).getMediaCard();
    if (!mediaCard) return;
    mediaSection.appendChild(mediaCard);
  });
}

async function displayPhotographer(photographerData) {
  const photographer = photographerTemplate(photographerData.profil);
  // Add photograph header
  const photographHeader = document.getElementById("photograph-header");
  photographHeader.innerHTML = photographer.createPhotographHeader();
  // Add Media Gallery
  displayMediaList(photographerData.media);
  // Add total likes and price section
  const likesPriceSection = document.getElementById("likes-price-section");
  likesPriceSection.innerHTML = photographer.createLikesAndPriceSection();

  // Update Contact modal photograph name
  const modalPhotographName = document.getElementById("modal-photograph-name");
  const modalRecipient = document.getElementById("modal-recipient");
  modalPhotographName.textContent = photographerData.profil.name;
  modalRecipient.value = photographerData.profil.name;

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
  document.getElementById("contact_button").addEventListener("click", openModal);
  document.getElementById("modal-close-icon").addEventListener("click", closeModal);
}

init();
