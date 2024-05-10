const {ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');

class InfoController {
    async create(req, res) {
        const {title, info, productId} = req.body
        const brand = await ProductInfo.create({title, info, productId})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await ProductInfo.findAll()
        return res.json(brands)
    }

    async deleteOne(req, res) {
        const {id} = req.params;
        ProductInfo.destroy({where: {id}});
        return res.json(id);
    }
}

module.exports = new InfoController()
