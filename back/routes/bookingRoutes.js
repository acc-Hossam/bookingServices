const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking).get(protect, getBookings);
router.route('/:id/status').patch(protect, admin, updateBookingStatus);

module.exports = router;
