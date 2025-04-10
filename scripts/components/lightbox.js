import {
  displayPageOverlay,
  allowToCloseModalWithEscapeKey,
  keepFocusInElement,
  pageScrollBarIsActive,
  setAriaVisible,
} from "../utils/utils.js";

function initLightbox() {
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  const lightbox = document.getElementById("lightbox");
  const lightboxMedia = document.getElementById("lightbox-media");
  const lightboxText = document.getElementById("lightbox-text");
  const mediaLinks = document.querySelectorAll(".media-card__link");
  const mediaArray = Array.from(mediaLinks);
  let currentIndex = -1;

  // ==================== HTML for Image or Vidéo ====================

  function imageHTML(src, alt) {
    return `
      <img src="${src}" alt="${alt}" class="lightbox__image" />
    `;
  }

  function videoHTML(src, alt) {
    return `
      <video controls class="lightbox__video" aria-label="${alt}">
        <source src="${src}" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>
    `;
  }

  // ==================== Update LightBox Media ====================

  function updateLightboxMediaContent(mediaLink) {
    const mediaIsVideo = mediaLink.querySelector("video") !== null;
    const src = mediaLink.href;
    const alt = mediaLink.getAttribute("aria-label");

    if (mediaIsVideo) {
      lightboxMedia.innerHTML = videoHTML(src, alt);
    } else {
      lightboxMedia.innerHTML = imageHTML(src, alt);
    }
    lightboxText.textContent = mediaLink.getAttribute("aria-label");
  }

  // ==================== Get Current Media ====================

  function getNextMedia() {
    if (currentIndex < mediaArray.length - 1) {
      // move forward in the list of media
      currentIndex++;
    } else {
      // go back to the beginning of the list
      currentIndex = 0;
    }
    return mediaArray[currentIndex];
  }

  function getPreviousMedia() {
    if (currentIndex > 0) {
      //move backwards in the media list
      currentIndex--;
    } else {
      // go back to the end of the list
      currentIndex = mediaArray.length - 1;
    }
    return mediaArray[currentIndex];
  }

  // ==================== Open and Close LightBox ====================

  function displayLightBox(mediaLink) {
    displayPageOverlay(true);
    setAriaVisible([lightbox]);
    pageScrollBarIsActive(false);
    keepFocusInElement(lightbox);
    allowToCloseModalWithEscapeKey(lightbox, closeLightBox);
    updateLightboxMediaContent(mediaLink);
    lightbox.style.display = "flex";
    document.getElementById("lightbox-close").focus();
  }

  function closeLightBox() {
    lightbox.style.display = "none";
    displayPageOverlay(false);
    setAriaVisible([header, main]);
    pageScrollBarIsActive(true);
  }

  // ==================== Event Listeners ====================

  // Add Listener on all media to open Light box
  mediaLinks.forEach((mediaLink, index) => {
    mediaLink.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index;
      displayLightBox(mediaLink);
    });
  });

  // Previous media
  document.getElementById("lightbox-prev").addEventListener("click", () => {
    updateLightboxMediaContent(getPreviousMedia());
  });

  // Next media
  document.getElementById("lightbox-next").addEventListener("click", () => {
    updateLightboxMediaContent(getNextMedia());
  });

  // Close Light box
  document.getElementById("lightbox-close").addEventListener("click", () => {
    closeLightBox();
  });
}

export { initLightbox };
