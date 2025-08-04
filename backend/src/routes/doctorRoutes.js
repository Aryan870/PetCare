const router = require('express').Router();
const { getAllDoctors, getAvailableDoctors, getDoctorById, updateAvailability } = require('../controllers/doctorController');

router.get('/', getAllDoctors);
router.get('/available', getAvailableDoctors);
router.get('/:id', getDoctorById);
router.put('/:id/availability', updateAvailability);

module.exports = router;