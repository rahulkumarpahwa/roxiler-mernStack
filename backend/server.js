const express = require("express");
const app = express();
require("dotenv").config();
const Product = require("./models/productModel.js");
const connectDB = require("./dbConfig/dbConfig.js");
const monthData = require("./utils/monthData.js");

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "server is started", success: true });
});

//initiating Data
app.get("/init", async (req, res) => {
  const data = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const jsonData = await data.json();
  await Product.deleteMany({}); //to empty the database first
  const newProductsData = await Product.insertMany(jsonData);
  res.json({
    message: "Products Data has been initialised in MongoDB",
    productData: newProductsData,
  });
});


//List of All Transactions 
app.get("/alltransactions/:month", async (req,res)=>{
const data = await monthData(req.params.month);

res.json({data})
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
  res.json({
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
  const priceRange = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  data.forEach((product) => {
    if (product.price >= 0 && product.price <= 100) {
      priceRange["0-100"] += 1;
    } else if (product.price >= 101 && product.price <= 200) {
      priceRange["101-200"] += 1;
    } else if (product.price >= 201 && product.price <= 300) {
      priceRange["201-300"] += 1;
    } else if (product.price >= 301 && product.price <= 400) {
      priceRange["301-400"] += 1;
    } else if (product.price >= 401 && product.price <= 500) {
      priceRange["401-500"] += 1;
    } else if (product.price >= 501 && product.price <= 600) {
      priceRange["501-600"] += 1;
    } else if (product.price >= 601 && product.price <= 700) {
      priceRange["601-700"] += 1;
    } else if (product.price >= 701 && product.price <= 800) {
      priceRange["701-800"] += 1;
    } else if (product.price >= 801 && product.price <= 900) {
      priceRange["801-900"] += 1;
    } else if (product.price >= 901) {
      priceRange["901-above"] += 1;
    }
  });

  res.json({ totalProducts: data.length, priceRange, data });
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

  res.json({ categoryList, categories, data });
});






















app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
  console.log(`server is listening at port ${process.env.PORT}`);
});
