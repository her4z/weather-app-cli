import { input, menu, pause } from "./helpers/inquirer.js";
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
        const location = await input("Location: ");
        searchs.search(location);
        break;
      case 2:
        console.log(searchs.history);
        break;
    }
    await pause();
  } while (option !== 0);
};

main();
