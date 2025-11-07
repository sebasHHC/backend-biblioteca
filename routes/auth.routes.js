const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/auth.controller');

// Registro de usuario
router.post('/registro', registrar);

// Login de usuario
router.post('/login', login);

module.exports = router;