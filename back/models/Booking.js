const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    service: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' },
    status: {
        type: String,
        enum: ['confirmed', 'in_progress', 'completed', 'cancelled'],
        default: 'confirmed'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
