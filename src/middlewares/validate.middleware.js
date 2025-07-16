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

      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors: errorObject,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      errors: [error.message],
    });
  }
};
