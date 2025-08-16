import * as profileService from '../services/profile.service.js';
import { sendSuccessResponse } from '../utils/response.util.js';
import AppError from '../utils/error.util.js';

export const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userProfile = await profileService.getProfileByUsername(username);
    sendSuccessResponse(res, 200, 'Profil berhasil diambil', userProfile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userProfile = await profileService.updateUserProfile(req.user.id, req.body);
    sendSuccessResponse(res, 200, 'Profil berhasil diperbarui', userProfile);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('Tidak ada file yang diunggah', 400);
    }
    const profile = await profileService.updateUserAvatar(req.user.id, req.file.path);
    sendSuccessResponse(res, 200, 'Avatar berhasil diunggah', { avatarUrl: profile.avatarUrl });
  } catch (error) {
    next(error);
  }
};