const indexRoutes = require('../indexRoutes');
const adminRoutes = require('../adminRoutes');

module.exports = class Routes {
    constructor(app) {
        // Register routers here
        app.use("/index", indexRoutes);
        app.use("/api/v1/admin", adminRoutes);
    }
}