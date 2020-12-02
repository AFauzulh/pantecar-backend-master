const Admin = require('../Admin');
const User = require('../User');
const RentalShop = require('../RentalShop');
const Car = require('../Car');
const CarImageUrl = require('../CarImageUrl');
const Transaction = require('../Transaction');

class ModelBuilder {
    constructor() {
        Admin.hasMany(User);
        User.hasOne(RentalShop);
        RentalShop.hasMany(Car);
        Car.hasMany(CarImageUrl);
        Admin.hasMany(Car);

        User.hasMany(Transaction);
        RentalShop.hasMany(Transaction);
        Car.hasMany(Transaction);
        Admin.hasMany(Transaction);
    }
}

module.exports = ModelBuilder;