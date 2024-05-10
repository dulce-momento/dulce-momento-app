const sequelize = require('../db');
const { DataTypes } = require('sequelize');

/**
 * Модели sequelize для работы с таблицами PostgreSQL
 * @module models
 */

/**
 * Модель Client
 * @typedef {Client} Client
 * @property {number} id - ID клиента
 * @property {string} name - Имя
 * @property {string} surname - Фамилия
 * @property {string} patronymic - Отчество
 * @property {string} email - E-Mail
 * @property {string} password - Пароль
 * @property {string} role - Роль
 */
const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
}
);

/**
 * Модель CartItem (Корзина)
 * @typedef {CartItem} CartItem
 * @property {number} id - ID корзины
 */
const CartItem = sequelize.define('cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}
);

/**
 * Модель Product
 * @typedef {Product} Product
 * @property {number} id - ID товара
 * @property {string} name - Наименование
 * @property {decimal} price - Цена
 * @property {number} rating - Средний рейтинг
 * @property {string} img - Путь к изображению
 */
const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: true }
}
);

/**
 * Модель ProductInfo (Информация о товаре)
 * @typedef {ProductInfo} ProductInfo
 * @property {number} id - ID характеристики
 * @property {string} title - Название характеристики
 * @property {string} info - Информация о характеристике

 */
const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    info: { type: DataTypes.TEXT, allowNull: false }
}
);

/**
 * Модель Rating (Отзыв)
 * @typedef {Rating} Rating
 * @property {number} id - ID отзыва
 * @property {number} rating - Числовой рейтинг (от 0 до 5)
 * @property {text} comment - Комментарий к отзыву
 */
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    comment: { type: DataTypes.TEXT, allowNull: false }
}
);

/**
 * Модель Delivery
 * @typedef {Delivery} Delivery
 * @property {number} id - ID Доставки
 * @property {string} address - Адрес доставки
 * @property {date} date - Дата завершения доставки
 */
const Delivery = sequelize.define('delivery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: true }
}
);


/// adds client id fk to rating
Client.hasMany(Rating, { onDelete: 'CASCADE' });
Rating.belongsTo(Client);

Product.hasMany(CartItem, { onDelete: 'CASCADE' });
CartItem.belongsTo(Product);

Client.hasMany(CartItem, { onDelete: 'CASCADE' });
CartItem.belongsTo(Client);

Product.hasMany(ProductInfo, { onDelete: 'CASCADE' });
ProductInfo.belongsTo(Product);

Product.hasMany(Rating, { onDelete: 'CASCADE' });
Rating.belongsTo(Product);

Delivery.hasMany(CartItem, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
CartItem.belongsTo(Delivery);

Rating.afterCreate(async (rating, options) => {
    await updateProductRating(rating.productId);
});

Rating.afterUpdate(async (rating, options) => {
    await updateProductRating(rating.productId);
});

Rating.afterDestroy(async (rating, options) => {
    await updateProductRating(rating.productId);
});

/**
 * Обновить рейтинг товара при добавлении, изменении или удалении отзыва на товар.
 * Обновляет рейтинг товара на среднее значение суммы рейтингов всех отзывов о товаре. 
 * @param {number} productId - Идентификатор товара
 * @returns {void}
 */
async function updateProductRating(productId) {
    const averageRating = await Rating.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
        where: { productId },
        raw: true,
    });
    await Product.update({ rating: parseInt(averageRating.averageRating) }, { where: { id: productId } });
};

/**
 * Синхронизация моделей с БД PostgreSQL при обновлении структуры.
 */
sequelize.sync()
    .then(() => {
        console.log("Models synchronized");
    })
    .catch((e) => {
        console.log(`Error synchronizing ${e}`);
    });

module.exports = {
    Client, CartItem, Product, ProductInfo, Delivery, Rating
};