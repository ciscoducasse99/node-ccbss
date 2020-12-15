const { getMobileCarrier } = require("./getMobileCarrier");
const chalk = require("chalk");
const axios = require("axios");

const updateCCB = (usersToUpdate, auth) => {
  console.log(chalk.blue("> Updating CCB Database..."));
  try {
    for (user of usersToUpdate) {
      const params = new URLSearchParams({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mailing_street_address: user.street,
        mailing_city: user.city,
        mailing_state: user.state,
        mailing_zip: user.zip,
        mobile_phone: user.phone,
        mobile_carrier: getMobileCarrier(user.carrier),
        modifier_id: 4508,
      }).toString();

      const url = `https://impactpeople.ccbchurch.com/api.php?srv=update_individual&individual_id=${user.individual_id}`;

      axios
        .post(url, params, {
          auth,
        })
        .then((res) => {
          console.log("RESPONSE: ", res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(chalk.red("> Aborting script..."));
          process.exit(1);
        });
    }
  } catch (err) {
    console.log(err);
    console.log(chalk.red("> Aborting script..."));
    process.exit(1);
  }
  console.log(chalk.green("> Successful CCB Database update..."));
};

module.exports = { updateCCB };
