const express = require('express');
const router = express.Router();
const formidableMiddleware = require('formidable');
const cloudinaryConfig = require('../config/cloudinary.js');
const models = require('../models');
const Car = models.Car;

// POST
router.post('/api/cars', (request, response) => {
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
});

// GET ALL
router.get('/api/cars', (request, response) => {
    Car.findAll().then(result => {
        response.status(200).json({data: result});
    });
});

// GET BY ID
router.get('/api/cars/:id', (request, response) => {
    Car.findByPk(request.params.id).then(result => {
        if(result == null) {
            response.status(404).json({message: "Car not found"});
            return;
        }

        response.status(200).json({data: result});
    });
});

// UPDATE
// DELETE


module.exports = router;