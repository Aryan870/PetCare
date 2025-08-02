const router = require('express').Router();
const { getDoctorById } = require('../controllers/doctorController');

router.get('/:id', getDoctorById);

module.exports = router;