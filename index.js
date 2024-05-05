const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const connectDB = require("./server/config/dbConfig");
const isAuthenticated = require("./server/services/authentication");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

const flash = require("express-flash");
app.use(flash());

// Session middleware
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

// load files
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use(
  "/javascript",
  express.static(path.resolve(__dirname, "assets/javascript"))
);
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));

// routes
app.use("/", require("./server/routes/employeeRouter"));
app.use("/register", require("./server/routes/usersRouter"));

app.get("/home", isAuthenticated, (req, res) => {
  res.render("index", {
    title: "Employee Dashbord",
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup", userExists: false });
});

app.get("/", (req, res) => {
  const userExists = req.flash("userExists")[0];
  res.render("login", { title: "Login", userExists });
});

app.get("/viewEmployee", isAuthenticated, (req, res) => {
  res.render("viewEmployee", { title: "View Employee" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`📌 Server is running on 🌐 :  http://localhost:${PORT}`);
});
