const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/database");
const UserRoutes = require("./routes/User");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

dbConnect();

app.use("/api/v1/user", UserRoutes);

app.get("/", (req, res) => {
  res.send("hello there");
});

app.listen(PORT, () => {
  console.log(`connection on ${PORT} established`);
});
