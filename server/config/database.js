const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("connection to db successfull");
    })
    .catch((err) => {
      console.error(err);
      console.log("error in connection to database");
    });
};
