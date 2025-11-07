const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: decoded.id || decoded._id,
      rol: decoded.rol
    };

    next();
  } catch (err) {
    console.error('❌ Token inválido:', err);
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};