const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const Account = require("../models/Account");

const generateOTP = require("../utils/otpGenerator");
const sendEmail = require("../utils/sendEmail");
const otpEmailTemplate = require("../utils/otpEmailTemplate");

// ================= REGISTER =================

exports.register = async (req, res) => {
  try {
    const { codeforcesHandle, email, password } = req.body;
    console.log("REGISTER REQUEST:");
console.log("Handle:", codeforcesHandle);
console.log("Email:", email);

    if (!codeforcesHandle || !email || !password) {
      return res.status(400).json({
        error: "Codeforces handle, email and password are required",
      });
    }

    const existingHandle = await Account.findOne({
      codeforcesHandle,
    });

    console.log("EXISTING HANDLE:", existingHandle);

    if (existingHandle) {
      return res.status(400).json({
        error: "Codeforces handle already registered",
      });
    }

    const existingEmail = await Account.findOne({
      email,
    });

    console.log("EXISTING EMAIL:", existingEmail);

    if (existingEmail) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    // Verify Codeforces handle

    try {
      await axios.get(
        `https://codeforces.com/api/user.info?handles=${codeforcesHandle}`
      );
    } catch {
      return res.status(400).json({
        error: "Invalid Codeforces handle",
      });
    }

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Account.create({
      codeforcesHandle,
      email,
      password: hashedPassword,
      verificationOTP: otp,
      verificationOTPExpiry: otpExpiry,
      isVerified: false,
    });

    await sendEmail(
      email,
      "CP Tracker Email Verification",
      otpEmailTemplate(codeforcesHandle, otp)
    );

    res.status(201).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Registration failed",
    });

  }
};

// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const account = await Account.findOne({
      email,
    });

    if (!account) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    if (account.isVerified) {
      return res.status(400).json({
        error: "Account already verified",
      });
    }

    if (account.verificationOTP !== otp) {
      return res.status(400).json({
        error: "Invalid OTP",
      });
    }

    if (account.verificationOTPExpiry < new Date()) {
      return res.status(400).json({
        error: "OTP expired",
      });
    }

    account.isVerified = true;
    account.verificationOTP = null;
    account.verificationOTPExpiry = null;

    await account.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "OTP verification failed",
    });

  }
};

// forgot password

exports.forgotPassword = async (req, res) => {
  try {
    const { codeforcesHandle } = req.body;

    if (!codeforcesHandle) {
      return res.status(400).json({
        error: "Codeforces handle is required",
      });
    }

    const account = await Account.findOne({ codeforcesHandle });

    if (!account) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    const otp = generateOTP();

    account.resetOTP = otp;
    account.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await account.save();

    await sendEmail(
      account.email,
      "CP Tracker Password Reset",
      otpEmailTemplate(account.codeforcesHandle, otp)
    );

    res.json({
      success: true,
      message: "Password reset OTP sent successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to send reset OTP",
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { codeforcesHandle, otp, newPassword } = req.body;

    const account = await Account.findOne({ codeforcesHandle });

    if (!account) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    if (account.resetOTP !== otp) {
      return res.status(400).json({
        error: "Invalid OTP",
      });
    }

    if (account.resetOTPExpiry < new Date()) {
      return res.status(400).json({
        error: "OTP expired",
      });
    }

    account.password = await bcrypt.hash(newPassword, 10);

    account.resetOTP = null;
    account.resetOTPExpiry = null;

    await account.save();

    res.json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Password reset failed",
    });
  }
};

// ================= LOGIN =================

exports.login = async (req, res) => {

  try {

    const { codeforcesHandle, password } = req.body;

    if (!codeforcesHandle || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    const account = await Account.findOne({
      codeforcesHandle,
    });

    if (!account) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    if (!account.isVerified) {
      return res.status(403).json({
        error: "Please verify your email first",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      account.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: account._id,
        codeforcesHandle: account.codeforcesHandle,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});

    res.json({
      message: "Login successful",
      user: {
        id: account._id,
        codeforcesHandle: account.codeforcesHandle,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login failed",
    });

  }

};

// ================= CURRENT USER =================

exports.me = async (req, res) => {

  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const account = await Account.findById(
      decoded.userId
    ).select("-password");

    if (!account) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      user: account,
    });

  } catch {

    res.status(401).json({
      error: "Invalid or expired token",
    });

  }

};

// ================= LOGOUT =================

exports.logout = (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({
    message: "Logout successful",
  });

};