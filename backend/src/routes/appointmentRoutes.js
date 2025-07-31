const router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/book', appointmentController.createAppointment);
router.get('/doctors/:id', appointmentController.getAppointmentsByDoctor);
router.get('/patient/:id', appointmentController.getAppointmentsByPatient);

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
