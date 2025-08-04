const User = require('../models/User');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAvailableDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor', isAvailable: true }).select('-password');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id).select('-password');
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { isAvailable } = req.body;
        const doctor = await User.findByIdAndUpdate(id, { isAvailable }, { new: true });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllDoctors, getAvailableDoctors, getDoctorById, updateAvailability };