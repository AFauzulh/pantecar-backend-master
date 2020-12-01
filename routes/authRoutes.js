const express = require('express');
const router = express.Router();

const authAPI = require('../api/auth/auth');

router.post('/login-user', authAPI.loginUser);
router.post('/signup-user', authAPI.signupUser);

module.exports = router;