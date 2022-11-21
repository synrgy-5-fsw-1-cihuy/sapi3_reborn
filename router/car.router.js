const express = require('express');
const router = express.Router();
const carController = require('../controller/car.controller.js');

// POST CAR
router.post('/api/cars', carController.createCarHandler);

// GET ALL
router.get('/api/cars', carController.getAllCarHandler);

// GET BY ID
router.get('/api/cars/:id', carController.getCarByIdHandler);

// UPDATE
// DELETE


module.exports = router;