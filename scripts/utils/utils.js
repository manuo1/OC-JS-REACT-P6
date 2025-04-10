function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function sumLikes(items) {
  return items.reduce((total, item) => total + item.likes, 0);
}
function pageScrollBarIsActive(active) {
  const value = active ? "" : "hidden";
  document.body.style.overflow = value;
}

// Prevent exit modal
function keepFocusInModal(modal) {
  const focusables = modal.querySelectorAll("button");
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  first.focus();
  document.addEventListener("keydown", (key) => {
    if (key.key !== "Tab") return;
    // Shift key returns the tab order
    if (key.shiftKey && document.activeElement === first) {
      key.preventDefault();
      last.focus();
    } else if (!key.shiftKey && document.activeElement === last) {
      key.preventDefault();
      first.focus();
    }
  });
}

function closeModalWithEscapeKey(modal, closeFunction) {
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFunction();
    }
  });
}

export { closeModalWithEscapeKey, getPhotographerIdFromUrl, keepFocusInModal, pageScrollBarIsActive, sumLikes };
