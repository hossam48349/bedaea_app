const Joi = require("joi");

const allowedCenters = [
  "طما",
  "طهطا",
  "جهينة",
  "المراغة",
  "ساقلتة",
  "أخميم",
  "سوهاج",
  "المنشاة",
  "العسيرات",
  "جرجا",
  "البلينا",
  "دار السلام"
];

const registerCustomerSchema = Joi.object({
  fullName: Joi.string().min(3).max(80).required().messages({
    "any.required": "الاسم بالكامل مطلوب",
    "string.min": "الاسم يجب ألا يقل عن 3 أحرف"
  }),

  centerName: Joi.string()
    .valid(...allowedCenters)
    .required()
    .messages({
      "any.required": "اسم المركز مطلوب",
      "any.only": "المركز غير متاح"
    }),

  villageName: Joi.string().min(2).required().messages({
    "any.required": "اسم القرية مطلوب"
  }),

marketName: Joi.string().min(2).required().messages({
  "any.required": "اسم الماركت مطلوب"
}),

  phone: Joi.string().pattern(/^01[0-9]{9}$/).required().messages({
    "any.required": "رقم الهاتف مطلوب",
    "string.pattern.base": "رقم الهاتف غير صحيح"
  }),

  password: Joi.string().min(8).required().messages({
    "any.required": "كلمة المرور مطلوبة",
    "string.min": "كلمة المرور يجب ألا تقل عن 8 أحرف"
  }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "كلمة المرور غير متطابقة",
    "any.required": "تأكيد كلمة المرور مطلوب"
  }),

  agreedToTerms: Joi.boolean().valid(true).required().messages({
    "any.only": "يجب الموافقة على الشروط والأحكام"
  })
});

const registerMerchantSchema = Joi.object({
  fullName: Joi.string().min(3).max(80).required(),

  storeName: Joi.string().min(2).required().messages({
    "any.required": "اسم المتجر مطلوب"
  }),

  phone: Joi.string().pattern(/^01[0-9]{9}$/).required().messages({
    "string.pattern.base": "رقم الهاتف غير صحيح"
  }),

  storeAddress: Joi.string().min(5).required().messages({
    "any.required": "عنوان المتجر مطلوب"
  }),

  commercialRegister: Joi.string().allow("").optional(),

  governorate: Joi.string().min(2).required().messages({
    "any.required": "المحافظة مطلوبة"
  }),

  city: Joi.string()
    .valid(...allowedCenters)
    .required()
    .messages({
      "any.required": "المركز مطلوب",
      "any.only": "المركز غير متاح"
    }),

  village: Joi.string().min(2).required().messages({
    "any.required": "القرية مطلوبة"
  }),

  hasDelivery: Joi.boolean().default(false),

  deliveryAreas: Joi.array().items(Joi.string()).default([]),

  password: Joi.string().min(8).required(),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "كلمة المرور غير متطابقة"
  }),

  agreedToTerms: Joi.boolean().valid(true).required().messages({
    "any.only": "يجب الموافقة على الشروط والأحكام"
  })
});

const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = {
  registerCustomerSchema,
  registerMerchantSchema,
  loginSchema,
  allowedCenters
};