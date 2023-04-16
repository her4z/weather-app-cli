import * as dotenv from "dotenv";
dotenv.config();

import chalk from "chalk";
import { input, menu, pause, selectLocationMenu } from "./helpers/inquirer.js";
import Searchs from "./models/searchs.js";

const main = async () => {
  let option;

  const searchs = new Searchs();

  do {
    option = await menu();

    switch (option) {
      case 0:
        console.clear();
        return;
        break;
      case 1:
        const text = await input("Location: ");
        const locations = await searchs.search(text);
        const locationId = await selectLocationMenu(locations);

        // If pressed 'Cancel' then go back to main menu
        if (locationId === 0) continue;

        const location = locations.find((l) => l.id === locationId);

        searchs.updateHistory(location.name);
        searchs.getHistoryDB();

        const locationWeather = await searchs.getWeatherByCoord(
          location.lat,
          location.long
        );

        console.clear();
        console.log(chalk.green("Location Information: \n"));
        console.log("Name:", location.name);
        console.log("Lat:", location.lat);
        console.log("Long:", location.long);
        console.log("Weather:", locationWeather.desc);
        console.log("Temperature:", locationWeather.temp, "C°");
        console.log("Min:", locationWeather.temp_min, "C°");
        console.log("Max:", locationWeather.temp_max, "C°");
        console.log("Feels like:", locationWeather.feels_like, "C°");

        break;
      case 2:
        console.log("\n");
        const history = searchs.getCapitalizedHistory();
        history.forEach((location, i) => {
          console.log(`${chalk.green(i + 1)}. ${location}`);
        });
        break;
    }
    await pause();
  } while (option !== 0);
};

main();
