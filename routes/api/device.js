const express = require("express");

const router = express.Router();

// @Route   GET api/device/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "device working" });
});

module.exports = router;
