import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service.js';
import { sendSuccessResponse } from '../utils/response.util.js';

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body.name, req.body.email, req.body.password);
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