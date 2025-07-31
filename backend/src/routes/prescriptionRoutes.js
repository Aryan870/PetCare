const router = require('express').Router();
const prescriptionController = require('../controllers/prescriptionController');

router.post('/', prescriptionController.createPrescription);
router.get('/', prescriptionController.getAllPrescriptions);
router.get('/:id', prescriptionController.getPrescriptionById);
router.put('/:id', prescriptionController.updatePrescription);
router.delete('/:id', prescriptionController.deletePrescription);
router.get('/:id/download', prescriptionController.downloadPrescription);
router.get('/patient/:id', prescriptionController.getPrescriptionsByPatient);


module.exports = router;
