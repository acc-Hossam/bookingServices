const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getServices).post(protect, admin, createService);
router.route('/:id').get(protect, getServiceById).put(protect, admin, updateService).delete(protect, admin, deleteService);

module.exports = router;
