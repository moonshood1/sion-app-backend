const {
  getAllVideos,
  getVideosByCategories,
  getWelcomeVideo,
  getSingleVideo,
} = require("../controllers/videoController");

const express = require("express");

const router = express.Router();

router.get("/", getAllVideos);
router.get("/single/:id", getSingleVideo);
router.get("/by-category/:id", getVideosByCategories);
router.get("/welcome", getWelcomeVideo);

module.exports = router;
