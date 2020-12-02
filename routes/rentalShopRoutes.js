const express = require('express');
const rentalShopAPI = require('../api/v1/rentalShop');

const router = express.Router();

router.get('/cars', rentalShopAPI.getCars);

router.post('/verify-transaction', rentalShopAPI.verifyTransaction);
router.post('/add-car', rentalShopAPI.addCar);

module.exports = router;