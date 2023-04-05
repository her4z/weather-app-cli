import fetch from "node-fetch";
export default class Searchs {
  history = ["Madrid", "Buenos Aires", "Malaga"];
  constructor() {}

  async search(input = "") {
    const { API_KEY } = process.env;
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?limit=5&language=en&access_token=${API_KEY}`
      );
      const data = await res.json();
      const locations = data?.features?.map((location) => ({
        id: location.id,
        name: location.place_name,
        lat: location.center[1],
        long: location.center[0],
      }));
      return locations;
    } catch (err) {
      return [];
    }
  }
}
