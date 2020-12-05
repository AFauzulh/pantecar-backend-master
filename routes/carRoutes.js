const express = require('express');
const router = express.Router();

const carAPI = require('../api/v1/car');

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

const haveRentalShop = require('../middleware/rentalShop-auth');

router.get('/cars', carAPI.getAll)
router.get('/:id', carAPI.getById)
router.get('/', carAPI.getByCityOrCarName)

router.post('/', haveRentalShop, fh.getMulter().fields([
    { name: 'images', maxCount: 5 }
]), carAPI.addCar)

module.exports = router;