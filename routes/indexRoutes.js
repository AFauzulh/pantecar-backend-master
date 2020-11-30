const express = require('express');
const router = express.Router();

router.get("/check", (req, res, next) => {
    res.status(200).json({
        message: 'OK'
    });
});

router.post("/check-post", (req, res, next) => {
    res.status(200).json({
        message: 'OK',
        data: { ...req.body }
    });
});

module.exports = router;