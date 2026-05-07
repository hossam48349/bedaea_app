const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const AppError = require("../../utils/AppError");
const generateToken = require("../../utils/generateToken");

const buildAuthResponse = (user) => {
  const token = generateToken(user._id, user.role);

  return {
    token,
    user: {
      id: user._id,
      role: user.role,
      fullName: user.fullName,
      phone: user.phone,
      storeName: user.storeName || null
    }
  };
};

const registerCustomer = async (data) => {
  const existingUser = await User.findOne({ phone: data.phone });

  if (existingUser) {
    throw new AppError("رقم الهاتف مستخدم بالفعل", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

const user = await User.create({
  role: "customer",
  fullName: data.fullName,
  centerName: data.centerName,
  villageName: data.villageName,
  marketName: data.marketName,
  phone: data.phone,
  password: hashedPassword,
  agreedToTerms: data.agreedToTerms
});

  return buildAuthResponse(user);
};

const registerMerchant = async (data) => {
  const existingUser = await User.findOne({ phone: data.phone });

  if (existingUser) {
    throw new AppError("رقم الهاتف مستخدم بالفعل", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    role: "merchant",
    fullName: data.fullName,
    storeName: data.storeName,
    phone: data.phone,
    storeAddress: data.storeAddress,
    commercialRegister: data.commercialRegister,
    governorate: data.governorate,
    city: data.city,
    village: data.village,
    hasDelivery: data.hasDelivery,
    deliveryAreas: data.deliveryAreas,
    password: hashedPassword,
    agreedToTerms: data.agreedToTerms
  });

  return buildAuthResponse(user);
};

const login = async ({ phone, password }) => {
  const user = await User.findOne({ phone }).select("+password");

  if (!user) {
    throw new AppError("رقم الهاتف أو كلمة المرور غير صحيحة", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("رقم الهاتف أو كلمة المرور غير صحيحة", 401);
  }

  if (!user.isActive) {
    throw new AppError("هذا الحساب غير مفعل", 403);
  }

  return buildAuthResponse(user);
};

module.exports = {
  registerCustomer,
  registerMerchant,
  login
};