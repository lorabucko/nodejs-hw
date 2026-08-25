 // Middleware 404 для обробки неiснуючих маршрутів
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: `${req.method} ${req.url} not found`
  });
};

