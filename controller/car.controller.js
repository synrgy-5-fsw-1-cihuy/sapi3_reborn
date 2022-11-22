const formidableMiddleware = require('formidable');
const cloudinaryConfig = require('../config/cloudinary.js');
const models = require('../models');
const Car = models.Car;
const carService = require('../service/car.service.js');

// All Car Handler
const getAllCarHandler = async (request, response) => {
    const cars = await carService.doGetAllCars();

    response.status(200).json({data: cars});
};

// Car By ID Handler
const getCarByIdHandler = async (request, response) => {
    const carById = await carService.doGetCarById(request.params.id, response);

    if (carById == null) {
        response.status(404).json({message: `Car not found with ids ${request.params.id}`});
        return;
    };

    response.status(200).json({data: carById});
};

// Create Car Handler
const createCarHandler = (request, response) => {
    const form = formidableMiddleware({ });

    form.parse(request, (err, fields, files) => {
        if (err) {
            next(err);
            
            return;
        };

        cloudinaryConfig.uploader.upload(files.foto.filepath, function(err, result) {
            if (err) {
                next(err);
                return;
            }

            Car.create({
                name: fields.name,
                price: fields.price,
                size: fields.size,
                foto: result.secure_url
            }).then(result => {
                response.status(201).json({message: "Car successfully created", body: fields});
            });
        });

    });
};

module.exports = {getAllCarHandler, getCarByIdHandler, createCarHandler};