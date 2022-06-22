const { getAllCategories } = require("../controllers/categoryController");

const express = require("express");

const router = express.Router();

router.get("/", getAllCategories);

module.exports = router;
