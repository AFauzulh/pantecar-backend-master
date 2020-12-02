const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../../models/Admin');

exports.signupUser = async (req, res, next) => {
    const { nameUser, dob, email, password } = req.body;
    let ktpUrl = req.file.path.replace("\\", "/");;

    try {
        const user = new User({
            user_name: nameUser,
            date_of_birth: dob,
            email: email,
            password: await bcrypt.hash(password, 12),
            id_card_url: ktpUrl
        });

        const savedUser = await user.save();

        res.status(201).json({
            data: {
                message: 'user created',
                user: savedUser.id_user
            }
        });


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.loginUser = async (req, res, next) => {
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
            data: {
                token: token,
                userId: loadedUser.id_user.toString()
            }
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.signupAdmin = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const admin = new Admin({
            admin_name: name,
            email: email,
            password: await bcrypt.hash(password, 12)
        });

        const savedAdmin = await admin.save();

        res.status(201).json({
            data: {
                message: 'admin created',
                admin: savedAdmin.id_admin
            }
        });


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    let loadedAdmin;

    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            const error = new Error("You are not an admin !");
            error.statusCode = 401;
            throw error;
        }

        loadedAdmin = admin;

        const isPasswordEqual = await bcrypt.compare(password, loadedAdmin.password);

        if (!isPasswordEqual) {
            const error = new Error("wrong password!");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin.id_admin.toString()
        }, "somesupersecretsecret", {
            expiresIn: "1h"
        });

        res.status(201).json({
            data: {
                token: token,
                adminId: loadedAdmin.id_admin.toString()
            }
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}