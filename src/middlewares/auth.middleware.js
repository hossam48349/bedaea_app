const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("غير مصرح بالدخول", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("المستخدم غير موجود", 401);
    }

    if (!user.isActive) {
      throw new AppError("الحساب غير مفعل", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError("جلسة الدخول غير صالحة", 401));
  }
};

module.exports = protect;