const authService = require("./auth.service");
const Customer = require("../models/Customer");
const Merchant = require("../models/Merchant");

const {
  registerCustomerSchema,
  registerMerchantSchema,
  loginSchema
} = require("./auth.validation");

exports.registerCustomer = async (req, res) => {
  const {
    fullName,
    centerName,
    villageName,
    marketName,
    phone,
    password,
    confirmPassword,
    agreedToTerms,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "كلمة المرور غير متطابقة",
    });
  }

  const customer = await Customer.create({
    fullName,
    centerName,
    villageName,
    marketName,
    phone,
    password,
    agreedToTerms,
  });

  res.status(201).json({
    success: true,
    message: "تم إنشاء حساب العميل بنجاح",
    data: {
      user: {
        id: customer._id,
        type: "customer",
        fullName: customer.fullName,
        phone: customer.phone,
        centerName: customer.centerName,
        villageName: customer.villageName,
        marketName: customer.marketName,
      },
    },
  });
};


exports.registerMerchant = async (req, res) => {
  const {
    fullName,
    storeName,
    phone,
    storeAddress,
    commercialRegister,
    governorate,
    city,
    village,
    hasDelivery,
    deliveryAreas,
    password,
    confirmPassword,
    agreedToTerms,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "كلمة المرور غير متطابقة",
    });
  }

  const merchant = await Merchant.create({
    fullName,
    storeName,
    phone,
    storeAddress,
    commercialRegister,
    governorate,
    city,
    village,
    hasDelivery,
    deliveryAreas,
    password,
    agreedToTerms,
  });

  res.status(201).json({
    success: true,
    message: "تم إنشاء حساب التاجر بنجاح",
    data: {
      user: {
        id: merchant._id,
        type: "merchant",
        fullName: merchant.fullName,
        phone: merchant.phone,
        storeName: merchant.storeName,
        city: merchant.city,
        village: merchant.village,
      },
    },
  });
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const result = await authService.login(value);

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  registerMerchant,
  login
};