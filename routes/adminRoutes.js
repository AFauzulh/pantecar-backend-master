const express = require('express');
const router = express.Router();

const adminAPI = require('../api/v1/admin');

router.get('/admins', adminAPI.getAll);

module.exports = router;