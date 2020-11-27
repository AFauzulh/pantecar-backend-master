const indexRoutes = require('./indexRoutes');

module.exports = class Routes {
    constructor(app) {
        // Register the router here
        app.use("/index", indexRoutes);
    }
}