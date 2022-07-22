require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./src/routes/admin");
const categoryRoutes = require("./src/routes/category");
const magazineRoutes = require("./src/routes/magazine");
const videosRoutes = require("./src/routes/videos");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");
const eventRoutes = require("./src/routes/event");
const directRoutes = require("./src/routes/direct");

const app = express();

const cors = require("cors");
const { requireProcessEnv } = require("./src/services/processEnv");

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// console.log("db connection :", requireProcessEnv("MONGO_URI_PROD"));

app.use("/api/admins", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/magazines", magazineRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/directs", directRoutes);

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
