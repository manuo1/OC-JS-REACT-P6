import { sortMediaArray, resetSection } from "../utils/utils.js";
import { mediaTemplate } from "../templates/media.js";
import { initLikeManager } from "../services/likeManager.js";
import { initLightbox } from "../components/lightbox.js";
import { initContactModal } from "../components/contactModal.js";
import { initSortDropdown } from "../components/sortDropdown.js";
import { photographerTemplate } from "../templates/photographer.js";

let mediaArray = [];

async function displayPhotographer(photographerData) {
  const photographerProfil = photographerTemplate(photographerData.profil);
  mediaArray = photographerData.media;
  displayPhotographHeader(photographerProfil);
  displayMediaList();
  displayPhotographLikeAndPrice(photographerProfil);
  updatePhotographNameInContactModal(photographerData.profil.name);
  initSortDropdown();
  initLikeManager(mediaArray);
  initLightbox();
  initContactModal();
  // Update Page Title
  document.title = `Fisheye - ${photographerData.profil.name}`;
}

function displayPhotographHeader(photographer) {
  document.getElementById("photograph-header").innerHTML = photographer.createPhotographHeader();
}

function displayMediaList() {
  const mediaSection = document.getElementById("media-section");
  resetSection(mediaSection);
  const sortBy = document.getElementById("sort-button").getAttribute("data-value");
  const sortedMediaList = sortMediaArray(mediaArray, sortBy);
  sortedMediaList.forEach((media) => {
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

function updateMediaListDisplay() {
  displayMediaList();
  initLightbox();
  initLikeManager(mediaArray);
}

export { displayPhotographer, updateMediaListDisplay };
