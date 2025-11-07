const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'estudiante'],
    default: 'estudiante'
  }
}, {
  timestamps: true // útil para saber cuándo se creó o actualizó el usuario
});

module.exports = mongoose.model('Usuario', usuarioSchema);