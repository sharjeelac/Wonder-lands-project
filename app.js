const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./db/mongodb.connection.js");
const ListingModel = require("./models/listing.js");
const listingRoute = require("./routes/index.route.js");
const _ = require("mongoose-paginate");

dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/listings", listingRoute);

// Home Page
app.get("/", (req, res) => {
  res.send("Welcome To Wonder Lands");
});

app.get("/testlisting", async (req, res) => {
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
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
