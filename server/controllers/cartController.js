const { CartItem, Product } = require('../models/models')
const ApiError = require('../error/ApiError');
const { where, Op } = require('sequelize');
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

/**
 * Контроллер для модели CartItem {@link module:models}
 * @module CartController
 */

/**
 * Класс контроллера для модели CartItem {@link module:models}
 */
class CartController {
    /**
     * Добавление CartItem.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {CartItem} - Добавленная запись CartItem в формате JSON
     */
    async create(req, res, next) {
        let clientId;
        console.log(jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY));
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
                //console.log(decodedToken);
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const { productId } = req.body;
        if(productId==null){
            return res.status(500);
        }
        const cartitem = await CartItem.create({productId, clientId });
        return res.json(cartitem);
    }

    /**
     * Вывод всех CartItem определенного клиента.
     * @param {json} req - Информация запроса (включая ID клиента)
     * @param {json} res - Информация ответа
     * @returns {CartItem[]} - Записи CartItem в формате JSON
     */
    async getAllByClientId(req, res, next) {
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
                //console.log(decodedToken);
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const cartitems = await CartItem.findAll({where: {clientId: clientId, deliveryId: null }, include: Product});
        return res.json(cartitems);
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;
        let clientId;
        let decodedToken;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
                //console.log(decodedToken);
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const check = await CartItem.findOne({ where: { id } });
        if (!check)
            return res.status(403).json("Недоступно");
        if (check.dataValues.clientId == clientId || decodedToken.role == "ADMIN") {
            await CartItem.destroy({ where: { id } });
            return res.json(id);
        }
        else
            return res.status(403).json("Недоступно");
    };

    async getByProduct(req, res, next) {
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
                //console.log(decodedToken);
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const { productId } = req.params;
        const cartItem = CartItem.findOne({ where: { clientId: clientId, productId: productId } });
        return res.json(cartItem);
    }

    async setDeliveryId(req, res, next){
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
                //console.log(decodedToken);
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };

        const { deliveryId, cartItems } = req.body;
        const ids = cartItems.map(cartItem => cartItem.id);
        //const prices = cartItems.map(cartItems => cartItems.product.price);
        //const sum = prices.reduce((partSum, a) => (partSum + Number(a)), 0);
        //console.log(prices.reduce((partSum, a) => (partSum + Number(a)), 0));
        const cart = CartItem.update({deliveryId:deliveryId}, {where: { id: ids }});
        return res.json(cart);
    }

    async checkIfBoughtPreviously(req, res, next){
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                clientId = decodedToken.id;
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const { id } = req.params;

        const rating = await CartItem.findOne( {where: {clientId: clientId, productId: id, deliveryId:{[Op.not]: null}}});

        return res.json(rating);
    }
}

module.exports = new CartController()
