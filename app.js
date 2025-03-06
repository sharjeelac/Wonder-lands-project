const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db/mongodb.connection.js');
const listingRoute = require('./routes/index.route.js');
const reviewsRoute = require('./routes/reviews.route.js');
const userRoute = require('./routes/user.router.js');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const customError = require('./utils/CustomError.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('./models/user.model.js');
const userModel = require('./models/user.model.js');

dotenv.config();

const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: +7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Database Connection with Error Handling
connectDB();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash());
app.use(session(sessionOptions));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// connect-flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user
  next();
});

// Home Page
app.get('/', (req, res) => {
  res.render('home.ejs');
});

// Demo User
// app.get('/demouser', async (req, res) => {
//   let fakeUser = new UserModel({
//     email: 'student@gmail.com',
//     username: 'StudentOne',
//   });

//   let newUser = await userModel.register(fakeUser, 'helloworld');
//   res.send(newUser);
// });

// Routes
app.use('/listings', listingRoute);
app.use('/listings/:id/reviews', reviewsRoute);
app.use('/', userRoute);

// Custom Error Handler for 404
app.all('*', (req, res, next) => {
  console.log(
    `Handled 404 - Path Not Found: ${req.originalUrl} ${req.method} `,
  );
  next(new customError(404, 'Page Not Found!'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Internal Server Error!' } = err;
  console.error(`Error ${status}: ${message}`);

  res.status(status).render('error.ejs', { status, message });
});


// listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
