const xml2js = require("xml2js");
const parser = xml2js.parseString;
const axios = require("axios");
const express = require("express");
const { response } = require("express");

const getForms = async (auth) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.listen(4000, () => {
    console.log("> Server started...");
  });

  let parsedResp;
  const ccbResponse = await axios.get(
    `${process.env.CCB_API_URL}?srv=form_responses&form_id=203`,
    {
      auth,
    }
  );

  parser(
    ccbResponse.data,
    { trim: true, ignoreAttrs: true, explicitArray: false },
    (err, results) => {
      if (err) {
        throw err;
      }
      parsedResp = results;
    }
  );

  app.get("/", (req, res) => {
    res.send(
      // Lists answers to COVID FORM from Form id #203
      JSON.stringify(
        parsedResp.ccb_api.response.form_responses.form_response,
        null,
        5
      )
    );
  });
};

module.exports = { getForms };
