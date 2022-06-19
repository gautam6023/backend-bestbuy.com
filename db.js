const mongoose = require("mongoose");

const connection = mongoose.connect(
  `mongodb+srv://gautamgohil07:mongo007@cluster0.oviy2.mongodb.net/?retryWrites=true&w=majority`
);

const ProductSchema = new mongoose.Schema({
  id: Number,
  imgUrl: String,
  title: String,
  rate: String,
  top: String,
  price: String,
  save: String,
  end: String,
  brand: [String],
  availability: [String],
  currantOffers: [String],
  _id: String,
});
const FilterdData = new mongoose.Schema({
  id: Number,
  imgUrl: String,
  title: String,
  rate: String,
  top: String,
  price: String,
  save: String,
  end: String,
  brand: [String],
  availability: [String],
  currantOffers: [String],
  _id: String,
});
const Product = mongoose.model("Product", ProductSchema);
const Filter = mongoose.model("filter", FilterdData);
module.exports = { Product, Filter, connection };
