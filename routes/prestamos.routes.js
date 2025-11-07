const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const verificarAdmin = require('../middlewares/verificarAdmin'); // ✅ nuevo middleware
const Prestamo = require('../models/prestamo.model');
const Libro = require('../models/libro.model');

// ✅ Obtener préstamos del usuario autenticado
router.get('/mios', authMiddleware, async (req, res) => {
  try {
    const prestamos = await Prestamo.find({ usuario: req.usuario.id }).populate('libro');
    res.json(prestamos);
  } catch (err) {
    console.error('❌ Error al obtener préstamos:', err);
    res.status(500).json({ mensaje: 'Error al obtener préstamos' });
  }
});

// ✅ Obtener todos los préstamos (solo para administradores)
router.get('/todos', verificarAdmin, async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('libro', 'titulo autor')
      .populate('usuario', 'nombre email');
    res.json(prestamos);
  } catch (err) {
    console.error('❌ Error al obtener todos los préstamos:', err);
    res.status(500).json({ mensaje: 'Error al obtener todos los préstamos' });
  }
});

// ✅ Devolver un préstamo
router.put('/:id/devolver', authMiddleware, async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    if (prestamo.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'No tienes permiso para devolver este préstamo' });
    }

    if (prestamo.estado === 'devuelto') {
      return res.status(400).json({ mensaje: 'Este préstamo ya fue devuelto' });
    }

    prestamo.estado = 'devuelto';
    prestamo.fechaDevolucion = new Date();
    await prestamo.save();

    await Libro.findByIdAndUpdate(prestamo.libro, { disponible: true });

    res.json({ mensaje: 'Libro devuelto correctamente' });
  } catch (err) {
    console.error('❌ Error al devolver préstamo:', err);
    res.status(500).json({ mensaje: 'Error al devolver el préstamo' });
  }
});

// ✅ Solicitar un préstamo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { libroId } = req.body;

    if (!libroId) {
      return res.status(400).json({ mensaje: 'Falta el ID del libro' });
    }

    const libro = await Libro.findById(libroId);
    if (!libro || !libro.disponible) {
      return res.status(404).json({ mensaje: 'Libro no disponible o no encontrado' });
    }

    const nuevoPrestamo = new Prestamo({
      usuario: req.usuario.id,
      libro: libroId,
      fechaPrestamo: new Date(),
      estado: 'prestado'
    });

    await nuevoPrestamo.save();
    await Libro.findByIdAndUpdate(libroId, { disponible: false });

    res.status(201).json({ mensaje: 'Préstamo creado correctamente' });
  } catch (err) {
    console.error('❌ Error al crear préstamo:', err);
    res.status(500).json({ mensaje: 'Error al crear el préstamo' });
  }
});

module.exports = router;