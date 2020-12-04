const express = require('express');
const rentalShopAPI = require('../api/v1/rentalShop');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

const isUserAuth = require('../middleware/user-auth');

router.post('/create', isUserAuth, rentalShopAPI.registerRentalShop);

module.exports = router;