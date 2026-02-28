// Publically avaliable routes will be defined here.
const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public.controller');

router.post('/generate', publicController.generateKey);


module.exports = router;