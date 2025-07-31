import AppError from '../utils/error.util.js';
import { sendErrorResponse } from '../utils/response.util.js';
import { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import logger from '../config/logger.config.js';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    const errorObject = {};
    for (const issue of error.issues) {
      const field = issue.path.at(-1);
      if (field && !errorObject[field]) {
        errorObject[field] = issue.message;
      }
    }
    logger.warn(`Validation Error: ${JSON.stringify(errorObject)}`);
    return sendErrorResponse(res, 400, 'Validasi gagal', errorObject);
  }

  if (error instanceof AppError) {
    logger.warn(`AppError: ${error.statusCode} - ${error.message}`);
    return sendErrorResponse(res, error.statusCode, error.message);
  }

  const requestId = uuidv4();
  
  logger.error({
    message: `Internal Server Error: ${error.message}`,
    requestId,
    stack: error.stack,
    method: req.method,
    url: req.originalUrl
  });

  const errorResponse = {
    request_id: requestId
  };

  return sendErrorResponse(res, 500, 'Terjadi kesalahan pada server. Silakan hubungi dukungan.', errorResponse);
};