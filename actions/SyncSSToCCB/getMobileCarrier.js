const mobile_carriers = require("../../extras/mobile_carriers").mobile_carriers;

const getMobileCarrier = (carrierName) => {
  const cn = carrierName.trim();
  const found = mobile_carriers.find((carrier) => carrier.name === cn);
  return found.id;
};

module.exports = { getMobileCarrier };
