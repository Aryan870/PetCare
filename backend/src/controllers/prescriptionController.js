const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).send({ message: 'Prescription created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().populate('appointmentId').populate('doctorId').populate('patientId');
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('appointmentId').populate('doctorId').populate('patientId');
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found' });
        }
        res.status(200).send(prescription);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.updatePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found' });
        }
        res.status(200).send(prescription);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deletePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!prescription) {
            return res.status(404).send({ message: 'Prescription not found' });
        }
        res.status(200).send({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.downloadPrescription = async (req, res) => {
    try {
        // Placeholder for prescription download logic
        res.status(200).send({ message: 'Prescription downloaded successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getPrescriptionsByPatient = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patientId: req.params.id }).populate('appointmentId').populate('doctorId').populate('patientId');
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
