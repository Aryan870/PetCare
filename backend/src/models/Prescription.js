const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicines: [{ name: String, dosage: String, frequency: String }],
    notes: { type: String },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
