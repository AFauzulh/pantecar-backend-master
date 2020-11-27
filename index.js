const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

// Routes
const Routes = require('./routes/Router');

// Database
const { sequelize } = require('./database/database');
const ModelBuilder = require('./models/Builder/ModelBuilder');
const modelBuilder = new ModelBuilder();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const routes = new Routes(app);

app.use((error, req, res, next) => {
    console.log(error);

    const data = error.data || "";

    res.status(error.statusCode || 500).json({
        message: error.message,
        data: data
    })
});

sequelize
    .sync({ force: true })
    .then(() => {
        app.listen(PORT);
    });