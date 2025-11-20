//importing dependenicies here
const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const database = require("./config/database");

//importing routes here
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");

const PORT = process.env.PORT || 4000;

database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

//check if server is running
app.get("/", (req, res) => {
  res.send("server is running, check db");
});

//starting the server here
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
