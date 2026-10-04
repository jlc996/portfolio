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
        // Verify required admin credentials are configured.
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            throw new Error(
                'ADMIN_EMAIL and ADMIN_PASSWORD must be set in the .env file.'
            );
        }

        // Connect using the regular MongoDB connection.
        await connectDB();

        // Clear existing projects.
        console.log('Clearing projects...');
        await Project.deleteMany({});

        // Reset the project ID counter.
        console.log('Resetting project counter...');
        await Counter.deleteMany({ name: 'projects' });

        // Assign formatted custom IDs to the seeded projects.
        console.log('Creating projects...');
        const projectsWithIds = projects.map((project, index) => ({
            ...project,
            id: `PRJ-${String(index + 1).padStart(4, '0')}`
        }));

        await Project.insertMany(projectsWithIds);

        // Initialize the counter so the next project gets the next ID.
        await Counter.create({
            name: 'projects',
            sequenceValue: projects.length
        });

        console.log(`${projects.length} projects seeded successfully.`);

        // Create or update the admin user.
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
        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Database seeding failed:', error);
        process.exitCode = 1;
    } finally {
        // Close the database connection whether seeding succeeds or fails.
        await mongoose.disconnect();
    }
};

seedDatabase();