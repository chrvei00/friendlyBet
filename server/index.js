//Dependencies
const path = require("path");
//  Server-dependencies
const express = require("express");
const session = require("express-session");
//  DB-dependencies
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
mongoose.set('strictQuery', false);

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
  collection: "sessions"
});

// Express-Session
app.use(
  session({
    name: COOKIE_NAME,
    secret: SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: IS_PROD
    }
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//api-calls
const betRouter = require("./Routes/betRoutes");
const userRouter = require("./Routes/userRoutes");
app.use("/api/bet", betRouter);
app.use("/api/user", userRouter);

// Handle all other GET-reqs
app.get('*', (req, res) => {
  console.log(req.body);
  res.status(404).json({ message: "404 not found"});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});