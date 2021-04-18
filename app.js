var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
var methodOverride = require("method-override");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var singinRouter = require("./routes/signin");
var signupRouter = require("./routes/signup");

var app = express();

const db = require("./models/db");
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected mongodb!");
});

// override with POST having ?_method=
app.use(methodOverride("_method"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("checkIndex", function (index) {
  return index === 0 ? false : true;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", express.static(path.join(__dirname, "public")), usersRouter);
app.use("/login", singinRouter);
app.use("/signup", signupRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
