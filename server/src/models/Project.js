const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    technologies: {
      type: [String],
      required: true
    },

    image: {
      type: String,
      default: ''
    },

    githubUrl: {
      type: String,
      required: true,
      trim: true
    },

    liveUrl: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Control what gets returned when a Project is converted to JSON.
projectSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;

    return ret;
  }
});

module.exports = mongoose.model('Project', projectSchema);