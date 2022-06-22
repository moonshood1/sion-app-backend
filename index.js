const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./src/routes/admin");
const categoryRoutes = require("./src/routes/category");
const magazineRoutes = require("./src/routes/magazine");
const videosRoutes = require("./src/routes/videos");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");

const app = express();

const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

console.log("les routes", process.env.API_ROOT);
console.log("le port :", process.env.PORT);
console.log("la chaine db", process.env.MONGO_URI_PROD);

app.use(process.env.API_ROOT + "/admins", adminRoutes);
app.use(process.env.API_ROOT + "/category", categoryRoutes);
app.use(process.env.API_ROOT + "/magazines", magazineRoutes);
app.use(process.env.API_ROOT + "/videos", videosRoutes);
app.use(process.env.API_ROOT + "/comments", commentRoutes);
app.use(process.env.API_ROOT + "/users", userRoutes);

// connection to db
mongoose
  .connect(process.env.MONGO_URI_PROD)
  .then(() => {
    console.log("Connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((e) => console.log(e));

// db logs
mongoose.set("debug", true);
