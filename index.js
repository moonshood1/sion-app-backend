require("dotenv").config();

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

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

console.log("db connection :", requireProcessEnv("MONGO_URI_PROD"));

app.use("/api/admins", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/magazines", magazineRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// connection to db
mongoose
  .connect(requireProcessEnv("MONGO_URI_PROD"))
  .then(() => {
    console.log("Connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((e) => console.log(e));

// db logs
mongoose.set("debug", true);
