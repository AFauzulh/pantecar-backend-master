const express = require('express');
const router = express.Router();

const carAPI = require('../api/v1/car');

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

router.get('/:id', carAPI.getById)

router.post('/', fh.getMulter().fields([
    { name: 'images', maxCount: 5 }
]), carAPI.addCar)

module.exports = router;