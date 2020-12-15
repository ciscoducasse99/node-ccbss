const chalk = require("chalk");

const { ss, auth } = require("../../config/config");
const { getSmartSheetRows } = require("./getSmartSheetRows");
const { updateCCB } = require("./updateCCB");
const { getCcbUser } = require("./getCcbUser");
const { updateSmartsheet } = require("./updateSmartsheet");

// options.id === sheetId
const smartsheetOptions = {
  id: 2517001915656068,
  expanded: true,
};

const SyncSSToCCB = async () => {
  try {
    const { filteredRows, formattedToCCBRows } = await getSmartSheetRows(
      ss,
      smartsheetOptions
    );
    console.log(
      chalk.blue(
        `> Reading files between CCB and Smartsheet for ${formattedToCCBRows.length} users...`
      )
    );
    console.log(
      chalk.yellow(`> Finding how many users need updates. Hold on...`)
    );

    let updatedUsers = [];
    let CcbRes = [];

    for (const row of formattedToCCBRows) {
      const ccb_user = await getCcbUser(row.result.individual_id, auth);
      const difference = Object.keys(ccb_user).filter(
        (k) => ccb_user[k] !== row.result[k]
      );
      console.log("Differences found: ", difference);
      if (JSON.stringify(ccb_user) !== JSON.stringify(row.result)) {
        updatedUsers.push(row.result);
        CcbRes.push(ccb_user);
      }
    }

    console.log(
      chalk.yellow(`> ${updatedUsers.length} users that needs updating...`)
    );

    if (updatedUsers.length > 0) {
      updateCCB(updatedUsers, auth);
    }

    updateSmartsheet(filteredRows, smartsheetOptions, ss);
  } catch (err) {
    // Handle Error Here
    console.error(err.message);
    console.log(chalk.red("> Aborting script..."));
    process.exit(1);
  }
};

module.exports = { SyncSSToCCB };
