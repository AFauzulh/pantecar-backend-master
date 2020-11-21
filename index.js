const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

const sequelize = require('./database/database');

app.use(bodyParser.json());
app.use(cors());

sequelize
    .sync()
    .then(() => {
        app.listen(PORT);
    })