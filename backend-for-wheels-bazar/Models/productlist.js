const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // Array of image URLs
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    createdAt: { type: Date, default: Date.now },
    year: {type: String, required: true},
    condition: { type: String, required: function () { return this.category === 'vehicle'; } },
    owners: { type: Number, required: function () { return this.category === 'vehicle'; } },
    category: {type: String, required: true, enum: ['Vehicle', 'Helmets', 'Gears', 'Bikeparts', 'Modifications', 'Maintenance','Other'],  set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()},
    location: {type: String, required: true},
    contact: {type: Number, required: true}
  }); 

  module.exports = mongoose.model("productlst", productSchema);