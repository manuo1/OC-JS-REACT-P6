function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

export { getPhotographerIdFromUrl };
