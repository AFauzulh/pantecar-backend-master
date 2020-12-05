const express = require('express');
const router = express.Router();

const adminAPI = require('../api/v1/admin');

const isAdminAuth = require('../middleware/admin-auth');

router.get('/admins', adminAPI.getAll);
router.get('/unverified-users', isAdminAuth, adminAPI.getUnverifiedUsers);
router.get('/unverified-rental-shop', isAdminAuth, adminAPI.getUnverifiedRentalShops);

router.post('/verify-user', isAdminAuth, adminAPI.verifyUser);
router.post('/verify-rental-shop', isAdminAuth, adminAPI.verifyRentalShop);

module.exports = router;