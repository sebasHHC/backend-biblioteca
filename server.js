const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Carga las variables desde .env

const app = express();

// 🌐 Middlewares globales
app.use(cors({
  origin: 'https://frontend-biblioteca-six.vercel.app', // ✅ tu frontend en Vercel
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 🔗 Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// 📦 Rutas principales
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/libros', require('./routes/libros.routes'));
app.use('/api/prestamos', require('./routes/prestamos.routes'));

// 🛡 Ruta de prueba protegida (opcional)
app.get('/api/ping', (req, res) => {
  res.json({ mensaje: 'Servidor activo y escuchando' });
});

// 🚀 Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});