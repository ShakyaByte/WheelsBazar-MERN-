const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  Bikeid: {type: String, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Bike', bikeSchema);