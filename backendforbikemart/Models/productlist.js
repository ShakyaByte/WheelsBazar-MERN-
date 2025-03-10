const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // Array of image URLs
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    createdAt: { type: Date, default: Date.now },
    condition: {type: String, required: true},
    year: {type: String, required: true},
    owners: {type: Number, required: true},
    location: {type: String, required: true},
    contact: {type: Number, required: true}
  }); 

  module.exports = mongoose.model("productlst", productSchema);