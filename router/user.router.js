const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

router.post('/api/auth/register', userController.registerUser);
router.post('/api/auth/login', userController.loginHandler);


module.exports = router;