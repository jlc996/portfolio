require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = require('../src/config/db');
const Project = require('../src/models/Project');
const Counter = require('../src/models/Counter');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');

const projects = require('./seedData');

const seedDatabase = async () => {
    try {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            throw new Error(
                'ADMIN_EMAIL and ADMIN_PASSWORD must be set in the .env file.'
            );
        }

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

        console.log('Creating admin user...');

        const adminPasswordHash = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            12
        );

        await User.findOneAndUpdate(
            { email: process.env.ADMIN_EMAIL },
            {
                email: process.env.ADMIN_EMAIL,
                passwordHash: adminPasswordHash,
                role: 'admin',
                isActive: true,
                tokenVersion: 0
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        console.log('Admin user ready.');

        process.exit(0);
    } catch (error) {
        console.error('Database seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();