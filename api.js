const Joi = require("joi");
const express = require("express");
const router = express.Router();

const books = [
  { id: 1, title: "book1" },
  { id: 2, title: "book2" },
  { id: 3, title: "book3" }
];

router.get("/books", (req, res) => {
  res.send(books);
});

module.exports = router;
