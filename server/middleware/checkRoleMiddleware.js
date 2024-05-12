const jwt = require('jsonwebtoken');

/**
 * Middleware для проверки авторизации
 * @module checkRoleMiddleware
 */

/**
 * Функция проверки авторизации пользователя по роли
 * @param {string} role - Роль пользователя
 * @param {string[]} role - Массив ролей пользователя
 * @returns {json} - Ответ в формате JSON
 * @returns {void}
 */
module.exports = function (role) {

    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (Array.isArray(role)) {
                if (!role.includes(decoded.role)) {
                    return res.status(403).json({ message: "Нет доступа" });
                }
            }
            else
                if (decoded.role !== role) {
                    return res.status(403).json({ message: "Нет доступа" });
                }
            req.client = decoded;
            next();
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" });
        }
    };
};



