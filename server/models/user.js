const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imagePath: { type: String, required: false }
});

module.exports = mongoose.model("User", userSchema);
