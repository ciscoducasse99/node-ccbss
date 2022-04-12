const chalk = require("chalk");
const fs = require("fs");
const xlsx = require("xlsx");
const csv = require("csvtojson");

const pathToCSV = require("../../assets/json_current.json");
const pathToXlsx = require("../../assets/json_updates.json");

const { findDuplicates } = require("./findDuplicatesInCurrent");

const MailingList = async () => {
  const duplicates = findDuplicates(pathToCSV);
  const parsedDuplicates = JSON.stringify(duplicates, null, 2);

  fs.writeFile("duplicates.json", parsedDuplicates, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
};

module.exports = { MailingList };
