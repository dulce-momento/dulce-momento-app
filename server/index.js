require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


//последний middleware
app.use(errorHandler);

app.get('/', (req, res) =>{
    res.status(200).json({message: "200 Working :))"});
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};

start();

//npm run dev to start