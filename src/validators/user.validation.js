import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username tidak boleh kosong',
    }).min(3, { message: 'Username minimal harus 3 karakter' }),

    email: z.string({
      required_error: 'Email tidak boleh kosong',
    }).email({ message: 'Format email tidak valid' }),

    password: z.string({
      required_error: 'Password tidak boleh kosong',
    }).min(8, { message: 'Password minimal harus 8 karakter' }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email tidak boleh kosong',
    }).email({ message: 'Format email tidak valid' }),

    password: z.string({
      required_error: 'Password tidak boleh kosong',
    }).min(8, { message: 'Password minimal harus 8 karakter' }),
  }),
});