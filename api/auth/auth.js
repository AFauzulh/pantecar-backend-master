const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    let loadedUser;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const error = new Error("User with this email is not found");
            error.statusCode = 401;
            throw error;
        }

        loadedUser = user;

        const isPasswordEqual = await bcrypt.compare(password, loadedUser.password);

        if (!isPasswordEqual) {
            const error = new Error("wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser.id_user.toString()
        }, "somesupersecretsecret", {
            expiresIn: "1h"
        });

        res.status(201).json({
            token: token,
            userId: loadedUser.id_user.toString()
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};