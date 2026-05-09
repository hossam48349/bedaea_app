const express = require("express");
const authController = require("../../modules/auth/auth.controller");

const router = express.Router();

router.post("/register/customer", authController.registerCustomer);
router.post("/register/merchant", authController.registerMerchant);
router.post("/login", authController.login);

module.exports = router; 