const mongoose = require("mongoose");

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDb is connected with ${connection.port}`);
};

module.exports = connectDB;

