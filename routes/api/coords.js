const express = require("express");

const router = express.Router();

// @Route   GET api/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" });
});

module.exports = router;
