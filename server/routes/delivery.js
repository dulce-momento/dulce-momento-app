const Router = require('express');
const router = new Router();
const deliveryController = require('../controllers/deliveryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN', 'USER']), deliveryController.create);
router.get('/', checkRole(['ADMIN', 'USER']), deliveryController.getAllByClientId);
router.get('/all', checkRole(['ADMIN']), deliveryController.getAllDeliveries);
router.patch('/', checkRole(['ADMIN']), deliveryController.updateDate);

module.exports = router;