const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send({ message: 'Appointment created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId').populate('patientId');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctorId').populate('patientId');
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.status(200).send({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.id }).populate('patientId');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAppointmentsByPatient = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.id }).populate('doctorId');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
