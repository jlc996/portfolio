const express = require('express');

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const { validateProject } = require('../validation/projectValidation');

const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

const router = express.Router();

// GET /api/projects
// Public: anyone can view the projects
router.get('/', getProjects);

// GET /api/projects/:id
// Public: anyone can view a single project
router.get('/:id', getProjectById);

// POST /api/projects
// Admin only: create a project
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  validateProject,
  createProject
);

// PATCH /api/projects/:id
// Admin only: update a project
router.patch(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validateProject,
  updateProject
);

// DELETE /api/projects/:id
// Admin only: delete a project
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  deleteProject
);

module.exports = router;