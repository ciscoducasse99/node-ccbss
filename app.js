const inquirer = require("inquirer");
var schedule = require("node-schedule");
const chalk = require("chalk");

require("dotenv").config({ path: "./config/config.env" });
const { SyncCommand, RegisterCommand, MailingCommand } = require("./actions");
const { MailingList } = require("./actions/MailingList");

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
          name: "Register people for teams",
          value: 2,
        },
        {
          key: "3",
          name: "Mailing List",
          value: 3,
        },
      ],
    },
  ])
  .then((res) => {
    if (res.userInput === 1) {
      SyncCommand();
    } else if (res.userInput === 2) {
      RegisterCommand();
    } else {
      MailingCommand();
    }
  })
  .catch((err) => console.log(err));

//To make things a little easier, an object literal syntax is also supported,
//like in this example which will log a message every Sunday at 2:30pm:

var j = schedule.scheduleJob({ hour: 8, minute: 30, dayOfWeek: 1 }, () => {
  console.log("Time for tea!");
});
