const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((connection) => {
      console.log("db connected successfully");
      console.log(connection.connection.host);
    })
    .catch((err) => {
      console.log("connection to be couldnt be established"),
        console.error(err);
      process.exit(1);
    });
};
