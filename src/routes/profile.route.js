import express from 'express';
import { getProfile, updateProfile, uploadAvatar } from '../controllers/profile.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import upload from '../config/cloudinary.config.js';

const router = express.Router();

router.get('/:username', getProfile);
router.put('/', authenticate, updateProfile);
router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);

export default router;