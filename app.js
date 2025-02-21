const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db/mongodb.connection.js");
const ListingModel = require("./models/listing.js");
const listingRoute = require("./routes/index.route.js");
const _ = require("mongoose-paginate");
const methodOverRide = require("method-override");
const engine = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const customError = require("./utils/CustomError.js");

dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverRide("_method"));

// Routes
app.use("/listings", listingRoute);

// Home Page
app.get("/", (req, res) => {
  res.send("Welcome To Wonder Lands");
});

// Testing route
app.get(
  "/testlisting",
  wrapAsync(async (req, res) => {
    let sampleListing = await ListingModel.create({
      title: "new vilaa",
      description: "this is my new villa",
      price: 3200,
      conutry: "pakistan",
      location: "mardan pakistan",
    });

    await sampleListing.save();
    console.log(sampleListing);
    res.send("working");
  })
);

// Custom Error Handler
app.all("*", (req, res, next) => {
  next(new customError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.log(status || 500, message || "Inernal Sever Error!");
  res.status(status || 500).send(message || "Internal Server Error!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
