// Backend/app.js

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const contactRouter = require("./routes/contactRouter");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var carRouter = require("./routes/carRouter");
var bookingRouter = require("./routes/bookingRoutes");
var osRouter = require("./routes/OsRouter");

var app = express();

/** CORS (must be before routes) **/
const corsOptions = {
  origin: (origin, cb) => cb(null, true), // reflect any origin
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight
// extra safety for some browsers/proxies
app.use((req, res, next) => {
  const reqOrigin = req.headers.origin;
  if (reqOrigin) res.header("Access-Control-Allow-Origin", reqOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Vary", "Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

/** Parsers & static **/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** Health **/
app.get("/health", (req, res) => res.json({ ok: true }));

/** Routes **/
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cars", carRouter);
app.use("/os", osRouter);
app.use("/contact", contactRouter);
app.use("/bookings", bookingRouter);

/** 404 **/
app.use(function (req, res, next) {
  next(createError(404));
});

/** Error handler (JSON) **/
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message || "Error" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
