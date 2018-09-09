const express = require("express");

const router = express.Router();

// @Route   GET api/user/test
// @Desc    Test route
// @Access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "user working" });
});

module.exports = router;
