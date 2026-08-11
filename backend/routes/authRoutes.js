const express = require("express");

const router = express.Router();

const {
  register,
  verifyOTP,
  login,
  logout,
  forgotPassword,
  resetPassword,
  me,
} = require("../controllers/authController");

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/register", register);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", me);

module.exports = router;