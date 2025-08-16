import express from 'express';
import { getProfile, updateProfile, uploadAvatar, uploadBanner } from '../controllers/profile.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploadAvatar as uploadAvatarMiddleware, uploadBanner as uploadBannerMiddleware } from '../config/cloudinary.config.js';
import { validate } from '../middlewares/validate.middleware.js';
import { uploadAvatarSchema, uploadBannerSchema } from '../validators/profile.validation.js';

const router = express.Router();

router.get('/:username', getProfile);
router.put('/', authenticate, updateProfile)

router.post(
  '/avatar', 
  authenticate, 
  uploadAvatarMiddleware.single('avatar'), 
  validate(uploadAvatarSchema),
  uploadAvatar
);

router.post(
  '/banner', 
  authenticate, 
  uploadBannerMiddleware.single('banner'), 
  validate(uploadBannerSchema),
  uploadBanner
);

export default router;