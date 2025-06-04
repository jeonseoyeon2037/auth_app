/**
 * upload.js
 * Multer 미들웨어 설정
 */

const multer = require("multer");

// 메모리 스토리지 사용
const storage = multer.memoryStorage();

// multer 인스턴스 생성
const upload = multer({ storage });

module.exports = upload;