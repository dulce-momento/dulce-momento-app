const jwt = require('jsonwebtoken');

/**
 * Middleware для проверки аутентификации
 * @module authMiddleware
 */

/**
 * Функция проверки аутентификации пользователя.
 * @param {json} req - Информация запроса
 * @param {json} res - Информация ответа
 * @param {function} next - Следующая Middleware функция
 * @returns {json} - Ответ в формате JSON
 * @returns {void}
 */
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: "Не авторизован"});
    }
};
