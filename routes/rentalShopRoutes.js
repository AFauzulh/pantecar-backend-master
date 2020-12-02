const express = require('express');
const rentalShopAPI = require('../api/v1/rentalShop');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

router.get('/cars', rentalShopAPI.getCars);

router.post('/add-car', fh.getMulter().fields([
    { name: 'images', maxCount: 5 }
]), rentalShopAPI.addCar);

router.post('/create', rentalShopAPI.registerRentalShop);

module.exports = router;