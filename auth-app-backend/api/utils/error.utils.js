export const errorHandler = (errorMessage, statusCode) => {
  const error = new Error();
  error.message = errorMessage;
  error.statusCode = statusCode;
  return error;
};
