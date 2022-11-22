const models = require('../models');
const Car = models.Car;

const findAllCar = async () => {
    return await Car.findAll();
};

const findCarById = async (id) => {
    return await Car.findByPk(id);
};

module.exports = {findAllCar, findCarById};