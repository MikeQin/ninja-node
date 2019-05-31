//const Joi = require("joi");
const express = require("express");
const app = express();
const api = require("./route/api");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/books",
  {
    useNewUrlParser: true,
    user: "mongo",
    pass: "mongo",
    authSource: "admin"
  },
  (error, db) => {
    console.log(error);
  }
);
mongoose.Promise = global.Promise;

// Use Middleware
app.use(express.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
