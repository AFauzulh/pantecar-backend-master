const express = require('express');
const transactionAPI = require('../api/v1/transaction');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()


router.get('/unverified', transactionAPI.getUnverifiedTransactions);

router.post('/', transactionAPI.makeTransaction);
router.post('/verify', transactionAPI.verifyTransaction);
router.post('/accept', transactionAPI.acceptTransaction);
router.post('/reject', transactionAPI.rejectTransaction);
router.post('/upload-receipt', fh.getMulter().single('image'), transactionAPI.uploadPaymentReceipt);

module.exports = router;