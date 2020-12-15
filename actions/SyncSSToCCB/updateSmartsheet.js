const chalk = require("chalk");

const updateSmartsheet = (filteredRows, smartsheetOptions, ss) => {
  console.log(chalk.blue("> Updating Smartsheet..."));

  const rows = filteredRows.map((row) => {
    return {
      id: row.id,
      cells: [
        {
          columnId: filteredRows[0].cells[1].columnId,
          value: true,
        },
      ],
    };
  });
  const options = {
    sheetId: smartsheetOptions.id,
    body: rows,
  };

  ss.sheets
    .updateRow(options)
    .then(() => {
      console.log(chalk.green(`> Successfully updated users in Smartsheet...`));
    })
    .catch((error) => {
      console.log(chalk.red("> Error: ", error.message));
      console.log(chalk.red("> Aborting script..."));
      process.exit(1);
    });
};

module.exports = { updateSmartsheet };
