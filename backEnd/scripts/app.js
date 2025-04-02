require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const URL = process.env.CONNECTION_STRING_ATLAS;
const PORT = 3000;
require("../data/createAdmin");

const usersRouter = require("../routers/users");
const authRouter = require("../routers/auth");
const contentRouter = require("../routers/content");

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/content", contentRouter);

// Middleware לטיפול בנתיבים לא קיימים
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found", message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

connect();

async function connect() {
  try {
    await mongoose.connect(URL);
    console.log("CONNECT TO MONGO DB");

    app.listen(PORT, () => {
      console.log("SERVER RUNNING ON PORT:", PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
}
