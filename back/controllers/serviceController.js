const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    const services = await Service.find({ isActive: true });
    res.status(200).json(services);
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ message: 'Please add required fields' });
    }

    const service = await Service.create(req.body);
    res.status(201).json(service);
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedService);
};

// @desc    Delete a service (Soft delete usually needed, but hard delete for now)
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
};
