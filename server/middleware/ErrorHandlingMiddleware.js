const ApiError = require('../error/ApiError');

/**
 * Middleware для обработки ошибок
 * @module ErrorHandlingMiddleware
 */

/**
 * Функция обработки ошибок.
 * @param {Error} err - Ошибка
 * @param {json} req - Информация запроса
 * @param {json} res - Информация ответа
 * @param {function} next - Следующая Middleware функция
 * @returns {json} - Ответ в формате JSON
 */
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
