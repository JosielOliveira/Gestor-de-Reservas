const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;