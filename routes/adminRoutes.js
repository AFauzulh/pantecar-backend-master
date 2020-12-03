const express = require('express');
const router = express.Router();

const adminAPI = require('../api/v1/admin');
const adminAuth = require('../middleware/admin-auth');

const isAdminAuth = require('../middleware/admin-auth');

router.get('/admins', adminAPI.getAll);
router.get('/unverified-users', adminAuth, adminAPI.getUnverifiedUsers);

router.post('/verify-user', adminAuth, adminAPI.verifyUser);

module.exports = router;