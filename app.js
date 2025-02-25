const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db/mongodb.connection.js");
const listingRoute = require("./routes/index.route.js");
const reviewsRoute = require("./routes/reviews.route.js");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const customError = require("./utils/CustomError.js");

dotenv.config();

const app = express();

// Database Connection with Error Handling
connectDB();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Home Page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Routes
app.use("/listings", listingRoute);
app.use("/listings", reviewsRoute);

// Custom Error Handler for 404
app.all("*", (req, res, next) => {
  console.log(`Handled 404 - Path Not Found: ${req.originalUrl}`);
  next(new customError(404, "Page Not Found!"));
});


// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error!" } = err;
  console.error(`Error ${status}: ${message}`);
  
  res.status(status).render("error.ejs", { status, message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
