const fs = require('fs');
const User = require('../../models/User');
const Car = require('../../models/Car');
const RentalShop = require('../../models/RentalShop');
const Transaction = require('../../models/Transaction');

exports.makeTransaction = async (req, res, next) => {
    const {
        borrowDate,
        returnDate,
        carId,
        rentalShopId
    } = req.body;

    const { userId } = req;

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

        if (!user.is_verified) {
            const error = new Error("user is not verified yet");
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

        if (!transaction.is_accepted) {
            const error = new Error("Can't verify unaccepted transaction");
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

        if (transaction.is_accepted) {
            const error = new Error("transaction has already accepted");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        transaction.is_accepted = true;

        await transaction.save()

        res.status(200).json({
            data: {
                message: "transaction accepted",
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

exports.rejectTransaction = async (req, res, next) => {
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

        if (!transaction.is_accepted) {
            const error = new Error("transaction has already rejected");
            error.statusCode = 400;
            console.log(error);
            throw error;
        }

        transaction.is_accepted = false;

        await transaction.save()

        res.status(200).json({
            data: {
                message: "transaction rejected",
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

exports.uploadPaymentReceipt = async (req, res, next) => {
    const { transactionId } = req.body;
    const paymentReceiptUrl = req.file.path.replace("\\", "/");

    try {
        const foundedTransaction = await Transaction.findByPk(transactionId);

        if (!foundedTransaction) {
            const error = new Error("Transaction is not valid");
            error.statusCode = 400;
            throw error;
        }

        foundedTransaction.transfer_image_url = paymentReceiptUrl;

        await foundedTransaction.save();

        res.status(200).json({
            data: {
                message: 'upload success',
                transaction_no: foundedTransaction.transaction_no
            }
        });

    } catch (err) {
        fs.unlink(paymentReceiptUrl, error => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};