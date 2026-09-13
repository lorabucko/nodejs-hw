export const errorHandler = (error, req, res, next) => {
  console.error('SERVER ERROR:', error);

  const status = error.status || error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({
    message,
  });
};
