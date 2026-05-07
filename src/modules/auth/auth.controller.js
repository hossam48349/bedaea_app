const authService = require("./auth.service");
const {
  registerCustomerSchema,
  registerMerchantSchema,
  loginSchema
} = require("./auth.validation");

const registerCustomer = async (req, res, next) => {
  try {
    const { error, value } = registerCustomerSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message)
      });
    }

    const result = await authService.registerCustomer(value);

    res.status(201).json({
      success: true,
      message: "تم إنشاء حساب العميل بنجاح",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const registerMerchant = async (req, res, next) => {
  try {
    const { error, value } = registerMerchantSchema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message)
      });
    }

    const result = await authService.registerMerchant(value);

    res.status(201).json({
      success: true,
      message: "تم إنشاء حساب التاجر بنجاح",
      data: result
    });
  } catch (error) {
    next(error);
  }
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