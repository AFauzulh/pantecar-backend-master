const express = require('express');
const router = express.Router();

const authAPI = require('../api/auth/auth');

router.post('/login-user', authAPI.loginUser);

module.exports = router;