//const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/books", (req, res, next) => {
  console.log(
    "GET, geometry",
    parseFloat(req.query.lng),
    parseFloat(req.query.lat)
  );

  Book.aggregate()
    .near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 300000, // 300 KM
      spherical: true,
      distanceField: "distance"
    })
    .then(books => {
      console.log(books);
      // if (books) {
      //   if (books.length === 0)
      //     return res.send({
      //       message:
      //         "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
      //     });
      return res.send(books);
      //}
    })
    .catch(next);

  // Book.find({})
  //   .then(book => {
  //     res.send(book);
  //   })
  //   .catch(next);

  // Book.find({}, (err, books) => {
  //   if (err) return res.send(err);
  //   res.send(books);
  // });
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
