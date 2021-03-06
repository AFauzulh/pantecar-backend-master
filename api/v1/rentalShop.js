const RentalShop = require('../../models/RentalShop');
const User = require('../../models/User');

exports.getAll = async (req, res, next) => {
    try {
        const rentalShops = await RentalShop.findAll();

        res.status(200).json({
            data: {
                rentalShops: rentalShops
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const rentalShop = await RentalShop.findByPk(id, { raw: true });

        res.status(200).json({
            data: {
                rentalShop: rentalShop
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getByUserId = async (req, res, next) => {
    const { userId } = req;
    try {
        const rentalShop = await RentalShop.findOne({
            where: { userIdUser: userId }, raw: true
        });

        res.status(200).json({
            data: {
                rentalShop: rentalShop
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.registerRentalShop = async (req, res, next) => {
    const { name, address, city, province, bank, bankAccountNo } = req.body;
    const { userId } = req;

    let isNum = /^\d+$/.test(bankAccountNo);

    try {
        if (!isNum) {
            const error = new Error("bank account number must contain number only !");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        const loadedUser = await User.findByPk(userId);

        if (!loadedUser) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        const rentalShop = new RentalShop({
            name, address, city, province,
            bank_name: bank,
            bank_account_no: bankAccountNo
        });

        rentalShop.userIdUser = loadedUser.id_user

        loadedUser.RentalShop = rentalShop

        await rentalShop.save()

        await loadedUser.save();

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