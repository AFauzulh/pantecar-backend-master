const express = require('express');
const transactionAPI = require('../api/v1/transaction');

const router = express.Router();

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

const isUserAuth = require('../middleware/user-auth');
const haveRentalShop = require('../middleware/rentalShop-auth');

router.get('/unverified', haveRentalShop, transactionAPI.getUnverifiedTransactions);

router.post('/', isUserAuth, transactionAPI.makeTransaction);
router.post('/verify', haveRentalShop, transactionAPI.verifyTransaction);
router.post('/accept', haveRentalShop, transactionAPI.acceptTransaction);
router.post('/reject', haveRentalShop, transactionAPI.rejectTransaction);
router.post('/upload-receipt', isUserAuth, fh.getMulter().single('image'), transactionAPI.uploadPaymentReceipt);

module.exports = router;