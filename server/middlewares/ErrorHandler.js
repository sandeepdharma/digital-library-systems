const errorHandler = (err, req, res, next) => {
  console.log("error : ", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
export default errorHandler;
