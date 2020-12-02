const User = require('../../models/User');
const Car = require('../../models/Car');
const RentalShop = require('../../models/RentalShop');
const Transaction = require('../../models/Transaction');

exports.makeTransaction = async (req, res, next) => {
    const {
        borrowDate,
        returnDate,
        carId,
        userId,
        rentalShopId
    } = req.body;


    try {
        const user = await User.findByPk(userId);
        const car = await Car.findByPk(carId);
        const rentalShop = await RentalShop.findByPk(rentalShopId);

        if (!user || !car || !rentalShop) {
            const error = new Error("invalid inputs");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        const totalDay = (new Date(returnDate).getDate()) - (new Date(borrowDate).getDate());
        const totalPrice = car.fare_per_day * totalDay;

        const newTransaction = new Transaction({
            borrow_date: borrowDate,
            return_date: returnDate,
            total_price: totalPrice,
            userIdUser: user.id_user,
            rentalShopIdShop: rentalShop.id_shop,
            carIdCar: car.id_car,
            number_of_days_borrowed: totalDay

        });

        const savedTransaction = await newTransaction.save();

        res.status(201).json({
            data: {
                message: 'transaction created',
                transaction: savedTransaction
            }
        });
    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getUnverifiedTransactions = async (req, res, next) => {
    try {
        const unverifiedTransactions = await Transaction.findAll({
            where: { is_verified: false }
        });

        res.status(200).json({
            data: {
                unverifiedTransactions: unverifiedTransactions
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.verifyTransaction = async (req, res, next) => {
    const { transactionId, rentalShopId } = req.body;
    try {
        const transaction = await Transaction.findByPk(transactionId);
        const rentalShop = await RentalShop.findByPk(rentalShopId);

        if (!transaction || !rentalShop) {
            const error = new Error("invalid input");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        if (transaction.rentalShopIdShop !== rentalShop.id_shop) {
            const error = new Error("unauthorized rental shop");
            error.statusCode = 401;
            console.log(error);
            throw error;
        }

        if (transaction.is_verified) {
            const error = new Error("transaction has already verified");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        transaction.is_verified = true;

        await transaction.save()

        res.status(200).json({
            data: {
                message: "verify success",
                transaction: transaction
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.acceptTransaction = async (req, res, next) => {

};