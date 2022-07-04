const {
  getTheActualDirect,
  getOlderDirects,
} = require("../controllers/directController");
const express = require("express");

const router = express.Router();

router.get("/actual-direct", getTheActualDirect);
router.get("/get-all-directs", getOlderDirects);

module.exports = router;
