const { ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
const sequelize = require('../db');
/**
 * Контроллер для модели ProductInfo {@link module:models}
 * @module infoController
 */

/**
 * Класс контроллера для модели ProductInfo {@link module:models}
 */
class InfoController {
    /**
     * Добавление ProductInfo.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {ProductInfo} - Добавленная запись ProductInfo в формате JSON
     */
    async create(req, res) {
        const { title, info, productId } = req.body
        const prinfo = await ProductInfo.create({ title, info, productId })
        return res.json(prinfo)
    }

    /**
     * Вывод всех ProductInfo.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {ProductInfo[]} - Записи ProductInfo в формате JSON
     */
    async getAll(req, res) {
        const infos = await ProductInfo.findAll();
        return res.json(infos);
    }

    /**
     * Вывод всех ProductInfo.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {number} - ID удаленной записи
     */
    async deleteOne(req, res) {
        const { id } = req.params;
        ProductInfo.destroy({ where: { id } });
        return res.json(id);
    }
    async getByProduct(req, res) {
        const { id } = req.params;
        const infos = ProductInfo.findAll({ where: { productId: id } });
        return res.json(infos);
    }
    async getUniqueTypes(req, res) {
        const infos = await ProductInfo.findAll(
            {
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('info')), 'info']],
                where: { title: 'Тип' }
            }
        );
        return res.json(infos);
    }
}

module.exports = new InfoController()
