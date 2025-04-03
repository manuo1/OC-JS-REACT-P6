const PHOTOGRAPHERS_API_URL = "data/photographers.json";

async function fetchPhotographersData() {
  const response = await fetch(PHOTOGRAPHERS_API_URL);

  if (!response.ok) {
    throw new Error(`HTTP error : ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function getPhotographerProfiles() {
  try {
    const data = await fetchPhotographersData();

    if (!data || !data.photographers) {
      throw new Error("Invalid data format");
    }
    return data.photographers;
  } catch (error) {
    console.error("Unable to get photographers data :", error);
    return null;
  }
}

async function getPhotographerData(id) {
  try {
    const data = await fetchPhotographersData();

    if (!data || !data.photographers || !data.media) {
      throw new Error("Invalid data format");
    }

    const selectedPhotographerProfil = data.photographers.find((photographer) => photographer.id === id) || null;
    const selectedPhotographerMedia = data.media.filter((media) => media.photographerId === id);

    if (!selectedPhotographerProfil) {
      throw new Error(`Photographer with ID ${id} not found`);
    }

    return { profil: selectedPhotographerProfil, media: selectedPhotographerMedia };
  } catch (error) {
    console.error(`Unable to get data for photographer ID ${id} :`, error);
    return null;
  }
}

export { getPhotographerProfiles, getPhotographerData };
