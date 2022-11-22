const carRepository = require('../repository/car.repository.js');


const doGetAllCars = async () => {
    return await carRepository.findAllCar();
};

const doGetCarById = async (id) => {
    const carById = await carRepository.findCarById(id);

    return carById;
};

module.exports = {doGetAllCars, doGetCarById};