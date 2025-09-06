const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const database = require("./config/database");
const courseRoutes = require("./routes/Course");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const contactUsRoute = require("./routes/Contact");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
database.connect();
app.use(cors());
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.get("/", async (req, res) => {
  res.send("your db is running, go do some magic");
});

app.listen(PORT, () => {
  console.log("connection established on port:", PORT);
});
