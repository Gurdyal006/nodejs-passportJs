const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    requiredL: true,
    minLength: [4, "Password too short"]
  },
});

mongoose.models = {};

const User = mongoose.model("Users", userSchema);

module.exports = User;
