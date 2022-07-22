const {
  getAllCategories,
  getAllMagazines,
  getAllVideos,
  createCategory,
  createMagazine,
  createVideo,
  editVideoStatus,
  login,
  deleteComment,
  createEvent,
  publishDirect,
  getDirects,
  editDirect,
} = require("../controllers/adminControllers");
const express = require("express");
const { token } = require("../services/authentication");

const router = express.Router();

router.post("/login", login);

router.get("/get-categories", token, getAllCategories);

router.get("/get-videos", token, getAllVideos);

router.get("/get-magazines", token, getAllMagazines);

router.post("/add-video", token, createVideo);

router.post("/add-magazine", token, createMagazine);

router.post("/add-category", token, createCategory);

router.patch("/edit-video-status/:id", token, editVideoStatus);

router.delete("/delete-comment/:id", token, deleteComment);

router.post("/add-event", token, createEvent);

router.post("/publish-direct", token, publishDirect);

router.get("/get-directs", token, getDirects);

router.patch("/edit-direct/:id", token, editDirect);

module.exports = router;
