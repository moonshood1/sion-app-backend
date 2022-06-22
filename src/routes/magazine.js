const {
  getAllMagazines,
  getLastMagazine,
} = require("../controllers/magazineController");

const express = require("express");

const router = express.Router();

router.get("/", getAllMagazines);
router.get("/last-published", getLastMagazine);

module.exports = router;
