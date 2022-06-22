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

module.exports = router;
