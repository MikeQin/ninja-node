const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Book = require("../model/book");

router.get("/books", (req, res) => {
  console.log("GET, req");
  Book.find({}, (err, books) => {
    if (err) return res.send(err);
    res.send(books);
  });
});

router.post("/books", (req, res) => {
  console.log(`POST, req.body: ${req.body}`);
  // const book = new Book(req.body);
  // book.save();
  Book.create(req.body)
    .then(book => {
      // promise
      res.send(book);
    })
    .catch(error => {
      console.log(error);
    });
});

router.put("/books/:id", (req, res) => {
  console.log(`PUT, id: ${req.params.id}`);
});

router.delete("/books/:id", (req, res) => {
  console.log(`DELETE, id: ${req.params.id}`);
});

module.exports = router;
