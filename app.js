const inquirer = require("inquirer");
const chalk = require("chalk");

require("dotenv").config({ path: "./config/config.env" });
const { SyncCommand } = require("./actions");

console.log(chalk.blue("> Running script..."));

inquirer
  .prompt([
    {
      type: "rawlist",
      name: "userInput",
      message: "What command would do you need ran?",
      choices: [
        {
          key: "1",
          name: "Sync CCB and Smartsheet user database",
          value: 1,
        },
        {
          key: "2",
          name: "Email users their DISC results ",
          value: 2,
        },
      ],
    },
  ])
  .then((res) => {
    if (res.userInput === 1) {
      SyncCommand();
    } else if (res.userInput === 2) {
      // EmailDISCResults()
      console.log("> Email DISC results");
    } else {
    }
  })
  .catch((err) => console.log(err));
