const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');
//router.delete('/:id',);

router.post('/', checkRole('ADMIN'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.delete('/:id', checkRole('ADMIN'), productController.deleteOne);
router.patch('/:id', checkRole('ADMIN'), productController.updateOne);

module.exports = router;