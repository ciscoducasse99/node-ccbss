const findDuplicates = (jsonFile) => {
  const newArrayOfObjects = jsonFile.reduce((accumulator, object) => {
    if (
      (objectFound = accumulator.find(
        (arrItem) =>
          arrItem.Mailing_Street === object.Mailing_Street &&
          arrItem.Mailing_State === object.Mailing_State
      ))
    ) {
      objectFound.times++;
    } else {
      object.times = 1;
      accumulator.push(object);
    }
    return accumulator;
  }, []);

  const duplicates = newArrayOfObjects.filter((item) => item.times > 1);
  return duplicates;
};

module.exports = { findDuplicates };
