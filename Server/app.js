if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbUrl = "mongodb://localhost:27017/testProject";

const authRoute = require("./routes/authRoutes.js");
const photoRoute = require("./routes/photoRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

main()
  .then(console.log("Connection Successfull"))
  .catch((err) => console.log("Connection Failed"));

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(3000, () => {
  console.log("App listening on port 3000");
}); // add port

app.use("/", authRoute); // add authenticate route
app.use("/photo", photoRoute); // add photo route
