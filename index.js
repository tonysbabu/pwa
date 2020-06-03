const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 3000");
});
