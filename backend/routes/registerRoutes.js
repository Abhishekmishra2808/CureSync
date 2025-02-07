const express = require('express');
const router = express.Router();
const patientController = require('../controllers/userController');

router.post('/', patientController.registerPatient);

module.exports = router;
