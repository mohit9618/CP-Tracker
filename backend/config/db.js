const mongoose = require("mongoose");

console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    // console.log("MongoDB Host:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Failed:");
    console.error(error);
    throw error;
  }
};

module.exports = connectDB;