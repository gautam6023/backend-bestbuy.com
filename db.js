const mongoose = require("mongoose");

const connection = mongoose.connect(
  `mongodb+srv://gautamgohil07:mongo007@cluster0.oviy2.mongodb.net/?retryWrites=true&w=majority`
);

const ProductSchema = new mongoose.Schema({
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
});
const FilterdData = new mongoose.Schema({
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
});

const CartSchema = new mongoose.Schema({
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
  qut: Number,
});
const Product = mongoose.model("Product", ProductSchema);
const Filter = mongoose.model("filter", FilterdData);
const Cart = mongoose.model("cartProduct", CartSchema);
module.exports = { Product, Filter, connection, Cart };
