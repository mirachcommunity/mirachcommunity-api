import { PrismaClient } from '@prisma/client';
import AppError from '../utils/error.util.js';

const prisma = new PrismaClient();

export const getProfileByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new AppError('Profil tidak ditemukan', 404);
  }

  delete user.password;
  delete user.googleId;
  delete user.verificationToken;
  delete user.isVerified;
  return user;
};

export const updateUserProfile = async (userId, data) => {
  const { bio, dateOfBirth } = data;
  const profile = await prisma.profile.upsert({
    where: { userId },
    update: { bio, dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null },
    create: {
      userId,
      bio,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    },
    include: { user: true },
  });

  delete profile.user.password;
  delete profile.user.googleId;
  delete profile.user.verificationToken;
  delete profile.user.isVerified;
  delete profile.user.password;
  return profile;
};

export const updateUserAvatar = async (userId, avatarUrl) => {
  const profile = await prisma.profile.upsert({
    where: { userId },
    update: { avatarUrl },
    create: { userId, avatarUrl },
  });
  return profile;
};

export const updateUserBanner = async (userId, bannerUrl) => {
  const profile = await prisma.profile.upsert({
    where: { userId },
    update: { bannerUrl },
    create: { userId, bannerUrl },
  });
  return profile;
};