const express = require('express');
const router = express.Router();

router.get("/check", async (req, res, next) => {
    res.status(200).json({
        message: 'OK'
    });
});

router.post("/check-upload", async (req, res, next) => {
    console.log(req.file);
    console.log(req.body.name);
    const imageUrl = req.file.path.replace("\\", "/");
    console.log(imageUrl);
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