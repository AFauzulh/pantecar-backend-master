const express = require('express');
const router = express.Router();

const adminAPI = require('../api/v1/admin');

const isAdminAuth = require('../middleware/admin-auth');

router.get('/admins', adminAPI.getAll);
router.get('/unverified-users', isAdminAuth, adminAPI.getUnverifiedUsers);

router.post('/verify-user', isAdminAuth, adminAPI.verifyUser);

module.exports = router;