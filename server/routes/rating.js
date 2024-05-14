const Router = require('express');
const router = new Router();
const ratingController = require('../controllers/ratingController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN', 'USER']), ratingController.create);
router.get('/:id', ratingController.getAllByProductId);
router.delete('/:id', checkRole(['ADMIN', 'USER']), ratingController.deleteOne);
router.patch('/:id', checkRole(['ADMIN', 'USER']), ratingController.updateOne);
router.get('/check/:id', checkRole(['ADMIN', 'USER']), ratingController.checkIfCanReview);

module.exports = router;