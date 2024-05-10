const sequelize = require('../db');
const { DataTypes } = require('sequelize');

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

const CartItem = sequelize.define('cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}
);

const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: true }
}
);

const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    info: { type: DataTypes.TEXT, allowNull: false }
}
);

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    comment: { type: DataTypes.TEXT, allowNull: false }
}
);

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

async function updateProductRating(productId) {
    const averageRating = await Rating.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
        where: { productId },
        raw: true,
    });
    await Product.update({ rating: parseInt(averageRating.averageRating) }, { where: { id: productId } });
};

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