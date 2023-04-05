import inquirer from "inquirer";
import chalk from "chalk";

const questions = [
  {
    type: "list",
    name: "option",
    message: "Menu",
    choices: [
      {
        value: 1,
        name: `${chalk.green("1.")}Search location`,
      },
      {
        value: 2,
        name: `${chalk.green("2.")}History`,
      },
      {
        value: 0,
        name: `${chalk.green("0.")}Exit`,
      },
    ],
  },
];

const menu = async () => {
  console.clear();

  console.log(chalk.green("╔═══════════════════════════════╗"));
  console.log(chalk.green("║        Weather App CLI        ║"));
  console.log(chalk.green("╚═══════════════════════════════╝\n"));

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  console.log("\n");

  const { confirm } = await inquirer.prompt({
    type: "input",
    name: "confirm",
    message: `Press ${chalk.green("ENTER")} to continue...`,
  });

  return confirm;
};

const input = async (message) => {
  const { input } = await inquirer.prompt({
    type: "input",
    name: "input",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Please enter a valid value";
      }
      return true;
    },
  });

  return input;
};

const selectLocationMenu = async (locations) => {
  let choices = locations.map((location, i) => {
    return {
      value: location.id,
      name: `${chalk.green(`${i + 1}.`)} ${location.name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${chalk.green("0.")} Cancelar`,
  });

  const { id } = await inquirer.prompt({
    type: "list",
    name: "id",
    message: "Select a location:",
    choices,
  });

  return id;
};

const completeTasksMenu = async (tasks) => {
  let choices = tasks.map((task, i) => {
    return {
      value: task.id,
      name: `${chalk.green(`${i + 1}.`)} ${task.description}`,
      checked: task.completedDate ? true : false,
    };
  });

  const { id } = await inquirer.prompt({
    type: "checkbox",
    name: "id",
    message: "Change tasks status",
    choices,
  });

  return id;
};

const confirmation = async (message) => {
  console.log("\n");

  const { confirm } = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message,
  });

  return confirm;
};

export {
  menu,
  pause,
  input,
  selectLocationMenu,
  confirmation,
  completeTasksMenu,
};
