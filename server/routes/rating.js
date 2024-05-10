const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN', 'USER']), ratingController.create);
router.get('/', ratingController.getAll);
router.delete('/:id', checkRole(['ADMIN', 'USER']), ratingController.deleteOne);
router.patch('/:id', checkRole(['ADMIN', 'USER']), ratingController.updateOne);

module.exports = router;