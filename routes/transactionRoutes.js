const express = require('express');
const transactionAPI = require('../api/v1/transaction');

const router = express.Router();

router.post('/', transactionAPI.makeTransaction);

module.exports = router;