const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["customer", "merchant"],
      required: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },

    // بيانات العميل

    centerName: {
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
        "دار السلام"
      ],
      required: function () {
        return this.role === "customer";
      }
    },

    villageName: {
      type: String,
      trim: true
    },

    marketName: {
      type: String,
      trim: true
    },

    // بيانات التاجر
  

    storeName: {
      type: String,
      trim: true
    },

    storeAddress: {
      type: String,
      trim: true
    },

    commercialRegister: {
      type: String,
      trim: true
    },

    governorate: {
      type: String,
      trim: true
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
        "دار السلام"
      ],
      trim: true
    },

    village: {
      type: String,
      trim: true
    },

    hasDelivery: {
      type: Boolean,
      default: false
    },

    deliveryAreas: [
      {
        type: String,
        trim: true
      }
    ],

    agreedToTerms: {
      type: Boolean,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);