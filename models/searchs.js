import fetch from "node-fetch";
export default class Searchs {
  history = ["Madrid", "Buenos Aires", "Malaga"];
  constructor() {}

  async search(input = "") {
    const { API_KEY } = process.env;
    try {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?limit=5&language=en&access_token=${API_KEY}`
      ).then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      });
    } catch (err) {
      return [];
    }
  }
}
