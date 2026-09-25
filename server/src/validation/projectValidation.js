const { z } = require('zod');

const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Project name is required.'),

  description: z
    .string()
    .trim()
    .min(1, 'Project description is required.'),

  technologies: z
    .array(z.string().trim())
    .min(1, 'At least one technology is required.'),

  image: z
    .string()
    .trim()
    .optional(),

  githubUrl: z
    .string()
    .url('GitHub URL must be a valid URL.'),

  liveUrl: z
    .string()
    .url('Live URL must be a valid URL.')
    .optional()
});

const validateProject = (req, res, next) => {
  const result = projectSchema.safeParse(req.body);

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
  validateProject
};