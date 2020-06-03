const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/users");

const app = express();

const username = "tonysbabu";
const password = encodeURI("Password");

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0-lmdst.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("server/images")));

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("api server started on port 5000");
});
