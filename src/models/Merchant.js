const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    storeAddress: {
      type: String,
      trim: true,
    },

    commercialRegister: {
      type: String,
      trim: true,
    },

    governorate: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      enum: [
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
        "دار السلام",
      ],
      required: true,
      trim: true,
    },

    village: {
      type: String,
      trim: true,
    },

    hasDelivery: {
      type: Boolean,
      default: false,
    },

    deliveryAreas: [
      {
        type: String,
        trim: true,
      },
    ],

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    agreedToTerms: {
      type: Boolean,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Merchant", merchantSchema);