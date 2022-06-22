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



app.use("/api/admins", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/magazines", magazineRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

console.log("routes", process.env.API_ROOT);
console.log("port", process.env.PORT);

// connection to db
mongoose
  .connect(
    "mongodb+srv://loulou:enzo2906@cluster0.xxvdbhh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to db");
    app.listen(4000, () => {
      console.log("Listening on port", 4000);
    });
  })
  .catch((e) => console.log(e));

// db logs
mongoose.set("debug", true);
