const os = require("os");
module.exports.getData = async () => {
  try {
    const OsInformation = {
      hostname: os.hostname(),
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
    };
    console.log(OsInformation);
    return OsInformation;
  } catch (error) {
    throw new Error("Error fetching OS information:", error);
  }
 };
