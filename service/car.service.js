const carRepository = require('../repository/car.repository.js');


const doGetAllCars = async () => {
    return carRepository.findAllCar();
}

module.exports = {doGetAllCars};