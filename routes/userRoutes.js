const express = require('express');
const userAPI = require('../api/v1/user');

const router = express.Router();

router.post('/register-rental-shop', userAPI.registerRentalShop);

module.exports = router;