const models = require('../models');
const Car = models.Car;

const findAllCar = async () => {
    return await Car.findAll();
};

module.exports = {findAllCar};