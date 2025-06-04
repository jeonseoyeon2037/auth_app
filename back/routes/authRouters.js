/**
 * authRouters.js
 * 사용자 인증 관련 라우터
 */

const express = require("express");
const router = express.Router();

// Controllers
const { register } = require("../controllers/authController");

// Middlewares
const upload = require("./upload");

// Routes
router.post("/register", upload.single("profile_image"), register);

module.exports = router;