const express = require('express');
const rentalShopAPI = require('../api/v1/rentalShop');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

router.post('/create', rentalShopAPI.registerRentalShop);

module.exports = router;