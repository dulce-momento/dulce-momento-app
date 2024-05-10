const Router = require('express');
const router = new Router();
const productInfoController = require('../controllers/infoController');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/', checkRole('ADMIN'), productInfoController.create);
router.get('/', productInfoController.getAll);
router.delete('/:id', checkRole('ADMIN'), productInfoController.deleteOne);

module.exports = router;