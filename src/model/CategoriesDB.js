const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var categorySchema = new Schema(
    {
        name: {
          type: String,
          required: true,
          unique: true,
        },
      },
      { timestamps: true }
    );

var Categories = mongoose.model('categories', categorySchema);

module.exports = Categories;