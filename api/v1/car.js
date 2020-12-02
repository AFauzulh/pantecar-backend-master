const Car = require('../../models/Car');
const CarImageUrl = require('../../models/CarImageUrl');

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const foundedCar = await Car.findByPk(id);

        if (!foundedCar) {
            const error = new Error("car not found !");
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