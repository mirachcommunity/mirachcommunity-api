import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import AppError from '../utils/error.util.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = (folderName, publicIdPrefix) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `mirach_community/${folderName}`,
      format: async (req, file) => 'png',
      public_id: (req, file) => `${publicIdPrefix}-${req.user.id}`,
    },
  });
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Hanya file gambar yang diizinkan!', 400), false);
  }
};

export const uploadAvatar = multer({
  storage: createStorage('avatars', 'avatar'),
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export const uploadBanner = multer({
  storage: createStorage('banners', 'banner'),
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});