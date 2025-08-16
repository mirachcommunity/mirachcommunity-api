import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import AppError from '../utils/error.util.js';

const prisma = new PrismaClient();

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Akses ditolak. Token tidak ditemukan.', 401);
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError('Token telah kedaluwarsa.', 401);
      }
      throw new AppError('Token tidak valid.', 401);
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new AppError('Pengguna tidak ditemukan.', 404);
    }

    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};