const {
  getTheActualDirect,
  getOlderDirects,
} = require("../controllers/directController");
const express = require("express");

const router = express.Router();

router.get("/last-published", getTheActualDirect);
router.get("/get-all-directs", getOlderDirects);

module.exports = router;
