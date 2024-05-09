const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', clientController.registration);
router.post('/signin', clientController.login);
router.get('/auth', authMiddleware,clientController.check);

module.exports = router;