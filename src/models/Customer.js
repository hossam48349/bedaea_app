const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

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
        "دار السلام",
      ],
      required: true,
    },

    villageName: {
      type: String,
      trim: true,
    },

    marketName: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

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

module.exports = mongoose.model("Customer", customerSchema);