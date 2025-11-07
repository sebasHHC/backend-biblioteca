module.exports = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: 'Usuario no autenticado' });
  }

  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo administradores' });
  }

  next();
};