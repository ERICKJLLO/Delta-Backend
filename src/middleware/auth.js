import jwt from 'jsonwebtoken';
import db from '../database.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Se requiere un token de autenticacion valido.'
    });
  }

  const token = authHeader.slice(7);
  if (!JWT_SECRET) {
    return next(new Error('JWT_SECRET no esta configurado.'));
  }

  let decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalido o expirado.'
    });
  }

  try {
    const user = await db.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        error: 'El usuario asociado al token no existe.'
      });
    }

    const { password_hash, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;

    return next();
  } catch (error) {
    return next(error);
  }
};
