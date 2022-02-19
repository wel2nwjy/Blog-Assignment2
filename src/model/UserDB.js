const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        profilePic: {
          type: String,
          default: "",
        },
      },
      { timestamps: true }
    );

var Users = mongoose.model('users', userSchema);

module.exports = Users;