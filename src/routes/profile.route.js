import express from 'express';
import { getProfile, updateProfile, uploadAvatar, uploadBanner } from '../controllers/profile.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploadAvatar as uploadAvatarMiddleware, uploadBanner as uploadBannerMiddleware } from '../config/cloudinary.config.js';
import { validate } from '../middlewares/validate.middleware.js';
import { uploadAvatarSchema, uploadBannerSchema, updateProfileSchema } from '../validators/profile.validation.js';

const router = express.Router();

/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     summary: Mendapatkan profil user
 *     description: Endpoint untuk mendapatkan profil user berdasarkan username.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username dari user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profil user berhasil ditemukan
 */
router.get('/:username', getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update profil user
 *     description: Endpoint untuk memperbarui informasi profil pengguna yang sedang login.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 */
router.put('/', authenticate, validate(updateProfileSchema), updateProfile)

/**
 * @swagger
 * /profile/avatar:
 *   post:
 *     summary: Upload avatar user
 *     description: Endpoint untuk mengunggah foto avatar pengguna. Maksimal ukuran file 1MB dan hanya mendukung format jpg, jpeg, png, dan webp.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar berhasil diupload
 */
router.post(
  '/avatar', 
  authenticate, 
  uploadAvatarMiddleware.single('avatar'), 
  validate(uploadAvatarSchema),
  uploadAvatar
);

/**
 * @swagger
 * /profile/banner:
 *   post:
 *     summary: Upload banner user
 *     description: Endpoint untuk mengunggah banner profil pengguna. Maksimal ukuran file 1MB dan hanya mendukung format jpg, jpeg, png, dan webp.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - banner
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Banner berhasil diupload
 */
router.post(
  '/banner', 
  authenticate, 
  uploadBannerMiddleware.single('banner'), 
  validate(uploadBannerSchema),
  uploadBanner
);

export default router;