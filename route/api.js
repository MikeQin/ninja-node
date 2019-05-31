const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Book = require("../model/book");

router.get("/books", (req, res, next) => {
  console.log("GET, req");
  Book.find({}, (err, books) => {
    if (err) return res.send(err);
    res.send(books);
  });
});

router.post("/books", (req, res, next) => {
  console.log(`POST ...`);
  // const book = new Book(req.body);
  // book.save();
  Book.create(req.body)
    .then(book => {
      // promise
      res.send(book);
    })
    .catch(next);
});

router.put("/books/:id", (req, res, next) => {
  console.log(`PUT, id: ${req.params.id}`);
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Book.findOne({ _id: req.params.id }).then(book => {
        res.send(book);
      });
    })
    .catch(next);
});

router.delete("/books/:id", (req, res, next) => {
  console.log(`DELETE, id: ${req.params.id}`);
  Book.findByIdAndRemove({ _id: req.params.id })
    .then(book => {
      res.send(book);
    })
    .catch(next);
});

module.exports = router;
