import { getPhotographerData } from "../utils/api.js";
import { getPhotographerIdFromUrl, sumLikes } from "../utils/utils.js";
import { initLightbox } from "../components/lightbox.js";
import { mediaTemplate } from "../templates/media.js";
import { initContactModal } from "../components/contactModal.js";
import { photographerTemplate } from "../templates/photographer.js";

function displayPhotographHeader(photographer) {
  document.getElementById("photograph-header").innerHTML = photographer.createPhotographHeader();
}

function displayMediaList(mediaList) {
  const mediaSection = document.getElementById("media-section");

  mediaList.forEach((media) => {
    const mediaCard = mediaTemplate(media).getMediaCard();
    if (!mediaCard) return;
    mediaSection.appendChild(mediaCard);
  });
}

function displayPhotographLikeAndPrice(photographer) {
  document.getElementById("likes-price-section").innerHTML = photographer.createLikesAndPriceSection();
}

function updatePhotographNameInContactModal(name) {
  document.getElementById("contact-modal-photograph-name").textContent = name;
  document.getElementById("contact-modal-recipient").value = name;
}

async function displayPhotographer(photographerData) {
  const photographerProfil = photographerTemplate(photographerData.profil);
  displayPhotographHeader(photographerProfil);
  displayMediaList(photographerData.media);
  displayPhotographLikeAndPrice(photographerProfil);
  updatePhotographNameInContactModal(photographerData.profil.name);

  // Update Page Title
  document.title = `Fisheye - ${photographerData.profil.name}`;

  // Update Likes count
  document.getElementById("total-like-count").textContent = sumLikes(photographerData.media);

  // lightbox
  initLightbox();
  // contact modal
  initContactModal();
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
}

init();
