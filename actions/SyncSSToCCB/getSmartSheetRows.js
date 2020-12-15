const chalk = require("chalk");

const getSmartSheetRows = async (ss, smartsheetOptions) => {
  console.log(
    chalk.blue(
      `> Getting information from Smartsheet Sheet ID number: ${smartsheetOptions.id} `
    )
  );
  try {
    const ssRows = await ss.sheets.getSheet(smartsheetOptions);
    console.log(chalk.green("> Sheet information found..."));

    const filteredRows = ssRows.rows.filter(
      (row) => row.cells[0].value === "Cisco"
    );

    const formattedToCCBRows = filteredRows.map((row) => {
      return {
        row_id: row.id,
        result: {
          individual_id: row.cells[4].value,
          first_name: row.cells[5].value,
          last_name: row.cells[6].value,
          email: row.cells[7].value,
          street: row.cells[8].value,
          city: row.cells[9].value,
          state: row.cells[10].value.toUpperCase(),
          zip: row.cells[11].value,
          phone: row.cells[12].value,
          carrier: row.cells[13].value,
        },
      };
    });
    return { filteredRows, formattedToCCBRows };
  } catch (err) {
    console.log(chalk.red("> Error: ", err.message));
    console.log(chalk.red("> Aborting script..."));
    process.exit(1);
  }
};

module.exports = { getSmartSheetRows };
