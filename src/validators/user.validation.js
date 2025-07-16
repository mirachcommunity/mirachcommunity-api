import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Nama tidak boleh kosong',
    }).min(1, { message: 'Nama tidak boleh kosong' }),

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
    }).min(1, { message: 'Password tidak boleh kosong' }),
  }),
});