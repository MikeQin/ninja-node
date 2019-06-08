const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sample
const geometry = {
  type: "Point",
  coordinates: [125.6, 10.1]
};

// Create GeoLocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// Schema is data shape or structure
const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "title field is required"],
    unique: true // specifying `index: true` is optional if you do `unique: true`
  },
  price: {
    //type: Schema.Types.Decimal128,
    type: Number,
    required: [true, "price field is required"]
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

// Model is collection of data
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
