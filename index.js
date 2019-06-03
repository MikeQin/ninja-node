//const Joi = require("joi");
const express = require("express");
const app = express();
const api = require("./route/api");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/books",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: "mongo",
    pass: "mongo",
    authSource: "admin"
  },
  (error, db) => {
    if (error) console.log(error);
  }
);
mongoose.Promise = global.Promise;

// Use Middleware
app.use(express.static("public"));
app.use(express.json()); // equals to body-parser
app.use("/api", api);
// Error Handler Middleware
app.use((err, req, res, next) => {
  if (err) {
    //console.log(err);
    res.status(422).send({ code: err.code, error: err.errmsg });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World.");
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
