const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { serviceId } = req.body;

    if (!serviceId) {
        return res.status(400).json({ message: 'Please select a service' });
    }

    const booking = await Booking.create({
        user: req.user.id,
        service: serviceId,
        status: 'confirmed' // Default status
    });

    res.status(201).json(booking);
};

// @desc    Get bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
    let bookings;

    if (req.user.role === 'admin') {
        // Admin sees all bookings
        bookings = await Booking.find().populate('user', 'name email').populate('service', 'name price');
    } else {
        // User sees only their bookings
        bookings = await Booking.find({ user: req.user.id }).populate('service', 'name price');
    }

    res.status(200).json(bookings);
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
};
const cancelBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json(booking);
};
module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus,
    cancelBooking,
};
