const app = require('../../../index.js');
const request = require('supertest');
const assert = require('assert');
const jwt = require('jsonwebtoken');
// для запуска изменить БД на пустую и изменить models.js (sequelize),
// и index.js (убрать start, добавить module.exports)
// Для запуска тестов: npm run test
let token = undefined;
describe('ClientController', () => {
    describe('POST /signup', () => {
        it('Добавление клиента с ролью "ADMIN"', async () => {
            const response = await request(app)
                .post('/api/client/signup')
                .send({
                    name: 'John', surname: 'Doe', patronymic: null, email: 'john@example.com',
                    password: "testtest", role: "ADMIN"
                });
            token = response.body.token;
            const data = jwt.verify(response.body.token, process.env.SECRET_KEY);
            assert.strictEqual(response.status, 200);
            assert.strictEqual(data.role, 'ADMIN');
            assert.strictEqual(data.name, 'John');

        });
    });

    describe('POST /signin', () => {
        it('Авторизация созданного клиента/админа', async () => {
            const response = await request(app)
                .post('/api/client/signin')
                .send({
                    email: 'john@example.com',
                    password: "testtest"
                });
            token = response.body.token;
            const data = jwt.verify(response.body.token, process.env.SECRET_KEY);
            console.log(response.body.token);

            assert.strictEqual(response.status, 200);
            assert.strictEqual(data.role, 'ADMIN');
            assert.strictEqual(data.name, 'John');

        });
    });

    describe('POST /signin', () => {
        it('Попытка входа с неправильными данными', async () => {
            const response = await request(app)
                .post('/api/client/signin')
                .send({
                    email: 'john@example.com',
                    password: "testtestt"
                });
            assert.strictEqual(response.status, 500);

        });
    });

    describe('GET /auth', () => {
        it('Получение данных пользователя по JWToken', async () => {
            const response = await request(app)
                .get('/api/client/auth')
                .set({ "Authorization": "Bearer " + token })
                .send();
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.token, token);

        });
    });

});

describe('ProductController', () => {
    let id = undefined;
    describe('POST /product', () => {
        it('Добавление товара администратором', async () => {
            const response = await request(app)
                .post('/api/product')
                .set({ "Authorization": "Bearer " + token })
                .send({
                    name: 'TEST', price: 999, info: null
                });
            id = response.body.id;
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.name, 'TEST');
            assert.strictEqual(response.body.price, '999');

        });
    });

    describe('GET /product', () => {
        it('Получение товара по ID', async () => {
            const response = await request(app)
                .get(`/api/product/${id}`)
                .send();

            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.name, 'TEST');
            assert.strictEqual(response.body.price, '999');

        });
    });

    describe('PATCH /product', () => {
        it('Обновить созданный товар по ID', async () => {
            const response = await request(app)
                .patch(`/api/product/${id}`)
                .set({ "Authorization": "Bearer " + token })
                .send({
                    price: '9999',
                });

            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.price, '9999');

        });
    });
    let infoId = undefined;
    describe('POST /info', () => {
        it('Добавление информации о товаре по ID', async () => {
            const response = await request(app)
                .post('/api/info')
                .set({ "Authorization": "Bearer " + token })
                .send({
                    title: 'TEST', info: 'TESTED', productId: id
                });
            infoId = response.body.id;
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.body.title, 'TEST');
            assert.strictEqual(response.body.info, 'TESTED');

        });
    });

    describe('DELETE /info', () => {
        it('Удаление информации о товаре по ID', async () => {
            const response = await request(app)
                .delete(`/api/info/${infoId}`)
                .set({ "Authorization": "Bearer " + token })
                .send();

            assert.strictEqual(response.status, 200);

        });
    });

    describe('DELETE /product', () => {
        it('Удалить созданный товар по ID', async () => {
            const response = await request(app)
                .delete(`/api/product/${id}`)
                .set({ "Authorization": "Bearer " + token })
                .send();
            assert.strictEqual(response.status, 200);

        });
    });



});