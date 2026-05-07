const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "حدث خطأ في السيرفر";

  if (err.code === 11000) {
    statusCode = 409;
    message = "رقم الهاتف مستخدم بالفعل";
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;