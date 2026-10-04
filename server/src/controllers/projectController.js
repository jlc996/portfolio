const mongoose = require('mongoose');
const Project = require('../models/Project');
const generateId = require('../utils/generateId');


const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    const data = projects.map((project) => {
      const projectData = project.toJSON();

      projectData.likedByCurrentUser = req.user
        ? project.likedBy.some(
            (userId) => userId.toString() === req.user._id.toString()
          )
        : false;

      return projectData;
    });

    res.status(200).json({ data });
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



const likeProject = async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        id: req.params.id,
        likedBy: mongoose.trusted({
          $ne: req.user._id
        })
      },
      {
        $addToSet: { likedBy: req.user._id },
        $inc: { likes: 1 }
      },
      { new: true }
    );

    if (project) {
      return res.status(200).json({ data: project });
    }

    const existingProject = await Project.findOne({
      id: req.params.id
    });

    if (!existingProject) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    return res.status(409).json({
      message: 'You have already liked this project.'
    });
  } catch (error) {
    console.error('Like project error:', error);
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  likeProject
};