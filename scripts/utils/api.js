const PHOTOGRAPHERS_API_URL = "data/photographers.json";

async function getPhotographers() {
  try {
    const response = await fetch(PHOTOGRAPHERS_API_URL);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    console.log(data.photographers);
    return data.photographers;
  } catch (error) {
    console.error("Unable to load photographers list", error);
    return [];
  }
}

export { getPhotographers };
