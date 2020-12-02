const RentalShop = require('../../models/RentalShop');
const Car = require('../../models/Car');
const CarImageUrl = require('../../models/CarImageUrl');

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