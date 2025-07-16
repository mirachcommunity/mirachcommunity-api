import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [token, user] = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan pada server',
    });
  }
};