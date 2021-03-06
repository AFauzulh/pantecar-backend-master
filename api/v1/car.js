const { sequelize } = require('../../database/database');

const Car = require('../../models/Car');
const CarImageUrl = require('../../models/CarImageUrl');
const RentalShop = require('../../models/RentalShop');

exports.getAll = async (req, res, next) => {
    try {
        const cars = await Car.findAll({ raw: true });

        for (let i = 0; i < cars.length; i++) {
            const carImagePreviewUrl = await CarImageUrl.findOne({ where: { carIdCar: cars[i].id_car }, raw: true });
            const carRentalShop = await RentalShop.findByPk(cars[i].rentalShopIdShop, { raw: true });
            cars[i].imagePreviewUrl = carImagePreviewUrl.imageUrl;
            cars[i].rentalShopName = carRentalShop.name;
            cars[i].city = carRentalShop.city;
            cars[i].province = carRentalShop.province;
        }

        res.status(200).json({
            data: {
                cars: cars
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            console.log(err);
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundedCar = await Car.findByPk(id, { raw: true });

        if (!foundedCar) {
            const error = new Error("car not found");
            error.statusCode = 404;
            console.log(error);
            throw error;
        }

        let carImageUrls = await CarImageUrl.findAll({
            where: { carIdCar: foundedCar.id_car }
        });

        carImageUrls = carImageUrls.map(cImg => {
            return cImg.imageUrl
        });

        const carRentalShop = await RentalShop.findByPk(foundedCar.rentalShopIdShop, { raw: true });
        foundedCar.rentalShopName = carRentalShop.name;
        foundedCar.city = carRentalShop.city;
        foundedCar.province = carRentalShop.province;

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

exports.getByCityOrCarName = async (req, res, next) => {
    const { city, carName } = req.query;
    let foundedCars = [];

    try {
        const sql = `SELECT * FROM cars WHERE rentalShopIdShop IN (SELECT id_shop FROM rental_shops WHERE rental_shops.city LIKE ? OR cars.car_name LIKE ?)`;
        const [cars, _] = await sequelize.query(sql, {
            replacements: [(`%${city}%` || ''), (`%${carName}%` || '')]
        });

        foundedCars = JSON.parse(JSON.stringify(cars));
        res.status(200).json({
            data: {
                cars: foundedCars
            }
        });

    } catch (err) {
        if (!err.statuscode) {
            console.log(err);
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addCar = async (req, res, next) => {
    const {
        carName, carBrand, numberPlate, carType, carTransmission, numberOfSeat, fuelType, farePerDay
    } = req.body;

    const { rentalShopId } = req;

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