const express = require('express');

const { loginRateLimiter } = require('../middleware/rateLimiter');

const {
  register,
  login
} = require('../controllers/authController');

const {
  validateRegister,
  validateLogin
} = require('../validation/authValidation');

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post(
  '/login',
  loginRateLimiter,
  validateLogin,
  login
);

module.exports = router;