const express = require('express');

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const { validateProject } = require('../validation/projectValidation');

const router = express.Router();

// GET /api/projects
router.get('/', getProjects);

// GET /api/projects/:id
router.get('/:id', getProjectById);

// POST /api/projects
router.post('/', validateProject, createProject);

// PATCH /api/projects/:id
router.patch('/:id', validateProject, updateProject);

// DELETE /api/projects/:id
router.delete('/:id', deleteProject);

module.exports = router;