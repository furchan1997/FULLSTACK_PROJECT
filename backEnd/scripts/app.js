require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const URL = process.env.CONNECTION_STRING_ATLAS;
const PORT = process.env.PORT;
require("../data/createAdmin");

const usersRouter = require("../routers/users");
const authRouter = require("../routers/auth");
const contentRouter = require("../routers/content");
const createContactRouter = require("../routers/createContact");
const productsRouter = require("../routers/products");
const adminLoger = require("../routers/adminLoger");

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-auth-token"],
  credentials: true,
};

app.use(cors(corsOptions));

// חובה — תומך ב־OPTIONS לכל הנתיבים
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
  res.json({ message: "API is up and running!" });
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/content", contentRouter);
try {
  app.use("/create-contact", createContactRouter);
} catch (err) {
  console.log("ERROR IN CREATR-CONTACT:", err);
}
app.use("/shop", productsRouter);
app.use("/admin-loger", adminLoger);

// 404 - צריך להיות אחרי כל הנתיבים
app.use((req, res, next) => {
  res.status(404).json({
    message: "העמוד לא נמצא",
  });
});

// טיפול בשגיאות
app.use((err, req, res, next) => {
  console.error("SERVER ERROR", err);
  res.status(500).json({
    message: "שגיאת רשת",
  });
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
