const express = require("express");
const router = express.Router();

// @Route   GET api/
// @Desc    Test route
// @Access  Public
router.get("/", function(req, res) {
  res.json({ msg: "working" });
});

module.exports = router;
