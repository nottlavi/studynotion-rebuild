const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongodburl = process.env.DATABASE_URL;

const dbConnect = () => {
  try {
    mongoose
      .connect(mongodburl)
      .then(console.log("connection to db established"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("error occured while connecting to db");
  }
};

module.exports = dbConnect;
