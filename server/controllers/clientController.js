const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Client} = require('../models/models');
/**
 * Контроллер для модели Client {@link module:models}
 * @module clientController
 */

/**
 * Генерирует JWT Token для клиента
 * @param {number} id - ID клиента
 * @param {string} email - E-Mail клиента
 * @param {string} role - Роль клиента 
 * @returns {string} - JWT Token
 */
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};

/**
 * Класс контроллера для модели Client {@link module:models}
 */
class ClientController {
    /**
     * Регистрация пользователя.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @param {function} next - Следующая Middleware функция
     * @returns {json} - JWT Token
     * @returns {function} - Функция обработки ошибки
     */
    async registration(req, res, next) {
        const {name, surname, patronymic, email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный E-Mail или пароль'));
        }
        const candidate = await Client.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким E-Mail уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const client = await Client.create({name, surname, patronymic, email, role, password: hashPassword});
        const token = generateJwt(client.id, client.email, client.role);
        return res.json({token});
    }

    /**
     * Вход пользователя.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @param {function} next - Следующая Middleware функция
     * @returns {json} - JWT Token
     * @returns {function} - Функция обработки ошибки
     */
    async login(req, res, next) {
        const {email, password} = req.body;
        const client = await Client.findOne({where: {email}});
        if (!client) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, client.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(client.id, client.email, client.role);
        return res.json({token});
    }

    /**
     * Проверка JWT Token.
     * @param {json} req - Информация запроса
     * @param {json} res - Информация ответа
     * @param {function} next - Следующая Middleware функция
     * @returns {json} - JWT Token
     */
    async check(req, res, next) {
        const token = generateJwt(req.client.id, req.client.email, req.client.role);
        return res.json({token});
    }
}

module.exports = new ClientController();
