const Router = require('express');
const router = new Router();

const clientRouter = require('./client');
const productRouter = require('./product');
const infoRouter = require('./productinfo');
const ratingRouter = require('./rating');
const cartRouter = require('./cartitem');
const deliveryRouter = require('./delivery');

router.use('/client', clientRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/delivery', deliveryRouter);
router.use('/rating', ratingRouter);
router.use('/info', infoRouter);


module.exports = router;