const RentalShop = require('../../models/RentalShop');
const Car = require('../../models/Car');
const CarImageUrl = require('../../models/CarImageUrl');
const User = require('../../models/User');

exports.verifyTransaction = async (req, res, next) => {

};

exports.addCar = async (req, res, next) => {
    const {
        rentalShopId, carName, carBrand, numberPlate, carType, carTransmission, numberOfSeat, fuelType, farePerDay
    } = req.body;

    const carImages = req.files.images;

    try {
        const rentalShop = await RentalShop.findByPk(rentalShopId);
        if (!rentalShop) {
            const error = new Error("rental shop is not registered!");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        const newCar = new Car({
            car_name: carName,
            car_brand: carBrand,
            number_plate: numberPlate,
            car_type: carType,
            car_transmission: carTransmission,
            number_of_seat: numberOfSeat,
            fuel_type: fuelType,
            fare_per_day: farePerDay,
            rentalShopIdShop: rentalShopId,

        });

        const savedCar = await newCar.save();

        carImages.forEach(async (cImg) => {
            const newCarImageUrl = new CarImageUrl({
                imageUrl: cImg.path.replace("\\", "/"),
                carIdCar: savedCar.id_car
            });

            await newCarImageUrl.save();
        });

        res.status(201).json({
            data: {
                message: "car added",
                carId: savedCar.id_car,
                rentalShopId: rentalShopId,
                car: savedCar
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            console.log(err);
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getCars = async (req, res, next) => {

};

exports.registerRentalShop = async (req, res, next) => {
    const { userId, name, address, city, province, bank, bankAccountNo } = req.body;

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