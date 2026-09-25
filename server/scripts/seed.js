require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = require('../src/config/db');
const Project = require('../src/models/Project');
const Counter = require('../src/models/Counter');

const projects = require('./seedData');

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing projects...');
    await Project.deleteMany({});

    console.log('Resetting project counter...');
    await Counter.deleteMany({ name: 'projects' });

    console.log('Creating projects...');

    const projectsWithIds = [];

    for (let index = 0; index < projects.length; index += 1) {
      projectsWithIds.push({
        id: String(index + 1),
        ...projects[index]
      });
    }

    await Project.insertMany(projectsWithIds);

    await Counter.create({
      name: 'projects',
      sequenceValue: projects.length
    });

    console.log(`${projects.length} projects seeded successfully.`);

    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();