const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN', 'USER']), cartController.create);
router.get('/', checkRole(['ADMIN', 'USER']),cartController.getAllByClientId);
router.delete('/:id', checkRole(['ADMIN', 'USER']), cartController.deleteOne);
router.get('/:id', checkRole(['ADMIN', 'USER']), cartController.getByProduct);
router.patch('/', checkRole(['ADMIN', 'USER']), cartController.setDeliveryId);
router.get('/check/:id', checkRole(['ADMIN', 'USER']), cartController.checkIfBoughtPreviously);

module.exports = router;