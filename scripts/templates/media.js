function mediaTemplate(data) {
  const { title = "Titre inconnu", image = null, video = null, likes = 0, photographerId = null, id = null } = data;

  const mediaPath = `assets/photographers/media/${photographerId}/${image || video}`;
  const imageType = "image";
  const videoType = "video";
  const mediaType = image ? imageType : video ? videoType : null;

  function getMediaCard() {
    if (!mediaType || !id) {
      console.warn("Invalide Media", data);
      return null;
    }

    const article = document.createElement("article");
    article.classList.add("media-card");

    article.innerHTML = `
        <a
        href="${mediaPath}"
        class="media-card__link"
        aria-label="${title}"
        data-id="${id}"
        data-media-type="${mediaType}"
        >
        </a>
        ${
          mediaType === imageType
            ? `<img src="${mediaPath}" alt="${title}" class="media-card__media" />`
            : `<video class="media-card__media" title="${title}" aria-label="${title}" tabindex="-1">
            <source src="${mediaPath}" type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>`
        }
        <div class="media-card__info">
          <h2 class="media-card__title">${title}</h2>
          <div class="media-card__likes">
            <span class="media-card__likes-count" aria-label="${likes} likes">${likes}</span>
            <button class="media-card__like-button" aria-label="Aimer ${title}" data-liked="false">
              &#10084;
            </button>
          </div>
        </div>
      `;

    return article;
  }

  return { getMediaCard };
}

export { mediaTemplate };
