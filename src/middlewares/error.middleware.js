import AppError from '../utils/error.util.js';
import { sendErrorResponse } from '../utils/response.util.js';
import { ZodError } from 'zod';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    const errorObject = {};
    for (const issue of error.issues) {
      const field = issue.path.at(-1);
      if (field && !errorObject[field]) {
        errorObject[field] = issue.message;
      }
    }
    return sendErrorResponse(res, 400, 'Validasi gagal', errorObject);
  }

  if (error instanceof AppError) {
    return sendErrorResponse(res, error.statusCode, error.message);
  }

  return sendErrorResponse(res, 500, 'Terjadi kesalahan pada server');
};