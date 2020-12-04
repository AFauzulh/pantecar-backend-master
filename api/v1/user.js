const User = require('../../models/User');
const RentalShop = require('../../models/RentalShop');


exports.getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            data: {
                user: user
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchAll = async (req, res, next) => {
    try {
        const user = await User.findAll();

        res.status(200).json({
            data: {
                user: user
            }
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};