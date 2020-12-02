const indexRoutes = require('../indexRoutes');
const adminRoutes = require('../adminRoutes');
const authRoutes = require('../authRoutes');
const userRoutes = require('../userRoutes');
const rentalShopRoutes = require('../rentalShopRoutes');
const carRoutes = require('../carRoutes');
const transactionRoutes = require('../transactionRoutes');

module.exports = class Routes {
    constructor(app) {
        // Register routers here
        app.use("/index", indexRoutes);
        app.use("/api/v1/admin", adminRoutes);
        app.use("/api/v1/auth", authRoutes);
        app.use("/api/v1/user", userRoutes);
        app.use("/api/v1/rental-shop", rentalShopRoutes);
        app.use("/api/v1/car", carRoutes);
        app.use("/api/v1/transaction", transactionRoutes);
    }
}