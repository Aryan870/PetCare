const Billing = require('../models/Billing');

exports.createBilling = async (req, res) => {
    try {
        const billing = new Billing(req.body);
        await billing.save();
        res.status(201).send({ message: 'Billing created successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find().populate('appointmentId').populate('patientId').populate('doctorId');
        res.status(200).send(billings);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id).populate('appointmentId').populate('patientId');
        if (!billing) {
            return res.status(404).send({ message: 'Billing not found' });
        }
        res.status(200).send(billing);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.updateBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!billing) {
            return res.status(404).send({ message: 'Billing not found' });
        }
        res.status(200).send(billing);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.deleteBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndDelete(req.params.id);
        if (!billing) {
            return res.status(404).send({ message: 'Billing not found' });
        }
        res.status(200).send({ message: 'Billing deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.downloadBilling = async (req, res) => {
    try {
        // Placeholder for billing download logic
        res.status(200).send({ message: 'Billing downloaded successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
