require("dotenv").config();
const express = require("express");
// db.productsData.find({title:/a/i})
const cors = require("cors");
const app = express();
const { connection, Product, Filter, Cart } = require("./db");
app.disable("etag");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
// app.get("/", (req, res) => {
//   res.send("Welcone to Movie Data Base => /productsData");
// });
//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/products", async (req, res) => {
  // console.log(req.query);
  let { page, per_page } = req.query;

  page = page || 1;
  per_page = per_page || 100;

  let offset = (+page - 1) * +per_page;

  try {
    // availibality: { $in: req.query.availibality },

    const productsData = await Product.find()

      .skip(offset)
      .limit(per_page)
      .lean()
      .exec();

    const totalUsers = await Product.find().countDocuments().lean().exec();
    let totalPage = Math.ceil(totalUsers / per_page);
    return res.status(200).json({ data: productsData, totalPage });

    // res.status(200).json({ data: productsData, totalPage });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const productsData = await Product.findById(id);
    return res.status(200).json({ data: productsData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/filter", async (req, res) => {
  //For single serach give url
  //http://localhost:8080/movies?_id=62a24c0f379b6f2d6da95d9a

  // console.log(req.query);
  let { page, per_page } = req.query;

  page = page || 1;
  per_page = per_page || 100;

  let offset = (+page - 1) * +per_page;

  if (page && per_page) {
    delete req.query.page;
    delete req.query.per_page;
  }
  console.log(req.query);
  try {
    // availibality: { $in: req.query.availibality },
    if (
      req.query.availability &&
      req.query.currantOffers &&
      req.query.filterBrands
    ) {
      const movies = await Product.find({
        availability: { $in: req.query.availability },
        brand: { $in: req.query.filterBrands },
        currantOffers: { $in: req.query.currantOffers },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.availability && req.query.currantOffers) {
      const movies = await Product.find({
        availability: { $in: req.query.availability },
        currantOffers: { $in: req.query.currantOffers },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.currantOffers && req.query.filterBrands) {
      const movies = await Product.find({
        brand: { $in: req.query.filterBrands },
        currantOffers: { $in: req.query.currantOffers },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.availability && req.query.filterBrands) {
      const movies = await Product.find({
        availability: { $in: req.query.availability },
        brand: { $in: req.query.filterBrands },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find().countDocuments().lean().exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.availability) {
      const movies = await Product.find({
        availability: { $in: req.query.availability },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.currantOffers) {
      const movies = await Product.find({
        currantOffers: { $in: req.query.currantOffers },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else if (req.query.filterBrands) {
      const movies = await Product.find({
        brand: { $in: req.query.filterBrands },
      })

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);

      return res.status(200).json({ data: movies, totalPage });
    } else {
      const movies = await Product.find()

        .skip(offset)
        .limit(per_page)
        .lean()
        .exec();

      const totalUsers = await Product.find(req.query)
        .countDocuments()
        .lean()
        .exec();

      // console.log(totalUsers);
      let totalPage = Math.ceil(totalUsers / per_page);
      res.status(200).json({ data: movies, totalPage });
    }
    // res.status(200).json({ data: movies, totalPage });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const productsData = await Product.create(req.body);
    return res.status(201).json(productsData);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/", async (req, res) => {
  try {
    return res.status(201).json("Welcome");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
app.post("/cart", async (req, res) => {
  try {
    const productsData = await Cart.create(req.body);
    return res.status(201).json(productsData);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const productsData = await Cart.find();
    return res.status(201).json(productsData);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    //  findByIdAndDelete({ _id: req.params.id });
    // deleteOne({ id: req.params.id });
    // findOneAndDelete({ property: of data   });
    console.log(req.params);
    const movies = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json({ data: movies });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.patch("/cart/:id", async (req, res) => {
  try {
    console.log(req.params);
    const updateMovies = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({ data: updateMovies });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
// app.post("/filter", async (req, res) => {
//   try {
//     console.log(req.body);
//     const productsData = await Filter.create(req.body);
//     return res.status(201).json(productsData);
//   } catch (e) {
//     return res.status(500).json({ message: e.message });
//   }
// });
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server Connected to port 8080");
  } catch (e) {
    console.error(e);
  }
});
