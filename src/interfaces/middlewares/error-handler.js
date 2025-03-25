const errorHandler = (err, req, res, next) => {
  console.log("Error:", err.message);

  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: errorMessage
  });
};

export default errorHandler;