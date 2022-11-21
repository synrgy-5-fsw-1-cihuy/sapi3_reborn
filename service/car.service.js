const carRepository = require('../repository/car.repository.js');


const doGetAllCars = async () => {
    return await carRepository.findAllCar();
}

module.exports = {doGetAllCars};