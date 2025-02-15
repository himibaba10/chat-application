// External imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// Internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandlers");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
const connectDB = require("./config/db");

const app = express();
dotenv.config();

// database connection
connectDB();

//   Accept requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set("view engine", "ejs");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handling
app.use(notFoundHandler);

// Global not found handling
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Chat app is listening to port ${process.env.PORT}`);
});
