const { z } = require('zod');

const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email('A valid email is required.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('A valid email is required.'),

  password: z
    .string()
    .min(1, 'Password is required.')
});

const validateRegister = (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  req.body = result.data;

  next();
};

const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  req.body = result.data;

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};