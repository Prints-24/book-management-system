import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'sg45rtgfb7ytjhgn';

export function generateToken(user) {
  const payload = { id: user.id, username: user.username, role: user.role };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

export function hashPassword(password) {
  return bcryptjs.hashSync(password, 8);
}

export function comparePassword(password, hash) {
  return bcryptjs.compareSync(password, hash);
}
