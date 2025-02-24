const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017");

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
