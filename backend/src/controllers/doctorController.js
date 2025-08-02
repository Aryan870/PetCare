const User = require('../models/User');

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

module.exports = { getDoctorById };