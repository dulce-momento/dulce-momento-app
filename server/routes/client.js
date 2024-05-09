const Router = require('express');
const router = new Router();

router.post('/signup', );
router.post('/signin', );
router.get('/auth', 
(req, res) => {res.json({message: "Success"});}
);

module.exports = router;