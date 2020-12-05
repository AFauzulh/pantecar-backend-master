const Admin = require('../../models/Admin');
const RentalShop = require('../../models/RentalShop');
const User = require('../../models/User');

exports.getAll = async (req, res, next) => {
    try {
        const admins = await Admin.findAll();

        if (!admins) {
            const error = new Error("no admin found !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        res.status(200).json({
            data: {
                admins: admins
            }
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByPk(id);

        if (!admin) {
            const error = new Error("admin not found");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        res.status(200).json({
            data: {
                admin: admin
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.verifyUser = async (req, res, next) => {
    const { userId } = req.body;
    const { adminId } = req;

    try {
        const foundedUser = await User.findByPk(userId);
        const foundedAdmin = await Admin.findByPk(adminId);

        if (!foundedUser) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        } else {
            if (foundedUser.is_verified) {
                return res.status(400).json({
                    message: "User has already verified !"
                });
            }
        }

        if (!foundedAdmin) {
            const error = new Error("admin is not registered !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        foundedUser.is_verified = true;
        foundedUser.adminIdAdmin = adminId;

        await foundedUser.save();

        res.status(200).json({
            data: {
                message: "user verified"
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.verifyRentalShop = async (req, res, next) => {
    const { rentalShopId } = req.body;
    const { adminId } = req;

    try {
        const foundedRentalShop = await RentalShop.findByPk(rentalShopId);
        const foundedAdmin = await Admin.findByPk(adminId);

        if (!foundedRentalShop) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        } else {
            if (foundedRentalShop.is_verified) {
                return res.status(400).json({
                    message: "Rental Shop has already verified !"
                });
            }
        }

        if (!foundedAdmin) {
            const error = new Error("admin is not registered !");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        foundedRentalShop.is_verified = true;
        foundedRentalShop.adminIdAdmin = adminId;

        await foundedRentalShop.save();

        res.status(200).json({
            data: {
                message: "Rental Shop verified"
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUnverifiedUsers = async (req, res, next) => {
    try {
        const unverifiedUsers = await User.findAll({
            where: { is_verified: false },
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            data: {
                unverifiedUsers: unverifiedUsers
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUnverifiedRentalShops = async (req, res, next) => {
    try {
        const unverifiedRentalShops = await RentalShop.findAll({
            where: { is_verified: false }, raw: true
        });

        console.log(unverifiedRentalShops);

        unverifiedRentalShops.map(async (uvr) => {
            const owner = await User.findByPk(uvr.userIdUser, { raw: true });
            console.log(owner);
            uvr = { ...uvr, ownerName: owner.user_name }
        });

        for (let i = 0; i < unverifiedRentalShops.length; i++) {
            const ownerName = await User.findByPk(unverifiedRentalShops[i].userIdUser);
            unverifiedRentalShops[i].ownerName = ownerName.user_name;
        }

        res.status(200).json({
            data: {
                unverifiedRentalShops: unverifiedRentalShops
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}