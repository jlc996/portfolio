
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
    },

    category: {
      type: String,
      default: 'Other',
      trim: true
    },

    featured: {
      type: Boolean,
      default: false
    },

    likes: {
      type: Number,
      default: 0,
      min: 0
    },

    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Keep internal MongoDB fields and user IDs out of public responses.
projectSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.likedBy;

    return ret;
  }
});

module.exports = mongoose.model('Project', projectSchema);