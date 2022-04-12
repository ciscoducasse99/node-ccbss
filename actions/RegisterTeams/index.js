const chalk = require("chalk");

const { auth } = require("../../config/config");
const { getForms } = require("./getForms");

const RegisterTeams = async () => {
  try {
    getForms(auth);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { RegisterTeams };
