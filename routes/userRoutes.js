const express = require('express');
const userAPI = require('../api/v1/user');

const router = express.Router();

router.get('/users', userAPI.fetchAll);
router.get('/:id', userAPI.getUserById);


module.exports = router;