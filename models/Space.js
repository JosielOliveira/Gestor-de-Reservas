const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true }
});

const Space = mongoose.model('Space', spaceSchema);
module.exports = Space;