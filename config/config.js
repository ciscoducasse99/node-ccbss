const smartsheetClient = require("smartsheet");

module.exports = {
  auth: {
    username: process.env.CCB_USER,
    password: process.env.CCB_PASS,
  },
  ss: smartsheetClient.createClient({
    accessToken: process.env.SMARTSHEET_ACCESS_TOKEN,
    logLevel: "info",
  }),
};
