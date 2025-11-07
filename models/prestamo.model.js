const express = require('express');
const router = express.Router();
const Prestamo = require('../models/prestamo.model');
const verificarAdmin = require('../middlewares/verificarAdmin');

// ✅ Endpoint para obtener todos los préstamos (solo admin)
router.get('/todos', verificarAdmin, async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('libro', 'titulo autor')      // solo los campos necesarios
      .populate('usuario', 'nombre email');   // solo los campos necesarios

    res.json(prestamos);
  } catch (error) {
    console.error('❌ Error al obtener préstamos:', error);
    res.status(500).json({ mensaje: 'Error al obtener préstamos' });
  }
});

module.exports = router;