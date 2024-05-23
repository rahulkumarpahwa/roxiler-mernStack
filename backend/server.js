const express = require("express");
const app = express();
require("dotenv").config();
const Product = require("./models/productModel.js");
const connectDB = require("./dbConfig/dbConfig.js");
const monthData = require("./utils/monthData.js");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:1234", "http://localhost:5173"],
    methods: ["GET"],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  return res.json({ message: "server is started", success: true });
});

//initiating Data
app.get("/init", async (req, res) => {
  const data = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const jsonData = await data.json();
  await Product.deleteMany({}); //to empty the database first
  const newProductsData = await Product.insertMany(jsonData);
  return res.json({
    message: "Products Data has been initialised in MongoDB",
    productData: newProductsData,
  });
});

//List of All Transactions
app.get("/alltransactions/:month", async (req, res) => {
  const data = await monthData(req.params.month);
  const { search, page } = req.query;
  const filter = data.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.price.toString().toLowerCase().includes(search.toLowerCase())
  );

  const pages = filter.length / 10;

  return res.json({
    keyword: search,
    page: page,
    total: data.length,
    searchItems: filter.length,
    allProducts: filter,
  });
});

// statistics
app.get("/statistics/:month", async (req, res) => {
  const data = await monthData(req.params.month);

  //total amount
  let totalAmount = 0;
  data.forEach((product) => (totalAmount += product.price));

  //items sold and unsold
  const soldItems = data.filter((product) => product.sold === true).length;
  const notSoldItems = data.length - soldItems;
  return res.json({
    month: req.params.month,
    totalAmount,
    soldItems,
    notSoldItems,
    monthData: data,
  });
});

//bar chart
app.get("/barchart/:month", async (req, res) => {
  const data = await monthData(req.params.month);
  const priceRange = [
    { "0-100": 0, item: 0, year: "0-100" },
    { "101-200": 0, item: 0, year: "101-200" },
    { "201-300": 0, item: 0, year: "201-300" },
    { "301-400": 0, item: 0, year: "301-400" },
    { "401-500": 0, item: 0, year: "401-500" },
    { "501-600": 0, item: 0, year: "501-600" },
    { "601-700": 0, item: 0, year: "601-700" },
    { "701-800": 0, item: 0, year: "701-800" },
    { "801-900": 0, item: 0, year: "801-900" },
    { "901-above": 0, item: 0, year: "901-above" },
  ];

  data.forEach((product) => {
    if (product.price >= 0 && product.price <= 100) {
      priceRange[0]["0-100"] += 1;
      priceRange[0].item +=1;
    } else if (product.price >= 101 && product.price <= 200) {
      priceRange[1]["101-200"] += 1;
      priceRange[1].item += 1;
    } else if (product.price >= 201 && product.price <= 300) {
      priceRange[2]["201-300"] += 1;
      priceRange[2].item += 1;
    } else if (product.price >= 301 && product.price <= 400) {
      priceRange[3]["301-400"] += 1;
      priceRange[3].item += 1;
    } else if (product.price >= 401 && product.price <= 500) {
      priceRange[4]["401-500"] += 1;
      priceRange[4].item += 1;
    } else if (product.price >= 501 && product.price <= 600) {
      priceRange[5]["501-600"] += 1;
      priceRange[5].item += 1;
    } else if (product.price >= 601 && product.price <= 700) {
      priceRange[6]["601-700"] += 1;
      priceRange[6].item += 1;
    } else if (product.price >= 701 && product.price <= 800) {
      priceRange[7]["701-800"] += 1;
      priceRange[7].item += 1;
    } else if (product.price >= 801 && product.price <= 900) {
      priceRange[8]["801-900"] += 1;
      priceRange[8].item += 1;
    } else if (product.price >= 901) {
      priceRange[9]["901-above"] += 1;
      priceRange[9].item += 1;
    }
  });

  return res.json({ totalProducts: data.length, priceRange, data });
});

//pie chart
app.get("/piechart/:month", async (req, res) => {
  const data = await monthData(req.params.month);
  const categories = data
    .map((product) => product.category) //finding all categories
    .filter((value, index, array) => array.indexOf(value) === index); //making the categories unique

  const categoryList = [];
  categories.forEach((item) => {
    const filterData = data.filter((product) => product.category === item);
    const obj = { category: item, count: filterData.length };
    categoryList.push(obj);
  });

  return res.json({ categoryList, categories, data });
});

//combined api
app.get("/combined/:month", async (req, res) => {
  const month = req.params.month;
  const response1 = await fetch(`${process.env.URL}/statistics/${month}`);
  const resJson1 = await response1.json();
  const response2 = await fetch(`${process.env.URL}/barchart/${month}`);
  const resJson2 = await response2.json();
  const response3 = await fetch(`${process.env.URL}/piechart/${month}`);
  const resJson3 = await response3.json();

  return res.json([
    { Statistics: resJson1 },
    { BarChart: resJson2 },
    { PieChart: resJson3 },
  ]);
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
  console.log(`server is listening at port ${process.env.PORT}`);
});
