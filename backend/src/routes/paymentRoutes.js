const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.createPayment);
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
