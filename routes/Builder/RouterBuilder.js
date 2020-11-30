const indexRoutes = require('./indexRoutes');

module.exports = class Routes {
    constructor(app) {
        // Register routers here
        app.use("/index", indexRoutes);
    }
}