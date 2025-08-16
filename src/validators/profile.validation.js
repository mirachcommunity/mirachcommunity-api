import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const fileSchema = z
  .object({
    mimetype: z.string().refine(
      (value) => ACCEPTED_IMAGE_TYPES.includes(value),
      'Hanya format .jpg, .jpeg, .png, dan .webp yang didukung.'
    ),
    size: z.number().max(MAX_FILE_SIZE, `Ukuran gambar maksimal adalah 1MB.`),
  })
  .passthrough();

export const uploadAvatarSchema = z.object({
  file: z.any()
    .refine((file) => file !== undefined, 'Avatar wajib diunggah.')
    .refine((file) => file && file.size <= MAX_FILE_SIZE, `Ukuran gambar maksimal adalah 1MB.`)
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
      'Hanya format .jpg, .jpeg, .png, dan .webp yang didukung.'
    ),
});

export const uploadBannerSchema = z.object({
  file: z.any()
    .refine((file) => file !== undefined, 'Banner wajib diunggah.')
    .refine((file) => file && file.size <= MAX_FILE_SIZE, `Ukuran gambar maksimal adalah 1MB.`)
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
      'Hanya format .jpg, .jpeg, .png, dan .webp yang didukung.'
    ),
});