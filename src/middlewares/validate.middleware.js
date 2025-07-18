import { sendErrorResponse } from "../utils/response.util.js";

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const errorObject = {};
      for (const issue of error.issues) {
        const field = issue.path.at(-1);
        if (field && !errorObject[field]) {
          errorObject[field] = issue.message;
        }
      }

      return sendErrorResponse(res, 400, 'Validasi gagal', errorObject);
    }

    return sendErrorResponse(res, 500, 'Terjadi kesalahan pada server', [error.message]);
  }
};
