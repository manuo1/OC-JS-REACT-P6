function sumLikes(items) {
  return items.reduce((total, item) => total + item.likes, 0);
}

function countMediaLikedByUser() {
  return document.querySelectorAll('.media-card__like-button[data-liked="true"]').length;
}

function updateTotalLikes(photographerDataMedia) {
  const totalLikeCount = document.getElementById("total-like-count");
  const likesFromOtherUsers = sumLikes(photographerDataMedia);
  const likesFromUser = countMediaLikedByUser();
  totalLikeCount.textContent = likesFromOtherUsers + likesFromUser;
}

function initLikeManager(photographerDataMedia) {
  updateTotalLikes(photographerDataMedia);

  document.querySelectorAll(".media-card__like-button").forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      const likesContainer = likeButton.closest(".media-card__likes");
      const countSpan = likesContainer.querySelector(".media-card__likes-count");
      const currentCount = parseInt(countSpan.textContent, 10);
      const mediaIsLiked = likeButton.getAttribute("data-liked") === "true";
      const mediaTitle = likeButton.closest(".media-card").querySelector(".media-card__title").textContent;

      if (mediaIsLiked) {
        countSpan.textContent = currentCount - 1;
        likeButton.setAttribute("data-liked", "false");
        likeButton.setAttribute("aria-label", "Aimer " + mediaTitle);
      } else {
        countSpan.textContent = currentCount + 1;
        likeButton.setAttribute("data-liked", "true");
        likeButton.setAttribute("aria-label", "Ne plus aimer " + mediaTitle);
      }

      updateTotalLikes(photographerDataMedia);
    });
  });
}

export { initLikeManager };
