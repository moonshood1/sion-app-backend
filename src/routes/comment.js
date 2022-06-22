const {
  addComment,
  getCommentByMedia,
} = require("../controllers/commentController");

const express = require("express");

const router = express.Router();

router.post("/add-comment", addComment);
router.get("/by-media/:id", getCommentByMedia);

module.exports = router;
