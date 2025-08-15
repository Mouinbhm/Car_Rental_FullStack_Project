var express = require("express");
var router = express.Router();
const os = require("os");

/* GET users listing. */
router.get("/hi", function (req, res, next) {
  res.json("hello");
});

router.get("/OsInformation", function (req, res, next) {
  try {
    const OsInformation = {
      hostname: os.hostname(),
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
    };
    console.log(OsInformation);
    res.status(200).json(OsInformation);
  } catch (error) {}
  res.status(500).json({ message: error.message });
});

module.exports = router;
