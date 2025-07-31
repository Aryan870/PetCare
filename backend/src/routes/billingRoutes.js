const router = require('express').Router();
const billingController = require('../controllers/billingController');

router.post('/', billingController.createBilling);
router.get('/', billingController.getAllBillings);
router.get('/:id', billingController.getBillingById);
router.put('/:id', billingController.updateBilling);
router.delete('/:id', billingController.deleteBilling);
router.get('/:id/download', billingController.downloadBilling);


module.exports = router;
