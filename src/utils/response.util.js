export const sendSuccessResponse = (res, statusCode, message, data = null, token = null) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
  }

  if (token) {
    response.token = token;
  }

  return res.status(statusCode).json(response);
};

export const sendErrorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};