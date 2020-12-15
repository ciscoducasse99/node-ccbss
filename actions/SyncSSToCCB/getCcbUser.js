const xml2js = require("xml2js");
const parser = xml2js.parseString;
const axios = require("axios");

const getCcbUser = async (ccb_user_id, auth) => {
  let ccb_res;

  const resp = await axios.get(
    `${process.env.CCB_API_URL}?srv=individual_profile_from_id&individual_id=${ccb_user_id}`,
    {
      auth,
    }
  );
  parser(
    resp.data,
    { trim: true, ignoreAttrs: true, explicitArray: false },
    (err, result) => {
      if (err) {
        throw err;
      }
      ccb_res = result.ccb_api.response.individuals.individual;
    }
  );

  const ccb_user_info = {
    individual_id: ccb_user_id,
    first_name: ccb_res.first_name,
    last_name: ccb_res.last_name,
    email: ccb_res.email,
    street: ccb_res.addresses.address[0].street_address,
    city: ccb_res.addresses.address[0].city,
    state: ccb_res.addresses.address[0].state,
    zip: ccb_res.addresses.address[0].zip,
    phone: ccb_res.phones.phone[0],
    carrier: ccb_res.mobile_carrier,
  };
  console.log(
    `> Found infomation for user: ${ccb_user_info.first_name} ${ccb_user_info.last_name}`
  );
  return ccb_user_info;
};

module.exports = { getCcbUser };
