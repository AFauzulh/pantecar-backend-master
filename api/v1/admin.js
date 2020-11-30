const Admin = require('../../models/Admin');

exports.getAll = async (req, res, next) => {
    try {
        const admins = await Admin.findAll();

        if (admins.length <= 0) {
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
    const { id } = req.body;

    try {
        const admin = await Admin.findByPk(id);

        if (admin.length <= 0) {
            const error = new Error("no admin found !");
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