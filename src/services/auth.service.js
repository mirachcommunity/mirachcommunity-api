import AppError from '../utils/error.util.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import logger from '../config/logger.config.js';
import { sendVerificationEmail } from '../utils/email.util.js';

const prisma = new PrismaClient();

export const registerUser = async (username, email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email sudah terdaftar', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      verificationToken,
    },
  });

  sendVerificationEmail(user.email, verificationToken).catch(err => console.error(err));

  delete user.password;
  delete user.googleId;
  delete user.verificationToken;
  return user;
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Email atau password salah', 401);
  }

  if (!user.isVerified || user.verificationToken) {
    throw new AppError('Akun Anda belum diverifikasi. Silakan periksa email Anda untuk verifikasi.', 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Email atau password salah', 401);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  delete user.password;
  delete user.googleId;
  delete user.verificationToken;
  return [token, user];
};

export const verifyUserEmail = async (token) => {
  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) {
    throw new AppError('Token verifikasi tidak valid atau sudah kedaluwarsa', 400);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
    },
  });

  logger.info(`User verified successfully: { email: ${user.email}, userId: ${user.id} }`);
};