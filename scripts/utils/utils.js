function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function sumLikes(items) {
  return items.reduce((total, item) => total + item.likes, 0);
}

export { getPhotographerIdFromUrl, sumLikes };
