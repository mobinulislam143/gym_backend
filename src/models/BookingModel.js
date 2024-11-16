const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'classes', required: true },
    booking_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true, versionKey: false });

const BookingModel = mongoose.model('bookings', bookingSchema);
module.exports = BookingModel;
