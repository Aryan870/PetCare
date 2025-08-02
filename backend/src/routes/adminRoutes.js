const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.get('/doctors', adminController.getAllDoctors);
router.get('/patients', adminController.getAllPatients);
router.get('/patients/:id', adminController.getPatientById);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
