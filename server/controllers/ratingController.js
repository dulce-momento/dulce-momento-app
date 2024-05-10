const { Rating } = require('../models/models')
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');

class RatingController {
    async create(req, res, next) {
        const { rating, comment, productId } = req.body;
        let { clientId } = req.body;
        if (!clientId) {
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
        };
        const check = await Rating.findOne({ where: { productId: productId, clientId: clientId } });
        //console.log("Check: ", check);
        if (check)
            return res.json("Уже имеется отзыв");
        else {
            const r = await Rating.create({
                rating, comment, productId, clientId
            });
            return res.json(r);
        }
    }

    async getAll(req, res) {
        const ratings = await Rating.findAll()
        return res.json(ratings)
    }

    async deleteOne(req, res) {
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
        const check = await Rating.findOne({ where: { id } });
        if (!check)
            return res.status(403).json("Недоступно");
        if (check.dataValues.clientId == clientId || decodedToken.role == "ADMIN") {
            await Rating.destroy({ where: { id } });
            return res.json(id);
        }
        else
            return res.status(403).json("Недоступно");
    };
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const check = await Rating.findOne({
                where: { id }
            });
            if (check) {
                const bearertoken = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(bearertoken, process.env.SECRET_KEY);
                if (check.dataValues.clientId == decodedToken.id || decodedToken.role == "ADMIN") {
                    let { rating, comment } = req.body;
                    if (rating)
                        check.rating = rating;
                    if (comment)
                        check.comment = comment;
                    console.log("UPDATED: " +check.dataValues.rating + " " + check.dataValues.comment);
                    await check.save().then(() => console.log("UPDATED SUCCESSFULLY"));
                    return res.json(check);
                }
                else
                    return res.status(403).json("Недоступно");

            }
            else
                throw new Error("Отзыв не найден");
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };
}

module.exports = new RatingController()
