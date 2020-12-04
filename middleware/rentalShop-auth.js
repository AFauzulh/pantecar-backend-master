const jwt = require('jsonwebtoken');
const RentalShop = require('../models/RentalShop');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    console.log(authHeader);

    if (!authHeader) {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        next(error);
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }

    if (!decodedToken) {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        next(error);
    }

    const rentalShop = await RentalShop.findOne({
        where: { userIdUser: decodedToken.userId }
    });

    if (!rentalShop) {
        const error = new Error("This user is not register rental shop yet");
        error.statusCode = 401;
        next(error)
    }

    req.rentalShopId = rentalShop.id_shop;
    next();
};