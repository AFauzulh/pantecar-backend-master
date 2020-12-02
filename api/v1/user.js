const User = require('../../models/User');
const RentalShop = require('../../models/RentalShop');

exports.registerRentalShop = async (req, res, next) => {
    const { userId, name, address, city, province } = req.body;
    console.log(req.body);
    try {
        const loadedUser = await User.findByPk(userId);

        if (!loadedUser) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        const rentalShop = new RentalShop({
            name, address, city, province
        });

        rentalShop.userIdUser = loadedUser.id_user

        loadedUser.RentalShop = rentalShop

        await rentalShop.save()

        await loadedUser.save();

        console.log(loadedUser.RentalShop);

        res.status(200).json({
            data: {
                message: "rental shop created",
                rentalShopId: loadedUser.RentalShop.id_shop
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};