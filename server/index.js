// server/index.js
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://admin:admin@friendlybetcluster.e50alrg.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//api-calls
const betRouter = require("./Routes/betRoutes");
const profileRouter = require("./Routes/profileRoutes");
app.use("/api/bet", betRouter);
app.use("/api/profile", profileRouter);

// Handle all other GET-reqs
app.get('*', (req, res) => {
  console.log(req.body);
  res.redirect(404, "/");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});