const fs = require('fs');

const Car = require('../../models/Car');
const CarImageUrl = require('../../models/CarImageUrl');
const RentalShop = require('../../models/RentalShop');

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundedCar = await Car.findByPk(id);

        if (!foundedCar) {
            const error = new Error("car not found");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        const carImageUrls = await CarImageUrl.findAll({
            where: { carIdCar: foundedCar.id_car }
        });

        res.status(200).json({
            data: {
                car: foundedCar,
                carImageUrl: carImageUrls
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

exports.addCar = async (req, res, next) => {
    const {
        rentalShopId, carName, carBrand, numberPlate, carType, carTransmission, numberOfSeat, fuelType, farePerDay
    } = req.body;

    const { userId } = req;

    const carImages = req.files.images;
    // const carImgs = [];

    try {
        const rentalShop = await RentalShop.findByPk(rentalShopId);
        if (!rentalShop || rentalShop.userIdUser.toString() !== userId.toString()) {
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
        rentalShop.number_of_cars = rentalShop.number_of_cars + 1;

        await rentalShop.save();

        carImages.forEach(async (cImg) => {
            const newCarImageUrl = new CarImageUrl({
                imageUrl: cImg.path.replace("\\", "/"),
                carIdCar: savedCar.id_car
            });

            // carImgs.push(newCarImageUrl.imageUrl);

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