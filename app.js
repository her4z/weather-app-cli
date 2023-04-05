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
        return;
        break;
      case 1:
        const text = await input("Location: ");
        const locations = await searchs.search(text);
        const locationId = await selectLocationMenu(locations);

        if (locationId === 0) break;

        const location = locations.find((l) => l.id === locationId);

        console.clear();
        console.log(chalk.green("Location Info: \n"));
        console.log(`Name: ${location.name}`);
        console.log("Lat: ", location.lat);
        console.log("Long: ", location.long);
        break;
      case 2:
        console.log(searchs.history);
        break;
    }
    await pause();
  } while (option !== 0);
};

main();
