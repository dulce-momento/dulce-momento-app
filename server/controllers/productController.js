const uuid = require('uuid')
const path = require('path');
const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError');
const { unlink } = require('fs');
/**
 * Контроллер для модели Product {@link module:models}
 * @module productController
 */

/**
 * Класс контроллера для модели Product {@link module:models}
 */
class ProductController {
    /**
     * Добавление Product. 
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {Product} - Добавленная запись Product в формате JSON
     */
    async create(req, res, next) {
        try {
            let { name, price, info } = req.body;
            let fileName;
            console.log(req.body);
            if (req.files != null) {
                var { img } = req.files;
            }
            else {
                var img = null;
            }
            if (img != null) {
                console.log("NOT NULL");
                fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            else {
                fileName = null;
            }
            const product = fileName != null ? await Product.create({ name, price, img: fileName })
                : await Product.create({ name, price });
            console.log("INFO: " + info);

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        info: i.info,
                        productId: product.id
                    })
                );
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.internal(e.message));
        }

    };

    /**
     * Получение всех записей Product. 
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {Product[]} - Все записи Product в формате JSON
     */
    async getAll(req, res) {
        let { limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let products = await Product.findAndCountAll({ limit, offset });
        return res.json(products);
    };

    /**
     * Получение определенной записи Product. 
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {Product} - Найденная запись Product в формате JSON
     */
    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'product_infos' }]
            },
        );
        return res.json(product);
    };

    /**
     * Удаление определенной записи Product. 
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {number} - ID удаленной записи
     */
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id }
            });
            if (product) {
                if (product.dataValues.img != "fbe4a9ba-c229-4102-bbc7-e2f9f4f9e67a.jpg"
                ) {
                    await unlink(
                        path.resolve(__dirname, "..", "static", product.dataValues.img),
                        (error) => {
                            if (error) throw error;
                        }
                    );
                }
                await product.destroy({
                    where: { id }
                });
                return res.status(200).json({ message: `Продукт #${id} успешно удален` });
            }
            throw new Error("Продукт не найдет");
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    /**
     * Обновление определенной записи Product. 
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @returns {Product} - Обновленная запись Product в формате JSON
     */
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id }
            });
            if (product) {

                let { name, price, link } = req.body;
                const { img } = req.files || {};
                let fileName;
                if (img) {
                    fileName = uuid.v4() + ".jpg";
                    img.mv(path.resolve(__dirname, '..', 'static', fileName));
                    product.img = fileName;
                }
                else if (link) {
                    product.img = link;
                };
                if (name)
                    product.name = name;
                if (price)
                    product.price = price;
                await product.save();
                return res.json(product);
            }
            throw new Error("Продукт не найдет");
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new ProductController();
