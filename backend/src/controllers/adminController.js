const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const admin = await User.findOne({ email: req.body.email, password: req.body.password, role: 'admin' });
        if (!admin) {
            return res.status(404).send({ message: 'Invalid credentials' });
        }
        res.status(200).send(admin);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const admin = new User({ ...req.body, role: 'admin' });
        await admin.save();
        res.status(201).send({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' });
        res.status(200).send(doctors);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' });
        res.status(200).send(patients);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await User.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: 'Patient not found' });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
