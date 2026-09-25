const Project = require('../models/Project');
const generateId = require('../utils/generateId');

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      id: req.params.id
    });

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    res.status(200).json({
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const id = await generateId('projects');

    const project = await Project.create({
      id,
      ...req.body
    });

    res.status(201).json({
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    res.status(200).json({
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndDelete({
      id: req.params.id
    });

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    res.status(200).json({
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};