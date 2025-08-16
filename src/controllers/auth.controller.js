import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service.js';
import { sendSuccessResponse } from '../utils/response.util.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body.username, req.body.email, req.body.password);
    sendSuccessResponse(res, 201, 'Registrasi berhasil', user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const [token, user] = await authService.loginUser(req.body.email, req.body.password);
    sendSuccessResponse(res, 200, 'Login berhasil', user, token);
  } catch (error) {
    next(error);
  }
};

export const googleCallback = (req, res) => {
  const user = req.user;

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  sendSuccessResponse(res, 200, 'Login dengan Google berhasil', user, token);
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new AppError('Token verifikasi tidak ditemukan', 400);
    }

    await authService.verifyUserEmail(token);
    
    res.send('<h1>Verifikasi email berhasil!</h1><p>Anda sekarang dapat login ke akun Anda.</p>');
  } catch (error) {
    next(error);
  }
};