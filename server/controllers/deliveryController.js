const { Delivery, CartItem, Product } = require('../models/models')
const ApiError = require('../error/ApiError');
const { where, Op } = require('sequelize');
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

/**
 * Контроллер для модели Delivery {@link module:models}
 * @module DeliveryController
 */

/**
 * Класс контроллера для модели Delivery {@link module:models}
 */
class DeliveryController {
    /**
     * Добавление Delivery.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {Delivery} - Добавленная запись Delivery в формате JSON
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
        const { delivery, cart } = req.body;
        const { address, sum } = delivery;
        //console.log("CART");
        //console.log(delivery);
        const ids = cart.map(cartItem => cartItem.id);
        if (address === null)
            address = "?";
        const newdeli = await Delivery.create({ address: address, sum: sum, clientId: clientId });
        CartItem.update({ deliveryId: newdeli.id }, { where: { id: ids } });
        return res.json(newdeli);
    }

    /**
     * Вывод всех Delivery определенного клиента.
     * @param {json} req - Информация запроса (включая ID клиента)
     * @param {json} res - Информация ответа
     * @returns {Delivery[]} - Записи Delivery в формате JSON
     */
    async getAllByClientId(req, res, next) {
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
        const deliveries = await Delivery.findAll({ where: { clientId: clientId } });

        //console.log(JSON.stringify( deliveries[0]));
        return res.json(deliveries);
    }

    async getAllDeliveries(req, res, next) {
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                if (decodedToken.role != "ADMIN")
                    throw new Error("Нет доступа");
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const deliveries = await Delivery.findAll(
            {
                where: {
                    date: {
                        [Op.is]: null
                    }
                }
            }
        );
        //console.log(deliveries);

        return res.json(deliveries);
    }

    async updateDate(req, res, next) {
        let clientId;
        try {
            if (req.headers.authorization) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                if (decodedToken.role != "ADMIN")
                    throw new Error("Нет доступа");
            }
        }
        catch (e) {
            next(ApiError.internal(e.message));
        };
        const { id } = req.body;

        await Delivery.update({ date: Date.now(), status: "Обработано" }, { where: { id: id } });

        return res.json(id);
    }
}

module.exports = new DeliveryController()
