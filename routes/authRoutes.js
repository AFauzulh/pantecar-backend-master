const express = require('express');
const router = express.Router();

const authAPI = require('../api/auth/auth');

router.post('/login-user', authAPI.loginUser);
router.post('/signup-user', authAPI.signupUser);

router.post('/login-admin', authAPI.loginAdmin);
router.post('/signup-admin', authAPI.signupAdmin);

module.exports = router;