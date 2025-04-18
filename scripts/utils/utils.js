function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function pageScrollBarIsActive(active) {
  const value = active ? "" : "hidden";
  document.body.style.overflow = value;
}

// Prevent exit modal
function keepFocusInElement(element) {
  const focusables = element.querySelectorAll("button");
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

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

function allowToCloseWithEscapeKey(closeFunction) {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFunction();
    }
  });
}

function allowToCloseIfClicOutside(element, closeFunction) {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) {
      closeFunction();
    }
  });
}

function setAriaVisible(ariaVisibleElements) {
  const pageContainer = document.getElementById("page-container");
  const directChildren = Array.from(pageContainer.children);

  directChildren.forEach((element) => {
    if (ariaVisibleElements.includes(element)) {
      element.setAttribute("aria-hidden", "false");
    } else {
      element.setAttribute("aria-hidden", "true");
    }
  });
}

function displayPageOverlay(display) {
  const value = display ? "flex" : "none";
  document.getElementById("page-overlay").style.display = value;
}

function getNextIndex(currentIndex, maxIndex) {
  return currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
}

function getPreviousIndex(currentIndex, maxIndex) {
  return currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
}

function sortMediaArray(mediaArray, sortBy) {
  const sortedArray = [...mediaArray]; // don't change original array

  switch (sortBy) {
    case "title":
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "date":
      sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date)); // Latest Before
      break;
    case "popularity":
      sortedArray.sort((a, b) => b.likes - a.likes); // Max likes before
      break;
    default:
      console.warn(`Unknown sort type: ${sortBy}`);
  }

  return sortedArray;
}

function resetSection(section) {
  if (section) {
    section.innerHTML = "";
  }
}

export {
  allowToCloseWithEscapeKey,
  allowToCloseIfClicOutside,
  displayPageOverlay,
  getNextIndex,
  getPreviousIndex,
  getPhotographerIdFromUrl,
  keepFocusInElement,
  pageScrollBarIsActive,
  resetSection,
  setAriaVisible,
  sortMediaArray,
};
