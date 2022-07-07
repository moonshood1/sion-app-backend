const { registerToNewsLetter } = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.post("/register-to-news", registerToNewsLetter);

module.exports = router;
