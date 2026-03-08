import express from 'express';
import passport from 'passport';
import { register, login, googleCallback, verifyEmail } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/user.validation.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     description: Endpoint untuk melakukan registrasi akun user baru.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint untuk melakukan login user dengan email dan password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login berhasil
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login dengan Google
 *     description: Endpoint untuk melakukan login menggunakan akun Google. Pengguna akan diarahkan ke halaman login Google.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect ke halaman login Google
 */
router.get('/google', passport.authenticate('google'));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback login Google
 *     description: Endpoint callback setelah pengguna berhasil login dengan Google. Endpoint ini akan menghasilkan token JWT untuk autentikasi selanjutnya.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login dengan Google berhasil
 */
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verifikasi email
 *     description: Endpoint untuk memverifikasi email pengguna setelah registrasi. Pengguna akan menerima token verifikasi melalui email dan token tersebut harus dikirimkan sebagai query parameter.
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: Token verifikasi yang dikirimkan melalui email
 *         schema:
 *           type: string
 *           example: 9f8a7b6c5d4e3f2a
 *     responses:
 *       200:
 *         description: Verifikasi email berhasil
 */
router.get('/verify-email', verifyEmail);

export default router;