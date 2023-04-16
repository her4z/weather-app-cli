import * as fs from "node:fs";
import fetch from "node-fetch";
import { capitalize } from "../helpers/capitalize.js";

export default class Searchs {
  dbPath = "./db/database.json";
  history = [];
  constructor() {
    this.history = this.getHistoryDB();
  }

  async search(input = "") {
    const { MAPBOX_API_KEY } = process.env;
    try {
      console.log("...");
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?limit=5&language=en&access_token=${MAPBOX_API_KEY}`
      );
      console.clear();
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

  async getWeatherByCoord(lat, lon) {
    const { OPENWEATHER_API_KEY } = process.env;

    try {
      console.log("...");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      console.clear();
      const data = await res.json();

      const { temp, temp_min, temp_max, feels_like } = data?.main;

      const weather = {
        desc: data?.weather[0]?.description.replace(
          /(?:^|\s|["'([{])+\S/g,
          (match) => match.toUpperCase()
        ),
        temp,
        temp_min,
        temp_max,
        feels_like,
      };
      return weather;
    } catch (err) {
      return err;
    }
  }

  updateHistory(location = "") {
    if (!this.history.includes(location.toLowerCase())) {
      this.history.unshift(location.toLowerCase());

      this.saveHistoryDB();
    }
  }

  saveHistoryDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  getHistoryDB() {
    if (!fs.existsSync(this.dbPath)) return [];

    const data = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const history = JSON.parse(data)?.history;
    return history;
  }

  getCapitalizedHistory() {
    return this.history.map((location) => {
      return capitalize(location);
    });
  }
}
