import * as authService from '../services/auth.service.js';
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.util.js';

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body.name, req.body.email, req.body.password);
    sendSuccessResponse(res, 201, 'Registrasi berhasil', user);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || 'Terjadi kesalahan pada server');
  }
};

export const login = async (req, res) => {
  try {
    const [token, user] = await authService.loginUser(req.body.email, req.body.password);
    sendSuccessResponse(res, 200, 'Login berhasil', user, token);
  } catch (error) {
    sendErrorResponse(res, error.statusCode || 500, error.message || 'Terjadi kesalahan pada server');
  }
};