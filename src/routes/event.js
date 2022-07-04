const {
  getSingleEvent,
  getAllEvents,
  getTopEvent,
} = require("../controllers/eventControllers");
const express = require("express");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/single/:id", getSingleEvent);
router.get("/last-published", getTopEvent);

module.exports = router;
