const Libro = require('../models/libro.model');

// Obtener libros disponibles (estudiantes)
exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find({ disponible: true });
    res.json(libros);
  } catch (error) {
    console.error('❌ Error al obtener libros:', error);
    res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};

// Crear libro (admin)
exports.crearLibro = async (req, res) => {
  try {
    const { titulo, autor, genero, anio, disponible, descripcion } = req.body;

    const nuevo = new Libro({ titulo, autor, genero, anio, disponible, descripcion });
    await nuevo.save();

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear libro:', error);
    res.status(400).json({ mensaje: 'Error al crear libro' });
  }
};

// Actualizar libro (admin)
exports.actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const actualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json(actualizado);
  } catch (error) {
    console.error('❌ Error al actualizar libro:', error);
    res.status(400).json({ mensaje: 'Error al actualizar libro' });
  }
};

// Eliminar libro (admin)
exports.eliminarLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await Libro.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar libro:', error);
    res.status(400).json({ mensaje: 'Error al eliminar libro' });
  }
};