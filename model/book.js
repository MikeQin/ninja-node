const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: Number,
    required: [true, "Id field is required"]
  },
  title: {
    type: String,
    required: [true, "Title field is required"]
  },
  available: {
    type: Boolean,
    default: false
  }
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;
