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

export { getPhotographerIdFromUrl, pageScrollBarIsActive, sumLikes };
