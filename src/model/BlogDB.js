const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var postSchema = new Schema(
    {
        title: {
          type: String,
          required: true
        },
        desc: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          required: false,
        },
        username: {
          type: String,
          required: true,
        },
        categories: {
          type: Array,
          required: false,
        },
    },
      { timestamps: true }
);

var Posts = mongoose.model('posts', postSchema);

module.exports = Posts;