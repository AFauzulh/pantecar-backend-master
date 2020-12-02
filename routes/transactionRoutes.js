const express = require('express');
const transactionAPI = require('../api/v1/transaction');

const router = express.Router();

router.get('/unverified', transactionAPI.getUnverifiedTransactions);

router.post('/', transactionAPI.makeTransaction);
router.post('/verify', transactionAPI.verifyTransaction);
router.post('/accept', transactionAPI.acceptTransaction);
router.post('/reject', transactionAPI.rejectTransaction);

module.exports = router;