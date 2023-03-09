//Dependencies
const path = require("path");
//  Server-dependencies
const express = require("express");
const session = require("express-session");
//  DB-dependencies
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
mongoose.set("strictQuery", false);

//Define constants

const app = express();
app.use(express.json());

const {
  HOST,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  IS_PROD,
  COOKIE_NAME,
} = require("./config/config");
const { MongoURI } = require("./config/database");
const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

//configure mongoose
mongoose.connect(
  MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: MongoURI,
  collection: "sessions",
});

// Express-Session
app.use(
  session({
    name: COOKIE_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: IS_PROD,
    },
  })
);

//Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "client", "build")));

//api-calls
const betRouter = require("./routes/betRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
//  Middleware
const { checkLoggedIn, checkAdministrator } = require("./util/authMiddleware");

app.use("/api/user", userRouter);
app.use("/api/bet", betRouter);
app.use("/api/admin", checkLoggedIn, checkAdministrator, adminRouter);

// Handle all other GET-reqs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
