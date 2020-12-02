const express = require('express');
const router = express.Router();

const carAPI = require('../api/v1/car');

router.get('/:id', carAPI.getById)

module.exports = router;