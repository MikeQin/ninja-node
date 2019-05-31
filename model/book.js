const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "title field is required"]
  },
  price: {
    type: Number,
    required: [true, "price field is required"]
  },
  available: {
    type: Boolean,
    default: false
  }
});

const Book = mongoose.model("BOOK", BookSchema);

module.exports = Book;
