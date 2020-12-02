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
            error.statusCode = 404;
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