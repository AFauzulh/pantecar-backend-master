const express = require('express');
const transactionAPI = require('../api/v1/transaction');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

const isUserAuth = require('../middleware/user-auth');


router.get('/unverified', transactionAPI.getUnverifiedTransactions);

router.post('/', isUserAuth, transactionAPI.makeTransaction);
router.post('/verify', transactionAPI.verifyTransaction);
router.post('/accept', transactionAPI.acceptTransaction);
router.post('/reject', transactionAPI.rejectTransaction);
router.post('/upload-receipt', isUserAuth, fh.getMulter().single('image'), transactionAPI.uploadPaymentReceipt);

module.exports = router;