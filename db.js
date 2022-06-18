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

// const main = async () => {
//   const conn = await connection;

//   console.log("Connected successfully");

//   const movie = new Movie({
//     poster_path: "/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg",
//     video: false,
//     vote_average: 6.8,
//     overview:
//       "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers.",
//     id: 338953,
//     vote_count: 1592,
//     adult: false,
//     backdrop_path: "/7ucaMpXAmlIM24qZZ8uI9hCY0hm.jpg",
//     title: "Fantastic Beasts: The Secrets of Dumbledore",
//     genre_ids: [14, 12, 28],
//     release_date: "2022-04-06",
//     original_language: "en",
//     original_title: "Fantastic Beasts: The Secrets of Dumbledore",
//     popularity: 5488.223,
//     media_type: "movie",
//   });

//   await movie.save();
//   // console.log("Movie Saved");

//   //Print all movie
//   // const productsData = await Movie.find();
//   // console.log(productsData);

//   conn.disconnect();
// };

// main();
