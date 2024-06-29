export const geocodeCoordinates = async (latitude, longitude) => {
  const apiKey = "AIzaSyCIMQgM_9Ew_Z6LjdDsPhxY9pfPyyDRmag"; // Reemplaza con tu API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error("No se encontraron resultados de geocodificación.");
    }
  } catch (error) {
    console.error("Error al realizar la geocodificación:", error);
    throw error;
  }
};
