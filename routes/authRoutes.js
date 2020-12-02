const express = require('express');
const router = express.Router();

const authAPI = require('../api/auth/auth');

const { FileUploadHelper } = require('../helpers/file-upload-helper');
const fh = new FileUploadHelper()

router.post('/login-user', authAPI.loginUser);
router.post('/signup-user', fh.getMulter().single('image'), authAPI.signupUser);

router.post('/login-admin', authAPI.loginAdmin);
router.post('/signup-admin', authAPI.signupAdmin);

module.exports = router;