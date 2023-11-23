const express = require("express");

const app = express();

const { connectDb } = require("./database.js");
const dotenv = require("dotenv");
const User = require("./userSchema.js");
const ejs = require("ejs");
const passport = require("passport");
const { initializePassport } = require("./passportConfig.js");
const expressSession = require("express-session");

dotenv.config({ path: ".env" });

connectDb();
initializePassport(passport);

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

app.use(
  expressSession({
    secret: "secret",
    resave: "false",
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).send("User already existS");

  const newUser = await User.create(req.body);

  res.status(201).send("New user creatred");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});
