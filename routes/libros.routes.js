const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

const {
  obtenerLibros,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} = require('../controllers/libros.controller');

// Estudiantes: obtener libros disponibles
router.get('/', authMiddleware, obtenerLibros);

// Admin: crear libro
router.post('/', authMiddleware, verificarAdmin, crearLibro);

// Admin: actualizar libro
router.put('/:id', authMiddleware, verificarAdmin, actualizarLibro);

// Admin: eliminar libro
router.delete('/:id', authMiddleware, verificarAdmin, eliminarLibro);

module.exports = router;