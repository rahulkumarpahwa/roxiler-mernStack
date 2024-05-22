const Product = require("../models/productModel.js");

const monthData = async (month) => {
  const allProducts = await Product.find({});
  const filteredProducts = allProducts.filter(
    (product) => product.dateOfSale.toString().slice(5, 7) === month.toString()
  );
  // console.log(filteredProducts);
  return filteredProducts;
};

module.exports = monthData;
