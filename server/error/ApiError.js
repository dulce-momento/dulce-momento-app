
/**
 * Класс ApiError, наследующийся от Error.
 * Используется для возврата кода ошибок для API.
 */
class ApiError extends Error{
    /**
     * 
     * @param {number} status - Статус ошибки
     * @param {string} message - Сообщение ошибки
     */
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(404, message);
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }
};

module.exports = ApiError;
